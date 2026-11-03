# SECURITY & DEPLOYMENT — Domus Costa

Il sito è statico (HTML/CSS/JS puro, nessun backend, nessun database). Questo riduce di per sé la superficie d'attacco, ma restano configurazioni lato hosting da impostare correttamente.

## HTTPS

- [ ] Il dominio finale deve essere servito **esclusivamente** in HTTPS
- [ ] Configurare redirect **301** lato server da HTTP a HTTPS
- [ ] Scegliere **una sola versione canonica** del dominio (es. `https://www.domuscostacava.it/`, che è quella già usata in tutti i canonical del sito) e redirigere 301 le varianti (`http://`, `http://www.`, `https://` senza www) verso quella

## Header di sicurezza (da impostare lato hosting/server, non nel codice HTML)

```
Content-Security-Policy: default-src 'self'; img-src 'self' https://commons.wikimedia.org https://upload.wikimedia.org data:; style-src 'self' https://cdn.jsdelivr.net 'unsafe-inline'; script-src 'self'; font-src 'self' https://cdn.jsdelivr.net; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://wa.me
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), camera=(), microphone=()
```

Note sulla CSP proposta:
- `img-src` include Wikimedia Commons perché il sito usa immagini esterne da lì per le pagine territorio/galleria — verificare che il dominio esatto usato (`commons.wikimedia.org`, `upload.wikimedia.org`) corrisponda a quello effettivamente servito
- `style-src`/`font-src` includono `cdn.jsdelivr.net` perché il sito carica i font (Marcellus, Jost, Cormorant Garamond) da lì tramite `@fontsource`
- `form-action` include `wa.me` perché il flusso di invio richiesta genera un link WhatsApp diretto
- **Questa CSP è un punto di partenza**: va testata in modalità "report-only" prima di essere applicata in modo bloccante, per evitare di rompere funzionalità non previste in questo audit

## Form contatti — stato attuale e cosa manca

Il form in `contatti.html` (`#bookingForm`) è gestito **interamente lato client**: alla validazione riuscita, genera un link `wa.me` precompilato e non invia dati a nessun server proprio. Questo è dichiarato esplicitamente in `note-legali.html` ("Il sito non utilizza database né moduli di invio automatico lato server").

Implicazioni di sicurezza:
- **Non c'è rischio di iniezione server-side** perché non c'è server che processa il form
- **Il rischio residuo è XSS lato client**, ma il codice in `site.js` costruisce il testo del messaggio WhatsApp con `encodeURIComponent()` e popola il DOM con `textContent`/nodi creati via `createElement` (non `innerHTML`), il che è già la pratica corretta
- **Honeypot già presente** (`fHoney`, campo nascosto `tabindex="-1"`) per mitigare spam automatizzato, anche se in un flusso senza backend l'utility principale è scoraggiare bot che compilano e "inviano" senza eseguire JS

Se in futuro si aggiunge un vero backend (es. per salvare le richieste in un database o inviarle via email automaticamente):
- [ ] Validare **di nuovo** tutti i campi lato server (mai fidarsi della sola validazione client)
- [ ] Aggiungere **rate limiting** sull'endpoint di invio
- [ ] Aggiungere un **token CSRF** reale generato e verificato lato server
- [ ] Sanitizzare input **e** output (se i dati vengono poi mostrati in una dashboard admin)
- [ ] Non esporre stack trace o dettagli tecnici in caso di errore
- [ ] Aggiungere un vero CAPTCHA (es. Cloudflare Turnstile, hCaptcha) se lo spam diventa un problema reale — l'honeypot da solo non ferma bot sofisticati

## Privacy e cookie

- `note-legali.html` contiene già un'informativa privacy conforme al Reg. UE 2016/679, con titolare, finalità, base giuridica, conservazione, destinatari e diritti dell'interessato — completa e ben scritta
- Il consenso cookie a 3 livelli (tecnici sempre attivi, statistici opzionali, marketing opzionali) è già implementato in `site.js` con `localStorage` — corretto architetturalmente
- **[DA COMPLETARE]**: se in futuro si attiva un vero strumento di analytics, verificare che lo script non venga caricato finché il consenso statistico non è stato dato esplicitamente (attualmente non c'è nessuno script di analytics nel sito, quindi non c'è nulla da bloccare, ma il meccanismo di consenso è già pronto per quando servirà)

## Backup e aggiornamenti

- [ ] Essendo un sito statico, il backup è semplice: versionare l'intero repository (git) e mantenere almeno una copia off-hosting
- [ ] Le dipendenze esterne (font da `cdn.jsdelivr.net`) sono versionate con numero di versione fisso nell'URL (es. `@fontsource/marcellus@5.0.17`) — buona pratica già in uso, evita rotture improvvise per aggiornamenti automatici a monte
- [ ] Verificare periodicamente (ogni 6-12 mesi) che le versioni dei font pinnate non abbiano vulnerabilità note o siano deprecate

## Terze parti presenti nel sito

| Servizio | Dominio | Scopo | Necessita consenso cookie? |
|---|---|---|---|
| jsDelivr (fontsource) | cdn.jsdelivr.net | Caricamento font | No (nessun cookie, solo file statici) |
| Wikimedia Commons | commons.wikimedia.org, upload.wikimedia.org | Immagini territorio con licenza libera | No |
| WhatsApp | wa.me | Link diretto di contatto, aperto su iniziativa utente | No (nessun embed, solo link) |
| Google Maps | maps.google.com | Link diretto (non embed iframe) | No, essendo un link e non un iframe incorporato |
| Facebook | facebook.com | Link diretto al profilo | No |

Nessun embed pesante (iframe mappe, widget social) è caricato automaticamente nella pagina — coerente con le linee guida di performance e privacy del brief.
