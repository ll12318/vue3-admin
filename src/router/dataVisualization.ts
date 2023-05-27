export default [
  {
    path: "/dataVisualization",
    name: "dataVisualization",
    meta: {
      title: "数据可视化",
      icon: "icon-appstore-fill",
      keepAlive: true,
    },
    component: () => import("../views/layout/index.vue"),
    children: [
      {
        path: "/analysisPage",
        name: "analysisPage",
        meta: {
          title: "分析页",
          // icon: "el-icon-s-home",
          keepAlive: true,
        },
        component: () =>
          import("../views/dataVisualization/analysisPage/index.vue"),
      },
    ],
  },
];
