import App from "./App.vue";
import routerOptions from "./router/router";
import enDictionary from "./locales/en";

import { createPinia } from "pinia";
import { createApp } from "vue";
import { createRouter } from "vue-router";
import { createI18n } from "vue-i18n";

import "./style.scss";

// Plugin initialization
const app = createApp(App);
const router = createRouter(routerOptions);
const pinia = createPinia();
const i18n = createI18n<[typeof enDictionary], "en">({
  legacy: false,
  globalInjection: true,
  locale: "en",
  messages: {
    en: enDictionary,
  },
});

// Using a bunch of plugins
app.use(router);
app.use(pinia);
app.use(i18n);
app.mount("#app");
