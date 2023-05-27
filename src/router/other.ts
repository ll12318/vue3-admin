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
      {
        path: "/vue3",
        name: "vue3",
        redirect: "/vue3/ref",
        meta: {
          title: "vue3",
          // icon: "el-icon-s-home",
          keepAlive: true,
        },
        children: [
          {
            path: "/vue3/ref",
            name: "vue3_ref",
            component: () => import("../views/other/vue3/ref.vue"),
            meta: {
              title: "ref",
              // icon: "icon-filesearch",
              keepAlive: true,
            },
          },
        ],
      },
    ],
  },
];
