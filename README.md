# YoYo Friends

YoYo Friends è un'applicazione web per la condivisione di video di yoga progettata per creare una community inclusiva e ispirare la pratica quotidiana.

## Funzionalità Principali
- **Lista Video Community**: Visualizza video caricati dalla community con titolo, autore e miniatura.
- **Embed YouTube**: Riproduzione nativa in iframe dei video YouTube.
- **Commenti**: Sezione social-style per aggiungere e visualizzare commenti (persistenza in localStorage).
- **Badge “Nuovo”**: Indicatori per video pubblicati nelle ultime 48 ore.
- **Skeleton Loader & Animazioni**: Caricamento con placeholder animati e transizioni fluide.
- **Responsive & Mobile-First**: Layout adattivo per ogni dispositivo.

## Tecnologie Utilizzate
- **Framework**: Vue 3, Vue Router 4
- **UI**: Bootstrap 5, BootstrapVue3
- **HTTP Client**: Axios
- **Deploy (Static Site)**: GitHub Pages

## Installazione e Utilizzo

### Requisiti
- Node.js (>=14.x)
- npm (>=6.x)

### Setup
```bash
git clone https://github.com/AntoDev00/YoYo.github.io.git
cd YoYo.github.io
npm install
npm run serve
```

## Struttura del Progetto
```
yoyo/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   └── yoyo-logo.svg
│   ├── components/
│   │   └── CommentSection.vue
│   ├── views/
│   │   ├── Home.vue
│   │   └── VideoPage.vue
│   ├── App.vue
│   ├── main.js
│   └── router/index.js
├── README.md
├── LICENSE
└── package.json
```

## Come Utilizzare l'App
1. **Home**: Sfoglia i video della community.
2. **Dettaglio Video**: Clicca su un video per aprire l'embed e i commenti.
3. **Aggiungi Commenti**: Scrivi il tuo nome e commento per partecipare.

## Roadmap
- Integrazione backend reale per commenti
- Autenticazione utente
- Pagine profilo
- Filtri e ricerca avanzata

## Licenza
Questo progetto è distribuito con licenza MIT. Consulta il file `LICENSE` per maggiori dettagli.

---

Creato con ❤️ per la community YoYo.
