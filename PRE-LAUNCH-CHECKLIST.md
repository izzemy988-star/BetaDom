# PRE-LAUNCH CHECKLIST — Domus Costa

Checklist verificabile prima della messa online. Le voci già verificate in questo audit sono marcate; le altre richiedono un test manuale o strumenti (Lighthouse, Search Console) non eseguibili in questo ambiente.

## Contenuto e link

- [x] Tutti i link interni tra le 9 pagine verificati: nessun file mancante
- [x] Bug `#modulo` corretto e verificato: l'ancora ora esiste e tutte le CTA "Richiedi offerta" la raggiungono
- [x] Nessuna pagina orfana: ogni pagina è raggiungibile da almeno un link interno (menu, footer, pager)
- [ ] Verificare manualmente che i link a `tel:+393291765764`, `https://wa.me/393291765764` e Google Maps aprano correttamente su dispositivo reale (desktop e mobile)
- [ ] Verificare che `https://www.facebook.com/DomusCostaCava/` sia il profilo Facebook corretto e attivo

## SEO on-page

- [x] Un solo H1 per pagina, verificato su tutte e 9 le pagine
- [x] Title e meta description unici per ogni pagina, nessuna duplicazione
- [x] Canonical corretto e coerente col dominio finale su tutte le pagine
- [x] JSON-LD validato sintatticamente su tutte le pagine (LodgingBusiness, BreadcrumbList, FAQPage, ContactPage)
- [x] Markup `Review`/`AggregateRating` rimosso da `index.html` per scelta prudenziale
- [ ] Eseguire il [Rich Results Test di Google](https://search.google.com/test/rich-results) su ognuna delle 9 pagine dopo il deploy, per verificare che Google interpreti correttamente il markup live (non solo la sintassi JSON)
- [ ] Decidere se passare da `LodgingBusiness` a `VacationRental` (vedi `SEO-MAP.md`)

## robots.txt e sitemap.xml

- [x] `robots.txt` presente, con direttiva `Sitemap:` verso URL assoluto
- [x] `sitemap.xml` contiene tutte le 9 pagine pubbliche, nessuna pagina extra o di test
- [ ] Dopo il deploy, verificare che `https://www.domuscostacava.it/robots.txt` e `/sitemap.xml` siano effettivamente raggiungibili (non serviti con errore 404 per problemi di configurazione hosting)

## Performance

- [x] Immagini locali: tutte dotate di `width`/`height` per prevenire CLS
- [ ] Eseguire Lighthouse (Chrome DevTools) su mobile per `index.html` e almeno una pagina interna, verificare punteggio Performance e Core Web Vitals (LCP, CLS, INP)
- [ ] Valutare la compressione WebP/AVIF delle immagini "-hq" (fino a 995 KB ciascuna) — vedi raccomandazione in `README-REDESIGN.md`
- [ ] Verificare tempo di caricamento reale su connessione mobile 4G simulata

## Responsive

- [ ] Testare manualmente il layout a 320px, 375px, 768px, 1024px, 1280px e desktop ampio (il CSS ha già media query a 640px, 900px, 1080px, 1210px — verificarne il comportamento reale)
- [ ] Verificare assenza di overflow orizzontale su tutte le pagine, in particolare `gli-spazi.html` (gallery a mosaico) e `contatti.html` (form a due colonne)
- [ ] Testare il menu overlay full-screen su schermi piccoli (verificare che `#menu .m-side` nascosto sotto 1080px non tolga informazioni essenziali — telefono e social restano comunque nel footer)

## Accessibilità

- [x] Skip link "Salta al contenuto principale" aggiunto come primo elemento di `<body>` in tutte e 9 le pagine, con id `main-content` corrispondente sul tag `<main>` di ciascuna pagina, e stile CSS dedicato (nascosto di default, visibile al focus da tastiera)
- [x] FAQ accordion con `button` semantici e `aria-expanded`
- [x] Lightbox con `aria-modal`, gestione `Escape`, focus trap implicito tramite bottoni dedicati
- [x] Menu mobile con `aria-expanded`, `aria-controls`, chiusura su click esterno
- [ ] Testare con screen reader reale (VoiceOver o NVDA) l'intero flusso di prenotazione
- [ ] Verificare contrasto colori con uno strumento automatico (es. axe DevTools) su tutte le combinazioni testo/sfondo, in particolare `--oro2` su `--crema` e `--crema-dim` su `--notte2`

## Nota di changelog

Durante la stesura di questa checklist è emerso che il sito originale non aveva uno skip link, richiesto esplicitamente dal brief (Fase 7). È stato aggiunto in questo stesso intervento (vedi riga sopra) a tutte le 9 pagine, non solo raccomandato.

## Sicurezza

- [x] Nessuna API key, token o segreto nel codice (verificato: nessuna chiave hardcoded trovata)
- [x] Form con honeypot anti-spam già presente
- [x] `rel="noopener noreferrer"` presente su tutti i link `target="_blank"` verificati
- [ ] Configurare gli header di sicurezza lato hosting (vedi `SECURITY-DEPLOYMENT.md`) — non applicabile a livello di file statici, richiede accesso alla configurazione server
- [ ] Forzare HTTPS e redirect 301 a livello di hosting

## Legale

- [x] Privacy policy, termini e cookie policy presenti in `note-legali.html`, con riferimenti normativi corretti (Reg. UE 2016/679, art. 109 TULPS)
- [x] Trasparenza sull'uso di IA generativa già dichiarata (Reg. UE 2024/1689, art. 50)
- [ ] Far rivedere `note-legali.html` da un consulente legale/commercialista prima della pubblicazione definitiva, in particolare le clausole su imposta di soggiorno e responsabilità — questo audit ne verifica la coerenza interna e tecnica, non la validità legale sostanziale

---

**Promemoria finale**: nessun elemento di questa checklist, una volta completato, garantisce un posizionamento specifico nei motori di ricerca. La SEO tecnica crea le condizioni necessarie ma non sufficienti; il resto dipende da contenuto continuo, autorevolezza del dominio nel tempo, recensioni reali e segnali locali (vedi `LOCAL-SEO-CHECKLIST.md`).
