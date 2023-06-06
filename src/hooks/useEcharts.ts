import { onMounted, onUnmounted, watch } from "vue";
import * as echarts from "echarts";
import _ from "lodash";
type EChartsOption = echarts.EChartsOption;

export default function useEcharts(
  className: string,
  idName: string,
  option: any,
  callback = () => {}
) {
  let element: Element | null;
  let myChart: echarts.ECharts;
  let resizeObserver: ResizeObserver;
  watch(
    () => option,
    () => {
      myChart.setOption(option.value);
    },
    { deep: true }
  );
  onMounted(() => {
    element = document.getElementById(idName);
    myChart = echarts.init(element as HTMLDivElement);
    myChart.setOption(option.value);
    const dom = document.querySelector("." + className);
    resizeObserver = new ResizeObserver(() => {
      debounceCallback();
    });
    resizeObserver.observe(dom as Element);
  });

  const debounceCallback = _.debounce(
    () =>
      // 更新图表
      myChart.resize(),

    500
  );

  // 组件卸载时，取消监听
  onUnmounted(() => {
    resizeObserver.unobserve(element as Element);
  });
}
