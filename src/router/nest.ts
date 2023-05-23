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
        name: "nest_curd",
        meta: {
          title: "curd",
          // icon: "el-icon-s-home",
          keepAlive: true,
        },
        component: () => import("../views/nest/curd/index.vue"),
      },
    ],
  },
];
