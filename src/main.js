import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import BootstrapVue3 from 'bootstrap-vue-3';
// Rimosso il plugin vue-youtube-embed

const app = createApp(App);
app.use(router);
app.use(BootstrapVue3);
// Rimosso app.use per vue-youtube-embed
app.mount('#app');
