import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";

const routes = [
  {
    path: "/",
    name: "Layout",
    component: () => import("../views/layout/index.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),

  routes,
});

export default router;
