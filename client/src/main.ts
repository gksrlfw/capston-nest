import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import ChartPlugin from "@/plugins/ChartPlugin";
import AxiosPlugin from "@/plugins/AxiosPlugin";

createApp(App).use(router).use(ChartPlugin).use(AxiosPlugin).mount("#app");
