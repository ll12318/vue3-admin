<template>
  <Card title="内容发布比例" style="height: 440px">
    <template #default>
      <div style="height: 360px" id="ContentPublishingRatioEcharts"></div>
    </template>

    <template #more>
      <span> 查看更多 </span>
    </template>
  </Card>
</template>

<script lang="ts" setup name="ContentPublishingRatio">
import Card from "@/components/card.vue";
import { onMounted } from "vue";
import * as echarts from "echarts";
type EChartsOption = echarts.EChartsOption;
var chartDom;
var myChart;
var option: EChartsOption;
onMounted(() => {
  chartDom = document.getElementById("ContentPublishingRatioEcharts");
  myChart = echarts.init(chartDom as HTMLDivElement);
  option && myChart.setOption(option);
}),
  (option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      // 位置
      bottom: "0",
      icon: "circle",
      // 颜色
      data: [
        {
          name: "视频类",
          itemStyle: {
            color: "#98e0fc",
          },
        },
        {
          name: "图文类",
          itemStyle: {
            color: "#4faff8",
          },
        },
        {
          name: "纯文本",
          itemStyle: {
            color: "#3a6cf6",
          },
        },
      ],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: [
          "6:00",
          "8:00",
          "10:00",
          "12:00",
          "14:00",
          "16:00",
          "18:00",
          "20:00",
          "22:00",
        ],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "视频类",
        type: "bar",
        stack: "Ad",

        // 柱子的宽度
        barWidth: 15,
        // 柱子的颜色
        itemStyle: {
          color: "#98e0fc",
        },
        emphasis: {
          focus: "series",
        },
        data: [120, 132, 101, 134, 90, 230, 210, 134, 90],
      },
      {
        name: "图文类",
        type: "bar",
        stack: "Ad",
        itemStyle: {
          color: "#4faff8",
        },
        barWidth: 15,
        emphasis: {
          focus: "series",
        },
        data: [220, 182, 191, 234, 290, 330, 310, 134, 90],
      },
      {
        name: "纯文本",
        type: "bar",
        stack: "Ad",
        itemStyle: {
          color: "#3a6cf6",
        },
        barWidth: 15,
        emphasis: {
          focus: "series",
        },
        data: [150, 232, 201, 154, 190, 330, 410, 134, 90],
      },
    ],
  });
</script>
