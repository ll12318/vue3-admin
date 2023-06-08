import { createRouter, createWebHashHistory } from "vue-router";
import other from "./other";
import system from "./system";
import nest from "./nest";
import dataVisualization from "./dataVisualization";
import css from "./css";
export const routes = [
  {
    path: "/",
    name: "Layout",
    component: () => import("../views/layout/index.vue"),
    meta: {
      title: "首页",
      icon: "icon-home",
      keepAlive: true,
    },
    children: [
      {
        path: "/home",
        name: "Home",
        meta: {
          title: "首页",
          icon: "el-icon-s-home",
          keepAlive: true,
        },
        children: [
          {
            path: "/home/home1",
            name: "Home1",
            isPage: true,
            component: () => import("../views/Home1.vue"),
            meta: {
              title: "Home1",
              icon: "icon-filesearch",
              keepAlive: true,
            },
          },
        ],
      },
      {
        path: "/about",
        name: "About",
        component: () => import("../views/About.vue"),
        meta: {
          title: "关于",
          icon: "icon-filesearch",
          keepAlive: true,
        },
      },
    ],
  },
  ...other,
  ...system,
  ...nest,
  ...dataVisualization,
  ...css,
];

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
});

export default router;
