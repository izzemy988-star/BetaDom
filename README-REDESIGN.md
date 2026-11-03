# README — Redesign Domus Costa

## 1. Cosa è stato modificato in questo intervento

Questo intervento è stato un **audit + correzione mirata**, non una riscrittura del design. Il sito esistente rispettava già gran parte delle linee guida "Mediterranean Quiet Luxury" richieste (palette crema/notte/oro, tipografia Marcellus/Jost/Cormorant Garamond, nessun glassmorphism, nessuna card generica, contenuti editoriali autentici). Non ho quindi rifatto la direzione artistica: sarebbe stato un intervento non necessario e rischioso su un lavoro già coerente.

### File modificati

| File | Modifica | Motivo |
|---|---|---|
| `contatti.html` | Aggiunto `<span id="modulo">` prima del form | Bug: 32 link in tutto il sito puntavano a `contatti.html#modulo`, un'ancora che non esisteva. Il form non veniva raggiunto automaticamente dallo scroll. |
| `style.css` | Aggiunta regola `#modulo{display:block;scroll-margin-top:92px}` | Compensa l'header fisso (`position:sticky`) in modo coerente con il pattern `scroll-margin-top` già usato altrove nel foglio di stile. |
| `style.css` | Rimosso blocco `#legalModal`/`#legalTitle`/`#legalBody`/`#legalClose` (17 righe) | CSS morto: nessun elemento con questi id esiste in nessuna delle 9 pagine HTML. |
| `index.html` | Rimossi `aggregateRating` e `review` dal JSON-LD `LodgingBusiness` | Per scelta esplicita del proprietario in fase di revisione, in linea con la policy "markup solo se verificabile direttamente sul meccanismo del sito". Il testo delle recensioni resta visibile in pagina (non è markup strutturato, è contenuto editoriale). |
| Tutte le pagine `.html` | Aggiunti `width`/`height` a tutte le immagini locali (`img/*.jpg`) che ne erano prive | Elimina il rischio di Cumulative Layout Shift per le immagini locali. Le immagini esterne (Wikimedia Commons) non sono state toccate: sono già contenute in elementi CSS a altezza fissa con `object-fit:cover`, quindi il CLS è già prevenuto strutturalmente e aggiungere valori HTML non verificati avrebbe potuto essere fuorviante. |
| Tutte le pagine `.html` | Aggiunto skip link ("Salta al contenuto principale") come primo elemento di `<body>`, con id `main-content` su ciascun `<main>` | Il brief richiede esplicitamente (Fase 7) uno skip link per utenti di tastiera/screen reader; non era presente nel sito originale. |
| `style.css` | Aggiunta regola `.skip-link` (nascosto di default, visibile al focus) | Stile necessario per il nuovo skip link. |

### File NON modificati (e perché)

- **Struttura URL**: invariata al 100%. Nessun redirect necessario.
- **Contenuti testuali** di `la-casa.html`, `gli-spazi.html`, `territorio.html`, `offerte.html`, `faq.html`: già di ottima qualità editoriale, autentici e non genericamente promozionali. Riscriverli non era necessario né richiesto.
- **`site.js`**: nessun bug bloccante rilevato. Gestisce correttamente tastiera, ARIA, honeypot, IntersectionObserver, senza librerie esterne.
- **Policy "animali ammessi"**: presente in `faq.html` e `note-legali.html` in modo coerente tra le pagine. Non l'ho modificata: è una decisione di business che spetta al proprietario, segnalata in questo README per conferma.
- **`sitemap.xml` e `robots.txt`**: già corretti e coerenti con le pagine esistenti. Nessuna modifica necessaria.

---

## 2. Design system (già esistente, documentato per completezza)

**Palette** (variabili CSS in `:root`):
- `--crema:#F7F1E4` — fondo principale
- `--crema2:#EFE6D2` — fondo sezioni alternate
- `--carta:#FCF8EF` — superfici (card, form)
- `--notte:#152449` / `--notte2:#0E1A38` — blu profondo, pulsanti primari, footer
- `--mare:#123A5C` — accento secondario
- `--oro:#C9A24B` / `--oro2:#8A6425` — dettagli, hover, kicker
- `--limone:#E9C25B` — accento su sfondo scuro (galleria, offerte, menu overlay)
- `--ink:#1E2430` / `--ink2:#474C58` — testo

**Tipografia**:
- Titoli: `Marcellus` (serif editoriale)
- Corpo/UI: `Jost` (sans-serif, pesi 300/400/500/600)
- Accento corsivo: `Cormorant Garamond` (italic 400/500) — usato per citazioni e dettagli calligrafici

**Componenti già presenti**: header trasparente→sticky, menu overlay full-screen con preview immagine al hover, hero con Ken Burns discreto, gallery a mosaico con lightbox accessibile (tastiera, `Escape`, `aria-modal`), FAQ accordion semantico, form con validazione client-side + honeypot, cookie bar con 3 livelli di consenso, slider recensioni con dots e pausa on-hover.

---

## 3. Come testare le modifiche

1. Apri `contatti.html` in un browser, clicca un qualsiasi link "Richiedi offerta" da un'altra pagina (es. header di `index.html`) e verifica che la pagina scrolli fino al modulo, non solo all'inizio della pagina.
2. Verifica il JSON-LD di `index.html` con il [Rich Results Test di Google](https://search.google.com/test/rich-results): non deve più comparire `Review`/`AggregateRating`, ma `LodgingBusiness` con indirizzo, telefono e amenità deve validare senza errori.
3. Apri il DevTools → Network → filtra immagini, ricarica `index.html` e `gli-spazi.html`: le immagini locali non devono più generare warning di layout shift nel pannello Performance/Lighthouse.
4. Naviga con tastiera (Tab) su tutte le pagine: menu, FAQ accordion e lightbox devono restare completamente operabili.

---

## 4. Immagini: cosa serve dal proprietario

- **`og-image.jpg` è 1080×1362 (verticale)**. Lo standard per Open Graph/Twitter Card è 1200×630 (orizzontale). Serve una nuova immagine in questo formato — idealmente un ritaglio orizzontale da una foto reale esistente (es. `atmosfera-hq.jpg`, che è già panoramica a 6003×1836) piuttosto che una nuova foto.
- **Immagini "-hq" molto pesanti** (386-995 KB ciascuna): consigliato ricomprimerle in WebW o AVIF con fallback JPEG, e generare un set `srcset` per servire risoluzioni diverse a mobile/desktop. Non l'ho fatto in questo intervento perché richiede un passaggio di elaborazione immagini dedicato che va oltre la correzione dei file di markup.

---

## 6. Aggiornamento — modello a due unità (11 settembre 2026)

Il proprietario ha confermato che il modello di business è cambiato: **Domus Costa ora comprende due appartamenti reali nello stesso edificio** (Via XXV Luglio 89-91), non più una singola unità:

- **Appartamento Amalfi** — fino a 4 ospiti
- **Appartamento Positano** — fino a 2 ospiti

### Mappatura fotografica (verificata visivamente dal proprietario)

Confrontando un collage fotografico fornito dal proprietario con le immagini già presenti in `img/`, è stata confermata questa corrispondenza:

| File | Ambiente | Appartamento |
|---|---|---|
| `spazio-camera-hq.jpg` | Camera, letto in ferro battuto bianco, tenda blu notte | **Amalfi** |
| `spazio-cucina-hq.jpg` | Cucina bianca, piano in marmo chiaro, zona pranzo | **Amalfi** |
| `gallery-letto-hq.jpg` | Asciugamani su letto ferro battuto blu | **Amalfi** |
| `spazio-bagno-hq.jpg` | Bagno in marmo onice beige, doccia walk-in | **Positano** |
| `gallery-bagno-hq.jpg` | Doccia in marmo onice | **Positano** |
| `spazio-living-hq.jpg` | Living con oblò e poltrona bordeaux | **Positano** |
| `spazio-parete-hq.jpg` | Parete "HOME" con mappamondo | **Positano** |
| `spazio-comfort-hq.jpg` | Angolo TV/frigobar, tenda dorata | **Positano** |
| `spazio-luce-hq.jpg` | Lampada da terra | **Positano** |
| `casa-camera-hq.jpg` | Camera con letto tortora, tende dorate | **Positano** |

**Nota**: non esiste una foto dedicata del bagno per l'Appartamento Amalfi nella cartella `img/` attuale. Il proprietario ha confermato di procedere così; se in futuro si rendono disponibili foto del bagno Amalfi, andranno aggiunte in `gli-spazi.html` nella sezione `#amalfi`.

### File modificati in questo aggiornamento

| File | Modifica |
|---|---|
| `index.html` | Aggiunta sezione `#appartamenti` con due card Amalfi/Positano; JSON-LD aggiornato con `containsPlace` per le due unità; rimossi "Lavatrice" e "Balcone vista" dai servizi e dal markup; territorio riscritto senza distanze km/minuti, con Pompei, Badia di Cava, Lido La Torretta, trekking, equitazione; immagine "San Liberatore" sostituita con vista dal Castello (Monti Lattari che dividono Cava dalla Costiera) |
| `contatti.html` | Form riprogettato: calendario di selezione giorni (facoltativo, con X), questionario completo (persone → suggerimento automatico Amalfi/Positano, arrivo auto/parcheggio, mobilità bici/bici elettrica/scooter/auto a noleggio, culla), nome/cognome/cellulare/email mantenuti come campi obbligatori; rimossi i campi data check-in/check-out obbligatori |
| `gli-spazi.html` | Contenuto riorganizzato in due sezioni distinte con ancore `#amalfi` e `#positano`, foto e didascalie corrette secondo la mappatura verificata |
| `la-casa.html` | Statistiche e testi aggiornati per riflettere le due unità; rimossi Lavatrice, Balcone vista, seggiolone dai servizi |
| `territorio.html` | Rimosse tutte le distanze in km/minuti; aggiunte Badia di Cava de' Tirreni e Pompei come nuove mete; aggiunti contenuti su Lido La Torretta, trekking sui Monti Lattari, equitazione; immagine hero corretta (alt text allineato al nuovo src) |
| `faq.html` | Rimossa la FAQ "Posso portare il mio animale domestico?" (testo e JSON-LD); rimosso un duplicato della FAQ "famiglie con bambini" generato durante la correzione; rimosso "seggiolone" (resta solo "culla") |
| `note-legali.html` | Rimossa la clausola "animali di piccola taglia ammessi su richiesta" dalle regole della casa; ora specifica che non è consentito ospitare animali domestici |
| `offerte.html` | Rimossi "lavatrice" e "seggiolone" dai profili di viaggio consigliati |
| `site.js` | Riscritta la logica del modulo di richiesta offerta: calendario custom con selezione multipla di giorni, funzione di suggerimento automatico dell'appartamento in base al numero di ospiti (≤2 → Positano, 3-4 → Amalfi), raccolta dei nuovi campi questionario nel riepilogo e nel messaggio WhatsApp precompilato |
| `style.css` | Aggiunti stili per `.ap-duo`/`.ap-card` (sezione due appartamenti), `.cal-widget` (calendario), `.f-fieldset`/`.f-pill` (questionario), `.spazi-unit-title` (titoli di sezione Amalfi/Positano) |

### Cosa NON è stato toccato

- Struttura URL delle 9 pagine: invariata
- `sitemap.xml` e `robots.txt`: invariati (nessuna nuova pagina creata, come da scelta esplicita del proprietario di non creare `appartamento-amalfi.html`/`appartamento-positano.html` separate)
- Contenuti editoriali di alta qualità già esistenti (descrizioni di camera, bagno, cucina): riorganizzati per appartamento, non riscritti da zero
- Indirizzo, CIN, telefono: invariati — i due appartamenti condividono lo stesso edificio
