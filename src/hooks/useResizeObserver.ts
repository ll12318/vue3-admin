import { onMounted, onUnmounted } from "vue";
import _ from "lodash";

export default function useResizeObserver(
  className: string,
  callback = () => {}
) {
  let element: Element | null;
  let resizeObserver: ResizeObserver;
  onMounted(() => {
    element = document.querySelector(className);
    resizeObserver = new ResizeObserver(() => {
      debounceCallback();
    });
    resizeObserver.observe(element as Element);
  });

  const debounceCallback = _.debounce(callback, 100);

  // 组件卸载时，取消监听
  onUnmounted(() => {
    resizeObserver.unobserve(element as Element);
  });
}
