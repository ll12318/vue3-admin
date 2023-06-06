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
import { ref, computed, Ref, onMounted, onUnmounted } from "vue";
import useEcharts from "../../../hooks/useEcharts";
import { handleRandomData } from "../../../utils/index";
import useSetInterval from "../../../hooks/useSetInterval";

// 定义卡片数据类型
type CardData = {
  id: number;
  title: string;
  value: string;
  trend: string;
  color: string;
  opt?: any;
};

// 定义响应式数据
const echartsData = ref<any[]>([]);

// 定义卡片数据
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

// 模拟数据
const mockData = (): Promise<number[][]> => {
  const data: number[][] = [];
  cardData.value.forEach(() => {
    data.push(handleRandomData(7, 1000, 2000));
  });
  data[2] = handleRandomData(3, 1000, 2000);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};

// 计算属性
const op3 = computed(() => {
  return {
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
          { value: echartsData.value[2]?.[0], name: "纯文本" },
          { value: echartsData.value[2]?.[1], name: "图文类" },
          { value: echartsData.value[2]?.[2], name: "视频类" },
        ],
      },
    ],
  };
});

const op1 = computed(() => ({
  tooltip: {
    trigger: "axis",
  },
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
      data: echartsData.value[0],
      type: "line",
      smooth: true,
      symbol: "none",
    },
  ],
}));

const op2 = computed(() => ({
  tooltip: {
    trigger: "axis",
  },
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
      data: echartsData.value[1],
      type: "line",
      smooth: true,
      symbol: "none",
    },
  ],
}));

const op4 = computed(() => ({
  tooltip: {
    trigger: "axis",
  },
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
      data: echartsData.value[3],
      type: "line",
      smooth: true,
      symbol: "none",
    },
  ],
}));

// 获取echarts数据
const getEchartsData = () => {
  mockData().then((res) => {
    echartsData.value = res;
  });
};

// 处理echarts选项
const handleOption = (index: number) => {
  switch (index) {
    case 0:
      return op1;
    case 1:
      return op2;
    case 2:
      return op3;
    case 3:
      return op4;
  }
};

// 遍历卡片数据，渲染echarts
for (let i = 0; i < cardData.value.length; i++) {
  // 如果id为1的话，跳过循环
  if (cardData.value[i].id === 3) continue;
  useEcharts(
    "publicOpinionAnalysis",
    "main" + cardData.value[i].id,
    handleOption(i)
  );
}

// 渲染第三个echarts
useEcharts("publicOpinionAnalysis", "main" + 3, op3);

// 定时器
useSetInterval(getEchartsData, 1000);

// 获取echarts数据
getEchartsData();
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
