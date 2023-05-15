export default [
  {
    path: "/system",
    name: "system",
    meta: {
      title: "系统",
      icon: "icon-gold",
      keepAlive: true,
    },
    component: () => import("@/views/layout/index.vue"),
    children: [
      {
        path: "/systemInfo",
        name: "systemInfo",
        meta: {
            title: "系统信息",
            keepAlive: true,
        },
        component: () => import("@/views/system/ServerInfo.vue"),
      }
    ],
  },
];
