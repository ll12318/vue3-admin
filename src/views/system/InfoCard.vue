<template>
  <el-card class="box-card" style="margin: 20px 10px">
    <template #header>
      <div class="card-header">
        <span>CPU</span>

        <el-button
          @click="handleDom"
          style="float: right; margin-top: -4px"
          class="button"
          text
          ><i class="iconfont icon-reload"></i
        ></el-button>
      </div>
    </template>
    <div
      v-loading="loading"
      style="
        display: flex;
        align-items: center;
        justify-content: space-around;
        min-height: 300px;
      "
    >
      <el-row style="flex: 0.6" v-if="info.cpu">
        <el-col :span="6">
          <el-statistic title="核心数" :value="info.cpu['核心数']" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="当前空闲率" :value="info.cpu['当前空闲率']">
          </el-statistic>
        </el-col>
        <el-col :span="6">
          <el-statistic title="用户使用率" :value="info.cpu['用户使用率']" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="系统使用率" :value="info.cpu['系统使用率']">
          </el-statistic>
        </el-col>
      </el-row>
      <div v-show="info.cpu" id="cpu" style="width: 300px; height: 300px"></div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { getServerInfo } from "../../api";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption,
} from "echarts/components";
import { PieChart, PieSeriesOption } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);
type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | PieSeriesOption
>;
var chartDom: any;
var myChart: any;
var option: EChartsOption;
onMounted(() => {
  chartDom = document.getElementById("cpu")!;
  myChart = echarts.init(chartDom);
  option = {
    tooltip: {
      trigger: "item",
    },

    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          { value: 100, name: "当前空闲率" },
          { value: 0, name: "用户使用率" },
          { value: 0, name: "系统使用率" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  option && myChart.setOption(option);
});
const info: any = ref({});
watch(info, (newVal, oldVal) => {
  console.log(newVal);
  handleCup(newVal.cpu);
});
const loading = ref(false);
const handleCup = (data: any) => {
  console.log(data, "data");
  option &&
    myChart.setOption({
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: [
            {
              value: parseFloat(data["当前空闲率"]),
              name: "当前空闲率" + data["当前空闲率"],
            },
            {
              value: parseFloat(data["用户使用率"]),
              name: "用户使用率" + data["用户使用率"],
            },
            {
              value: parseFloat(data["系统使用率"]),
              name: "系统使用率" + data["系统使用率"],
            },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });
};
const handleDom = () => {
  loading.value = true;
  getServerInfo()
    .then((res) => {
      let url = res.data;
      const regex1 = /<div class="ibox-content">[\s\S]*?<\/div>/g; // 正则表达式
      const match = url.match(regex1);
      const keys = [
        "cpu",
        "memory",
        "serverInformation",
        "javaVirtualMachineInformation",
        "diskStatus",
      ];
      let sysInfo: any = {};
      keys.forEach((key, index) => {
        sysInfo[key] = match[index];
      });
      for (const key in sysInfo) {
        const str = sysInfo[key];
        const regex = /<td>(.*?)<\/td>\s+<td>(.*?)<\/td>/g;
        const matches = str.match(regex);

        const obj: any = {};
        for (let i = 0; i < matches.length; i++) {
          const match = matches[i].match(/<td>(.*?)<\/td>\s+<td>(.*?)<\/td>/);
          obj[match[1]] = match[2];
        }
        sysInfo[key] = obj;
      }
      console.log(sysInfo);
      info.value = sysInfo;
      loading.value = false;
    })
    .catch(() => (loading.value = false));
};
handleDom();
const timer = setInterval(handleDom, 1000 * 60 * 30);
onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style></style>
