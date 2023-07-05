import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "uno.css";
// @ts-ignore
// 123
window.version = "1.0.0";
const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(createPinia());
app.mount("#app");
