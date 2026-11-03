# SEO-MAP — Domus Costa

Mappa SEO per URL, basata sui contenuti realmente presenti nel sito. Nessuna keyword stuffing, nessuna pagina duplicata proposta.

---

## Nota preliminare sul tipo Schema.org

Il sito usa `LodgingBusiness` in `index.html`, con due entità `Apartment` annidate in `containsPlace` per Amalfi (max 4 ospiti) e Positano (max 2 ospiti) — coerente con il modello reale confermato dal proprietario: due appartamenti indipendenti nello stesso edificio di Via XXV Luglio. Questa struttura (organizzazione principale + unità figlie) è quella raccomandata da Schema.org per strutture con più unità distinte. **[DA DECIDERE CON IL PROPRIETARIO]**: se in futuro si creano pagine dedicate per ciascun appartamento, ogni pagina potrà avere il proprio markup `Apartment` completo con `@id` proprio, referenziato dalla pagina principale.

---

## / (index.html)

- **Intento**: navigazionale + informativo, primo punto di contatto per query brand e query locali generiche
- **Keyword primaria**: casa vacanze Cava de' Tirreni
- **Keyword secondarie**: casa vacanze Costiera Amalfitana, alloggio vicino Positano Amalfi, dove dormire Cava de' Tirreni
- **Title attuale**: "Domus Costa | Casa Vacanze a Cava de' Tirreni, Costiera Amalfitana" — corretto, non richiede modifiche
- **Meta description attuale**: già efficace, menziona rating reali e CTA WhatsApp
- **H1 attuale**: "Alle porte della perla del Sud" — evocativo, coerente col brand; non contiene la keyword esatta ma il contesto (Cava de' Tirreni, Costiera) è nel kicker e nel sottotitolo, il che è accettabile per una home editoriale
- **Link interni consigliati**: già presenti verso tutte le pagine principali (la-casa, gli-spazi, territorio, offerte, recensioni, faq, contatti) — buona struttura a silo piatto
- **CTA primaria**: "Richiedi la tua offerta" → ora corretta verso `contatti.html#modulo`
- **CTA secondaria**: "Scopri la casa" → `la-casa.html`

## /la-casa.html

- **Intento**: informativo approfondito, rassicurazione pre-conversione
- **Keyword primaria**: appartamento Cava de' Tirreni 4 ospiti
- **Keyword secondarie**: casa vacanze rinnovata Cava de' Tirreni, alloggio con parcheggio gratuito Cava
- **Title/meta/H1**: già ottimizzati e specifici, nessuna modifica necessaria
- **Link interni**: verso gli-spazi.html (successiva) e index.html (precedente) — corretto
- **CTA primaria**: "Richiedi la tua offerta"
- **CTA secondaria**: "Scopri gli spazi"

## /gli-spazi.html

- **Intento**: informativo/emozionale, galleria dettagliata per rassicurare sulla qualità reale
- **Keyword primaria**: interni casa vacanze Cava de' Tirreni
- **Keyword secondarie**: camera letto ferro battuto, bagno marmo casa vacanze, cucina attrezzata appartamento
- **Title/meta/H1**: coerenti, buona densità di dettagli reali (7 spazi nominati) senza keyword stuffing
- **Link interni**: verso territorio.html (successiva) e la-casa.html (precedente)
- **CTA**: implicita nel pager; si consiglia di verificare se una CTA "Richiedi offerta" esplicita in fondo alla pagina migliorerebbe la conversione (attualmente la pagina è puramente contemplativa, il che è una scelta editoriale legittima)

## /territorio.html

- **Intento**: informativo, query di pianificazione viaggio ("dove dormire per visitare la Costiera")
- **Keyword primaria**: dove dormire per visitare Costiera Amalfitana
- **Keyword secondarie**: Cava de' Tirreni Salerno Vietri distanza, come arrivare ad Amalfi da Cava, parcheggio Costiera Amalfitana alternative
- **Title/meta/H1**: eccellenti, rispondono a un intento di ricerca reale e specifico (il vantaggio del parcheggio/logistica è un differenziale competitivo vero, non inventato)
- **Contenuto**: le distanze/tempi indicati (es. "≈ 60 min · 35 km" per Positano) sono informazione di utilità reale per il viaggiatore, coerente con lo scopo dichiarato dal brief per questa pagina — non vanno rimossi
- **Link interni**: verso offerte.html (successiva), gli-spazi.html (precedente)

## /offerte.html

- **Intento**: transazionale, penultimo step prima della conversione
- **Keyword primaria**: offerta personalizzata casa vacanze Costiera Amalfitana
- **Keyword secondarie**: preventivo soggiorno Cava de' Tirreni, pacchetti vacanza smart working Costiera
- **Title/meta/H1**: corretti, comunicano chiaramente il modello "no prezzi pubblici, offerta su richiesta" senza creare aspettative false
- **Link interni**: verso recensioni.html (successiva), territorio.html (precedente), contatti.html#modulo (CTA)

## /recensioni.html

- **Intento**: informativo/fiducia (trust signal)
- **Keyword primaria**: recensioni Domus Costa Cava de' Tirreni
- **Nessuna keyword aggiuntiva necessaria**: pagina di trust, non deve competere per traffico organico proprio
- **Title/meta/H1**: corretti
- **Markup strutturato**: JSON-LD `BreadcrumbList` presente e corretto; **nessun `Review`/`AggregateRating`** aggiunto qui né altrove, per scelta prudenziale del proprietario (vedi README-REDESIGN.md)
- **Link interni**: verso faq.html (successiva), offerte.html (precedente)

## /faq.html

- **Intento**: informativo, intercetta query "people also ask" e query vocali/conversazionali
- **Keyword primaria**: domande frequenti casa vacanze Cava de' Tirreni
- **Markup**: `FAQPage` JSON-LD presente e sincronizzato col contenuto visibile in pagina (requisito Google rispettato: le risposte nel markup sono identiche a quelle mostrate)
- **Link interni**: verso contatti.html (successiva), recensioni.html (precedente)

## /contatti.html

- **Intento**: transazionale, pagina di conversione finale
- **Keyword primaria**: prenota casa vacanze Cava de' Tirreni
- **Title/meta/H1**: corretti
- **Fix applicato**: ancora `#modulo` ora funzionante (era il problema SEO/UX più grave del sito: tutte le CTA del sito confluiscono qui)
- **Markup**: `ContactPage` JSON-LD, minimale e corretto
- **Link interni**: verso la-casa.html (torna all'inizio), faq.html (precedente)

## /note-legali.html

- **Intento**: compliance, bassa priorità SEO (correttamente impostata a priority 0.3 in sitemap.xml)
- **Nessuna keyword target**: corretto così, è una pagina legale non una pagina di acquisizione
- **Nota di merito**: dichiara trasparentemente l'uso di IA generativa nella creazione del sito (Reg. UE 2024/1689, art. 50) — buona pratica non richiesta esplicitamente ma già presente

---

## Query non coperte da nuove pagine (per scelta, non per dimenticanza)

Il brief chiede esplicitamente di non creare pagine quasi-duplicate per varianti minime di keyword. Non propongo quindi pagine separate per singole località (es. "Domus Costa vicino ad Amalfi", "Domus Costa vicino a Positano") quando il contenuto sarebbe ripetitivo rispetto a `territorio.html`, che già copre tutte le destinazioni in una guida unica e di qualità superiore a pagine frammentate.
