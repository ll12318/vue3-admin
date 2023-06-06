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
        path: "/flex1",
        name: "flex1",
        meta: {
          title: "flex1",
          // icon: "el-icon-s-home",
          keepAlive: true,
        },
        component: () => import("../views/css/flex1/index.vue"),
      },
    ],
  },
];
