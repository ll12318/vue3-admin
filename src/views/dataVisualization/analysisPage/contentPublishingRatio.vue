<template>
  <Card
    title="内容发布比例"
    style="height: 440px"
    class="ContentPublishingRatio"
  >
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
import { computed, ref } from "vue";
import useEcharts from "../../../hooks/useEcharts";
import { handleRandomData } from "../../../utils/index";
import useSetInterval from "../../../hooks/useSetInterval";

// 定义数据类型
interface IEchartsDataData {
  video: number[];
  text: number[];
  image: number[];
}

// 模拟数据
const mockDate = (): Promise<IEchartsDataData> => {
  const data = {
    video: handleRandomData(9, 100, 200),
    text: handleRandomData(9, 100, 200),
    image: handleRandomData(9, 100, 200),
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};

// 定义响应式数据
const echartsData = ref<IEchartsDataData>({
  video: [],
  text: [],
  image: [],
});

// 获取数据
const getEchartsData = async () => {
  const data = await mockDate();
  echartsData.value = data;
};

getEchartsData();

// 定义 Echarts 配置项
const op = computed(() => {
  return {
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
        data: echartsData.value.video,
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
        data: echartsData.value.image,
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
        data: echartsData.value.text,
      },
    ],
  };
});

useSetInterval(getEchartsData, 1000);

// 使用 Echarts 渲染图表
useEcharts("ContentPublishingRatio", "ContentPublishingRatioEcharts", op);
</script>
