<template>
  <Card title="内容时段分析">
    <template #default>
      <div style="height: 400px" id="ContentPeriodAnalysisEcharts"></div
    ></template>
    <template #more>
      <span>查看更多</span>
    </template>
  </Card>
</template>

<script lang="ts" setup name="ContentPeriodAnalysis">
import Card from "@/components/card.vue";
import * as echarts from "echarts";
import { onMounted } from "vue";

type EChartsOption = echarts.EChartsOption;

var chartDom;
var myChart;
var option: EChartsOption;
// 生成9条随机数据，10 到99 之间
function handleRandomData() {
  let arr = [];
  for (let i = 0; i < 9; i++) {
    arr.push(Math.floor(Math.random() * 90 + 10));
  }
  return arr;
}

onMounted(() => {
  chartDom = document.getElementById("ContentPeriodAnalysisEcharts")!;
  myChart = echarts.init(chartDom);
  option && myChart.setOption(option);
}),
  (option = {
    legend: {
      data: ["视频类", "图文类", "纯文本"],
      bottom: 0,
    },
    // 位置
    grid: {
      left: "3%",
      right: "4%",
      top: "3%",
      bottom: "10%",
      containLabel: true,
      show: false,
    },

    // 提示框
    tooltip: {
      trigger: "axis",
      // 单位
    },

    xAxis: {
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
      // 折线从开始位置出现
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
      // 单位
      axisLabel: {
        formatter: "{value} %",
      },
    },
    series: [
      {
        name: "视频类",
        data: handleRandomData(),
        type: "line",
        smooth: true,
        symbol: "none", // 去掉点
      },
      {
        name: "图文类",
        data: handleRandomData(),
        type: "line",
        smooth: true,
        symbol: "none", // 去掉点
      },
      {
        name: "纯文本",
        data: handleRandomData(),
        type: "line",
        smooth: true,
        symbol: "none", // 去掉点
      },
    ],
  });
</script>
