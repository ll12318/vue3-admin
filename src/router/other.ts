export default [
  {
    path: "/other",
    name: "Other",
    meta: {
      title: "其他",
      icon: "icon-appstore-fill",
      keepAlive: true,
    },
    component: () => import("../views/layout/index.vue"),
    redirect: "/wireless_scroll",
    children: [
      {
        path: "/wireless_scroll",
        name: "wireless_scroll",
        meta: {
          title: "无限滚动",
          // icon: "el-icon-s-home",
          keepAlive: true,
        },
        redirect: "/wireless_scroll1",
        children: [
          {
            path: "/wireless_scroll1",
            name: "wireless_scroll1",
            component: () => import("../views/other/wireless_scroll/index.vue"),
            meta: {
              title: "无限滚动1",
              // icon: "icon-filesearch",
              keepAlive: true,
            },
          },
          {
            path: "/wireless_scroll_table",
            name: "wireless_scroll_table",
            component: () =>
              import("../views/other/wireless_scroll/scroll_table.vue"),
            meta: {
              title: "无限滚动表格",
              // icon: "icon-filesearch",
              keepAlive: true,
            },
          },
        ],
      },
    ],
  },
];
