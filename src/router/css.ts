export default [
  {
    path: "/css",
    name: "css",
    meta: {
      title: "css",
      icon: "icon-appstore-fill",
      keepAlive: true,
    },
    component: () => import("../views/layout/index.vue"),
    children: [
      {
        path: "/css/flex1",
        name: "flex1",
        meta: {
          title: "flex1",
          // icon: "el-icon-s-home",
          keepAlive: true,
        },
        component: () => import("../views/css/flex1/index.vue"),
      },
      {
        path: "/css/scss",
        name: "scss",
        meta: {
          title: "scss",
          // icon: "el-icon-s-home",
          keepAlive: true,
        },
        children: [
          {
            path: "/css/scss/color",
            name: "color",
            meta: {
              title: "颜色变淡",
              // icon: "el-icon-s-home",
              keepAlive: true,
            },
            component: () => import("../views/css/scss/fadeInColor.vue"),
          },
        ],
      },
    ],
  },
];
