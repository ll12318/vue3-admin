<template>
  <Card title="舆情分析">
    <template #default>
      <div class="publicOpinionAnalysis">
        <DataCard class="item" :cardData="cardData[0]">
          <div
            :id="'main' + cardData[0].id"
            style="width: 100%; height: 100%"
          ></div
        ></DataCard>
        <DataCard class="item" :cardData="cardData[1]">
          <div
            :id="'main' + cardData[1].id"
            style="width: 100%; height: 100%"
          ></div>
        </DataCard>
        <DataCard class="item" :cardData="cardData[2]">
          <div
            :id="'main' + cardData[2].id"
            style="width: 100%; height: 100%"
          ></div>
        </DataCard>
        <DataCard class="item" :cardData="cardData[3]" :animation="false">
          <div
            :id="'main' + cardData[3].id"
            style="width: 100%; height: 100%"
          ></div
        ></DataCard>
      </div>
    </template>
  </Card>
</template>
<script lang="ts" setup>
import Card from "@/components/card.vue";
import DataCard from "@/components/dataCard.vue";
import { ref, onMounted, Ref } from "vue";
import * as echarts from "echarts";

type EChartsOption = echarts.EChartsOption;

var chartDom;
var myChart;
var option: EChartsOption;
type CardData = {
  id: number;
  title: string;
  value: string;
  trend: string;
  color: string;
};

const cardData: Ref<CardData[]> = ref([
  {
    id: 1,
    title: "访问总人数1",
    value: "12,256",
    trend: "206",
    color: "#eff7fd",
  },
  {
    id: 2,
    title: "访问总人数2",
    value: "12,256",
    trend: "206",
    color: "#f5fef3",
  },
  {
    id: 3,
    title: "访问总人数3",
    value: "12,256",
    trend: "206",
    color: "#f1f8fd",
  },
  {
    id: 4,
    title: "访问总人数4",
    value: "12,256",
    trend: "206",
    color: "#f4f4fe",
  },
]);

const option1 = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "15%",
    left: "60%",
    // 文字大小
    textStyle: {
      fontSize: 12,
      fontWeight: "400",
    },
    icon: "circle",

    //圆圈大小
    itemWidth: 8,
  },
  series: [
    {
      // name: "Access From",
      type: "pie",
      radius: ["35%", "50%"],
      avoidLabelOverlap: false,
      //饼图位置
      center: ["30%", "50%"],
      //饼图大小
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: false,
          // 位置
          fontSize: 12,
          fontWeight: "400",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "纯文本" },
        { value: 735, name: "图文类" },
        { value: 580, name: "视频类" },
      ],
    },
  ],
};
onMounted(() => {
  for (let i = 0; i < cardData.value.length; i++) {
    // 如果id为1的话，跳过循环
    if (cardData.value[i].id === 3) continue;
    chartDom = document.getElementById("main" + cardData.value[i].id);
    myChart = echarts.init(chartDom as HTMLDivElement);
    option && myChart.setOption(option);
  }
  const chartDom1 = document.getElementById("main3");
  const myChart1 = echarts.init(chartDom1 as HTMLDivElement);
  option1 && myChart1.setOption(option1);
}),
  (option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      show: false,
    },
    yAxis: {
      type: "value",
      show: false,
    },
    series: [
      {
        data: [700, 932, 901, 500, 1290, 800, 1320],
        type: "line",
        smooth: true,
        symbol: "none",
      },
    ],
  });
</script>

<style lang="scss" scoped>
.publicOpinionAnalysis {
  display: flex;
  .item {
    width: 25%;
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
