<template>
  <Card title="内容时段分析" class="ContentPeriodAnalysis">
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
import useEcharts from "../../../hooks/useEcharts";
import { computed, ref, Ref } from "vue";
import { handleRandomData } from "../../../utils/index";
import useSetInterval from "../../../hooks/useSetInterval";
const op = computed(() => {
  return {
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
      // 折线位置从开始出现
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
        data: echartsData.value.a,
        type: "line",
        smooth: true,
        symbol: "none", // 去掉点
      },
      {
        name: "图文类",
        data: echartsData.value.b,
        type: "line",
        smooth: true,
        symbol: "none", // 去掉点
      },
      {
        name: "纯文本",
        data: echartsData.value.c,
        type: "line",
        smooth: true,
        symbol: "none", // 去掉点
      },
    ],
  };
});

interface IEchartsData {
  a: number[];
  b: number[];
  c: number[];
}
const mockDate = async (): Promise<IEchartsData> => {
  const res = {
    a: handleRandomData(9, 10, 40),
    b: handleRandomData(9, 10, 40),
    c: handleRandomData(9, 10, 40),
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(res);
    }, 10);
  });
};

const echartsData: Ref<IEchartsData> = ref({
  a: [],
  b: [],
  c: [],
});

const getEchartsData = async () => {
  const res = await mockDate();
  echartsData.value = res;
};
getEchartsData();

useSetInterval(getEchartsData, 1000);

useEcharts("ContentPeriodAnalysis", "ContentPeriodAnalysisEcharts", op);
</script>
