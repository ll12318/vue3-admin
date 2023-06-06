import { ref } from "vue";
import { ElNotification } from "element-plus";

export default function useCheckUpdates() {
  const src = ref("");
  let timer: any = null;

  const getHtml = async (flag = false) => {
    const response = await fetch("/?timestamp=" + Date.now());
    const html = await response.text();
    const regex = /<script.*?src="(.*?)".*?>/g;
    const match = regex.exec(html);

    if (match) {
      if (flag) {
        src.value = match[1];
      } else {
        if (src.value !== match[1]) {
          clearInterval(timer);
          ElNotification({
            title: "页面有更新",
            message: "10秒后自动刷新",
            duration: 10000,
            type: "success",
          });
          setTimeout(() => {
            window.location.reload();
          }, 10000);
        }
      }
    }
  };

  getHtml(true);

  timer = setInterval(() => {
    getHtml();
  }, 1000);
}
