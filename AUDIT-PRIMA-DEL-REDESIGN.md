# AUDIT PRIMA DEL REDESIGN — Domus Costa
Data audit: 10 settembre 2026
File analizzati: 9 pagine HTML, style.css, site.js, robots.txt, sitemap.xml, og-image.jpg, 30 immagini in /img, favicon.svg

---

## 0. Modello di business reale (dai contenuti, non presunto)

**Casa vacanze a unità singola**, non struttura multi-unità:
- 1 appartamento, 1 camera matrimoniale, fino a **4 ospiti**
- Indirizzo: Via XXV Luglio 89–91, 84013 Cava de' Tirreni (SA)
- CIN: IT065037C2VYUSYDT9
- Contatti: +39 329 176 5764 (tel/WhatsApp), Facebook DomusCostaCava
- Nessun listino prezzi pubblico: modello "offerta personalizzata su richiesta" via WhatsApp/modulo, con pacchetti stagionali (2 giugno–30 settembre) per profili di viaggio (coppie, famiglie, smart worker, lungo soggiorno)
- Tipo Schema.org più corretto: **VacationRental** (o `LodgingBusiness` generico se si preferisce restare conservativi) — non `BedAndBreakfast` (nessuna colazione servita menzionata) né multi-unità

**Nota importante**: questa build non contiene `appartamento-amalfi.html` né `appartamento-positano.html` né `availability.json`, menzionati nel brief come file del progetto esistente. Non esistono in questo pacchetto — non li ho inventati. Se dovevano esserci, vanno ricaricati.

---

## 1. Inventario pagine

| Pagina | Title | H1 | Canonical | JSON-LD presente |
|---|---|---|---|---|
| index.html | Domus Costa \| Casa Vacanze a Cava de' Tirreni, Costiera Amalfitana | "Alle porte della perla del Sud" (diviso in 3 `<span class="mask">`) | ✅ /  | LodgingBusiness (con review + aggregateRating) |
| la-casa.html | La Casa — Appartamento rinnovato nel cuore di Cava \| Domus Costa | "Una casa vera, nel cuore di Cava." | ✅ /la-casa.html | BreadcrumbList |
| gli-spazi.html | Gli Spazi — camera, bagno in marmo, cucina e living \| Domus Costa | "Ogni stanza, un racconto." | ✅ /gli-spazi.html | BreadcrumbList |
| territorio.html | Il Territorio — Cava de' Tirreni, Positano, Amalfi, Ravello \| Domus Costa | "Da Cava, tutta la Costiera." | ✅ /territorio.html | BreadcrumbList |
| offerte.html | Offerte personalizzate — preventivo su misura \| Domus Costa | "Un'offerta su misura, per un soggiorno unico." | ✅ /offerte.html | BreadcrumbList |
| recensioni.html | Recensioni — 5,0/5 su Google, 9,8/10 su Booking \| Domus Costa | "Chi è stato qui, lo racconta meglio di noi." | ✅ /recensioni.html | BreadcrumbList (nessun Review/AggregateRating qui, correttamente) |
| faq.html | Domande frequenti — check-in, parcheggio, cancellazione \| Domus Costa | "Prima di partire, tutto chiaro." | ✅ /faq.html | BreadcrumbList + FAQPage |
| contatti.html | Contatti e Prenota — richiedi la tua offerta \| Domus Costa | "Il mare ti aspetta. La casa anche." | ✅ /contatti.html | BreadcrumbList + ContactPage |
| note-legali.html | Note legali — Privacy, Termini e Cookie \| Domus Costa | "Note legali." | ✅ /note-legali.html | BreadcrumbList |

Title e meta description sono tutti unici, pertinenti e entro lunghezza ragionevole. Nessuna duplicazione rilevata. Un solo H1 per pagina, gerarchia H2/H3 coerente in tutte le pagine controllate.

---

## 2. Criticità rilevate, in ordine di priorità

### 🔴 P1 — Bloccante per la conversione
**Link "Richiedi offerta" rotto su tutto il sito: 32 occorrenze di `contatti.html#modulo`, ma nessun elemento con `id="modulo"` esiste in `contatti.html`.**
Il form si chiama `id="bookingForm"` dentro `<div id="formWrap">`, senza l'id `modulo` che l'ancora si aspetta. Risultato: ogni CTA primaria del sito (header, hero, mobile bar, footer, sezioni offerte) porta alla pagina contatti ma **non scrolla al modulo** — su schermi dove il form non è visibile subito, l'utente non lo trova automaticamente. Impatta la CTA più importante del sito ("Richiedi offerta"), presente in ogni pagina.
→ **Decisione presa**: aggiungerò `id="modulo"` al contenitore corretto in `contatti.html`. Correzione di un'ancora HTML mancante, non un contenuto: non altera testi, prezzi, dati o struttura informativa.

### 🟠 P2 — SEO / affidabilità dei dati strutturati
**JSON-LD in `index.html` contiene `review` e `aggregateRating` con valori specifici (5.0, 7 recensioni, testi firmati "Antony", "Biagio", "Angela Dell'Olio") che io non posso verificare come pubblicati e conformi sulle piattaforme di origine al momento attuale.**
`recensioni.html` include già una dicitura di trasparenza ("i punteggi... sono quelli visibili sulle piattaforme al momento della pubblicazione di questa pagina") che è corretta in sé, ma le linee guida Schema.org/Google per il markup `Review`/`AggregateRating` richiedono che il rating sia relativo a un prodotto/servizio verificabile e non auto-dichiarato senza meccanismo di raccolta verificabile sul sito stesso.
→ **Decisione presa**: seguendo il brief ("Non aggiungere markup Review/AggregateRating se le recensioni non rispettano le linee guida o se non sono realmente presenti e verificabili sulla pagina"), **rimuovo `review` e `aggregateRating` dal JSON-LD** mantenendo il testo delle recensioni visibile in pagina (quello resta contenuto editoriale legittimo, non markup strutturato). Segnalo con `[DA COMPLETARE]` nel README la possibilità di reintrodurlo se il proprietario conferma che i punteggi sono aggiornati e le recensioni riportate sono verificabili sui profili pubblici linkati.

### 🟠 P2 — Contenuto contraddittorio interno
**`faq.html`/index (FAQ preview) dichiara "gli amici a quattro zampe di piccola taglia sono benvenuti"; `note-legali.html` conferma "animali di piccola taglia ammessi su richiesta".** Questo è coerente *internamente* tra le pagine — non è un errore nel senso stretto, ma segnalo che è un dato di policy specifico (animali ammessi) che deve essere confermato reale dal gestore, perché ha implicazioni dirette su prenotazioni e possibili contestazioni.
→ **Nessuna modifica**: il contenuto è interno coerente, la decisione di merito spetta al proprietario. Segnalato come `[DA VERIFICARE CON IL PROPRIETARIO]`.

### 🟡 P3 — Performance / Core Web Vitals
**Immagini "-hq" fino a 995 KB, usate anche in hero con `fetchpriority="high"` (elemento LCP).** Nessuna versione WebP/AVIF, nessun set responsive (`srcset`/`sizes`). Su rete mobile lenta, l'immagine hero da 500-900 KB penalizza pesantemente il Largest Contentful Paint.
→ **Decisione presa**: non posso rigenerare le immagini binarie in questo ambiente in formato WebP/AVIF ottimizzato senza un passaggio di compressione dedicato: lo documento come azione consigliata in `README-REDESIGN.md` con priorità alta, e nel frattempo aggiungo `width`/`height` a tutte le immagini mancanti per eliminare almeno il CLS (vedi punto successivo), che è interamente sotto il mio controllo.

### 🟡 P3 — Layout shift (rivalutato dopo verifica CSS)
**39 tag `<img>` su 66 totali (59%) non avevano `width`/`height` espliciti.** Analisi approfondita:
- Le **immagini locali** (`img/*.jpg`) sono ora corrette: aggiunti `width`/`height` reali dedotti dai file (es. `spazio-camera-hq.jpg` → 2749×1836).
- Le **immagini esterne Wikimedia Commons** (usate in hero, territorio, gallery) sono tutte contenute in elementi CSS con **altezza già fissa esplicita** (`.hero-bg{position:absolute;inset:0}`, `.dest .d-img{height:330px}`, `.dg-img{height:44vh}`, `.g-item` con grid-row fissa) e `object-fit:cover`. Il CLS per queste immagini è **già prevenuto strutturalmente dal CSS esistente**, indipendentemente dagli attributi `width`/`height` sul tag `<img>`. Aggiungere valori dedotti da un URL con solo il parametro `width=N` (senza conoscere l'altezza reale del file sorgente) avrebbe rischiato di introdurre un rapporto d'aspetto scorretto nell'attributo HTML, in conflitto col vero comportamento visivo (già corretto) dato da `object-fit:cover`.
→ **Decisione presa**: correzione applicata solo alle immagini locali, dove le dimensioni reali erano verificabili con certezza. Nessuna modifica alle immagini esterne: il rischio CLS lì è già mitigato dal CSS, e non introduco valori non verificati.

### 🟡 P3 — Open Graph
**`og-image.jpg` è 1080×1362 (verticale), non 1200×630 (orizzontale, lo standard raccomandato).** Su Facebook/LinkedIn/WhatsApp l'anteprima di condivisione risulterà tagliata o mostrata piccola.
→ **Decisione presa**: segnalo con `[DA COMPLETARE]` — serve una nuova immagine orizzontale fornita dal proprietario o ritagliata da una foto reale esistente; non genero un'immagine sostitutiva arbitraria.

### 🟢 P4 — Pulizia tecnica (non bloccante)
- CSS morto: `#legalModal`, `#legalTitle`, `#legalBody`, `#legalClose` definiti in `style.css` ma assenti da tutto l'HTML. Nessun impatto funzionale, solo peso CSS non necessario (~1.5 KB).
- `site.js` riga 7: `d.getElementById('year').textContent = ...` non ha guardia null-check; funziona perché l'elemento è sempre presente in tutte le pagine verificate, ma è una fragilità se in futuro si aggiunge una pagina senza footer standard.

---

## 3. Cosa NON tocco e perché

- **Struttura URL**: invariata. Nessun file rinominato, nessun redirect necessario.
- **Contenuti editoriali** (testi di la-casa.html, gli-spazi.html, territorio.html, offerte.html): sono già di alta qualità, con tono editoriale coerente, autentico e non genericamente "turistico". Non li riscrivo — sarebbe un intervento non richiesto e rischierebbe di appiattire una voce già ben calibrata.
- **Prezzi**: non ne aggiungo. Il modello "offerta su richiesta" è una scelta di business esplicita e coerente in tutto il sito; non la contraddico.
- **Recensioni testuali in pagina** (non il markup JSON-LD): restano, perché sono contenuto editoriale dichiarato come proveniente da fonti pubbliche con nota di trasparenza — diverso dal markup strutturato che ho rimosso.
- **Policy animali domestici**: non modifico, richiede conferma del proprietario.
- **availability.json**: non esiste in questo pacchetto — nessuna logica di disponibilità da preservare o alterare.

---

## 4. Piano d'azione (ordine di esecuzione)

1. Correggere il bug `#modulo` → aggiungere `id="modulo"` nel punto corretto di `contatti.html` (P1)
2. Rimuovere `review`/`aggregateRating` non verificabili dal JSON-LD di `index.html`, mantenendo il testo delle recensioni in pagina (P2)
3. Aggiungere `width`/`height` mancanti su tutte le immagini (P3, elimina CLS)
4. Documentare in `README-REDESIGN.md` la necessità di: ottimizzazione immagini WebP/AVIF, nuova og-image 1200×630, conferma policy animali (P3/P4)
5. Rimuovere CSS morto (`#legalModal` e figli) per pulizia (P4)
6. Procedere con eventuali interventi di direzione artistica solo se richiesti esplicitamente in un passo successivo — il sito attuale è già coerente con "Mediterranean Quiet Luxury": palette crema/notte/oro, serif Marcellus + sans Jost + corsivo Cormorant Garamond, nessun glassmorphism, nessun gradiente aggressivo, nessuna card banale. Non riscrivo un design system che già rispetta le linee guida del brief.

---

## 5. Nota sul modello Schema.org

Data la conferma "1 camera, 4 ospiti, 1 unità", il tipo `LodgingBusiness` già in uso è accettabile, ma **VacationRental** sarebbe semanticamente più preciso per un affitto breve di un intero immobile. Non lo cambio senza conferma: è una decisione che ha impatto SEO e va concordata, la segnalo in `SEO-MAP.md`.

## 6. Verifica esterna (10 settembre 2026)

Su richiesta è stata condotta una ricerca web per verificare la presenza reale di Domus Costa online. Risultato:

- **Confermato indipendentemente**: Domus Costa risulta elencata da Booking.com nella pagina aggregata "The 10 best apartments in Cava de' Tirreni, Italy", citata esplicitamente tra gli appartamenti più popolari della zona insieme a Casa Lamberti B&B e Belladonna Luxury Apartment. Fonte: booking.com/apartments/city/it/cava-de-tirreni.html
- **Non trovato**: la scheda Booking dedicata a Domus Costa con punteggio esatto, numero recensioni aggiornato o foto proprietarie non è comparsa nei risultati di ricerca indicizzati in questo momento. Questo non significa che non esista — significa solo che non è verificabile da qui con certezza sufficiente per essere riportata come dato numerico nel sito o nel markup.
- **Nessuna nuova foto o recensione è stata aggiunta al sito sulla base di questa ricerca**, in coerenza con la policy di non inventare o dedurre dati non direttamente verificabili.

Questa conferma esterna rafforza la scelta già fatta di mantenere il testo delle recensioni in pagina (dati forniti dal proprietario) senza reintrodurre markup `AggregateRating`/`Review`, che richiederebbe un accesso diretto e aggiornato alla fonte, non una menzione di terze parti in una pagina aggregata.

**Azione consigliata al proprietario**: verificare il link diretto alla propria scheda Booking.com e Google Business Profile e comunicarli per un futuro aggiornamento dei link nel footer/contatti del sito (vedi `LOCAL-SEO-CHECKLIST.md`).
