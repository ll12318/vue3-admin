import { fa } from "element-plus/es/locale";

export default [
  {
    path: "/nest",
    name: "Nest",
    meta: {
      title: "Nestjs",
      icon: "icon-appstore-fill",
      keepAlive: true,
    },
    component: () => import("../views/layout/index.vue"),
    redirect: "/nest/",
    children: [
      {
        path: "/nest/",
        isPage: true,
        name: "nest_home",
        meta: {
          title: "nest.js",
          // icon: "el-icon-s-home",
          keepAlive: true,
        },
        component: () => import("../views/nest/index.vue"),
      },
      {
        path: "/nest/curd",
        isPage: true,
        name: "nest_curd",
        meta: {
          title: "curd",
          // icon: "el-icon-s-home",
          keepAlive: true,
        },
        component: () => import("../views/nest/curd/index.vue"),
      },
      {
        path: "/nest/user",
        name: "nest_user",
        meta: {
          title: "user",
          // icon: "el-icon-s-home",
          keepAlive: true,
        },
        redirect: "/nest/user",
        children: [
          {
            path: "/nest/user/login",
            isPage: true,
            name: "nest_user_login",
            meta: {
              title: "login",
              // icon: "el-icon-s-home",
              keepAlive: true,
              hidden: false,
            },
            component: () => import("../views/nest/user/login.vue"),
          },
          {
            isPage: true,
            path: "/nest/user",
            name: "nest_user_index",
            meta: {
              title: "index",
              // icon: "el-icon-s-home",
              keepAlive: true,
            },
            component: () => import("../views/nest/user/index.vue"),
          },
        ],
      },
    ],
  },
];
