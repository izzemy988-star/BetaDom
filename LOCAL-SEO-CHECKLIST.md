# LOCAL SEO CHECKLIST — attività fuori dal sito

Queste azioni non possono essere svolte modificando i file del sito: richiedono accesso ad account esterni del proprietario. Nessuna di queste attività va comprata o simulata (niente recensioni false, niente backlink acquistati, niente directory spam).

## Google Business Profile

- [ ] Verificare che il profilo Google Business di Domus Costa sia rivendicato e verificato dal proprietario
- [ ] Controllare che categoria primaria sia "Casa vacanze" o "Affitto per vacanze" (coerente col modello a unità singola, non "Bed & Breakfast" se non si serve colazione)

## Booking.com

- [x] **Verificato (10 settembre 2026)**: Domus Costa è confermata come struttura reale, citata da Booking.com stessa nella pagina "The 10 best apartments in Cava de' Tirreni" tra gli appartamenti più popolari della zona
- [ ] Recuperare il link diretto alla scheda Booking.com di Domus Costa (non trovato nei risultati di ricerca indicizzati) e aggiungerlo nel footer/contatti del sito accanto a Facebook
- [ ] Verificare che punteggio e numero recensioni mostrati sulla scheda Booking siano coerenti con quanto eventualmente riportato in futuro sul sito, prima di reintrodurre markup `AggregateRating`
- [ ] Verificare coerenza **NAP** (Nome, Indirizzo, Telefono) tra: sito, Google Business Profile, Facebook, eventuali listing su Booking.com — deve essere identico carattere per carattere, incluso il formato del numero (+39 329 176 5764)
- [ ] Caricare foto proprietarie reali (non le immagini Wikimedia del territorio, che sono legittime sul sito ma non rappresentano la struttura)
- [ ] Impostare orari di risposta coerenti con quanto dichiarato sul sito ("rispondiamo tutti i giorni dalle 9:00 alle 20:00")
- [ ] Rispondere a tutte le recensioni esistenti e future, anche a quelle negative, con tono coerente con il brand ("come amici di sempre")
- [ ] Aggiungere l'attributo "parcheggio gratuito" se disponibile come attributo strutturato del profilo

## Search Console

- [ ] Collegare la proprietà del dominio `www.domuscostacava.it` (o dominio finale) a Google Search Console
- [ ] Inviare `sitemap.xml` da Search Console (URL: `https://www.domuscostacava.it/sitemap.xml`)
- [ ] Verificare in "Copertura" che tutte le 9 pagine risultino indicizzate senza errori
- [ ] Controllare periodicamente il report "Miglioramenti → Dati strutturati" per errori sul markup `LodgingBusiness` e `FAQPage`
- [ ] Monitorare query, impression e CTR mensilmente, con attenzione alle query che generano impression alte ma CTR basso (segnale che title/meta description potrebbero migliorare)

## Analytics

- [ ] Collegare GA4 o una piattaforma privacy-compliant (es. Plausible, Fathom) coerente con quanto dichiarato nella Cookie Policy del sito
- [ ] Verificare che il consenso cookie (già implementato in `site.js`/`note-legali.html`) blocchi correttamente gli script di analytics fino al consenso esplicito, se la piattaforma scelta usa cookie non tecnici
- [ ] Impostare eventi di conversione su: click "Richiedi offerta", click WhatsApp, invio modulo contatti

## Citazioni locali (NAP coerenti, non spam)

- [ ] Verificare/creare schede su directory locali pertinenti e di qualità (es. Tripadvisor, portali turistici della Costiera Amalfitana e di Cava de' Tirreni, camera di commercio locale se applicabile)
- [ ] Evitare directory generiche di bassa qualità o a pagamento che promettono "backlink SEO" — sono controproducenti e violano le linee guida di Google

## Recensioni

- [ ] Continuare a raccogliere recensioni reali post-soggiorno (email di follow-up, richiesta diretta via WhatsApp al check-out)
- [ ] Non incentivare recensioni con sconti o contropartite (viola i termini di Google e Booking)
- [ ] Se in futuro si vuole reintrodurre il markup `AggregateRating`/`Review` nel JSON-LD del sito, farlo solo con un meccanismo di raccolta/visualizzazione recensioni verificabile direttamente sul sito stesso, mantenendo i punteggi sempre sincronizzati con le piattaforme di origine

## Nota importante

Nessuna di queste attività garantisce un posizionamento specifico o un "primo posto" nei risultati di ricerca. Il ranking dipende da fattori esterni (autorevolezza del dominio nel tempo, competizione locale, comportamento reale degli utenti) che nessun intervento tecnico può controllare con certezza. Le attività sopra elencate sono buone pratiche riconosciute, non promesse di risultato.
