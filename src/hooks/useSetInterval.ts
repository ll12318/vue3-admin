import { onMounted, onUnmounted, ref } from "vue";

export default function useSetInterval(callback: () => void, delay: number) {
  let timerId: null | number = null;

  onMounted(() => {
    start();
    window.addEventListener("visibilitychange", handleVisibilitychange);
  });

  onUnmounted(() => {
    stop();
    window.removeEventListener("visibilitychange", handleVisibilitychange);
  });

  const start = () => {
    timerId = setInterval(callback, delay);
  };

  const stop = () => {
    if (timerId) {
      clearInterval(timerId);
    }
  };

  const handleVisibilitychange = () => {
    if (document.visibilityState === "hidden") {
      stop();
    } else {
      start();
    }
  };
}
