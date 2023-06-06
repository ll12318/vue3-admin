<template>
  <div class="flex1">
    <Card title="flex1" :animation="false">
      <template #title>
        <el-popover
          placement="right-start"
          :width="400"
          trigger="hover"
          :content="msg"
        >
          <template #reference>
            <span>flex1</span>
          </template>
        </el-popover>
      </template>
      <div class="flex1">
        <div>
          <el-switch
            v-model="isShow"
            active-text="flex1"
            inactive-text="width:100%"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
          flex:1盒子的宽度变化: {{ flexWidth }} ---- 固定宽度盒子的宽度:
          {{ boxWidth }}
        </div>
        <div class="flex1_item">
          <div
            class="flex1_item_left"
            :style="isShow ? 'flex:1' : 'width: 100%'"
            id="main"
            style="height: 100%"
          ></div>
          <div class="flex1_item_right">固定宽度</div>
        </div>
      </div>
    </Card>
  </div>
</template>
<script lang="ts" setup name="flex1">
import Card from "../../../components/card.vue";
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

var option: any;
const msg =
  "当echart父元素为flex1时，监听宽度变化，重新渲染echart（ myChart.resize();）。由窄变宽宽度会变化，由宽变窄宽度不会变化，会导致溢出。这时候就不能用flex：1，要用width：100%。";

const flexWidth = ref(0);
const boxWidth = ref(0);
const isShow = ref(true);
onMounted(() => {
  var chartDom = document.getElementById("main");
  var myChart = echarts.init(chartDom as HTMLDivElement);
  option && myChart.setOption(option);

  const obj = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const { width, height } = entry.contentRect;
      flexWidth.value = Math.floor(width);
      myChart.resize();
    }
  });

  const boxObj = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const { width, height } = entry.contentRect;
      boxWidth.value = Math.floor(width);
    }
  });

  boxObj.observe(document.querySelector(".flex1_item_right") as HTMLDivElement);

  obj.observe(chartDom as HTMLDivElement);
}),
  (option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  });
</script>

<style lang="scss" scoped>
.flex1 {
  width: 100%;
  height: 100%;
  .flex1_item {
    // 可自由拖拽调整宽度
    // resize: horizontal;
    color: #fff;
    text-align: center;
    line-height: 100px;
    display: flex;
    border: 1px solid #000;
    overflow-y: auto;
    .flex1_item_left {
      background-color: #409eff;
      color: #fff;
      text-align: center;
      line-height: 100px;
    }
    .flex1_item_right {
      width: 300px;
      background-color: #149236;
      color: #fff;
      text-align: center;
      line-height: 100px;
    }
  }
}
</style>
