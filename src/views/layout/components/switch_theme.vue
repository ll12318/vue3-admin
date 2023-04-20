<template>
  <el-switch
    class="theme_switch"
    style="
      --el-switch-on-color: #2f2f2f;
      --el-switch-off-color: #f1f1f1;
      margin-right: 15px;
    "
    v-model="theme"
  ></el-switch>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useDark } from "@vueuse/core";
const themeLocal = localStorage.getItem("isDark") == "dark" ? true : false;
const theme = ref(themeLocal);

const isDark = useDark({
  selector: "html",
  attribute: "class",
  valueDark: "dark",
  valueLight: "light",
});

watch(theme, (val) => {
  if (val) {
    isDark.value = true;
  } else {
    isDark.value = false;
  }
});
watch(isDark, (val) => {
  handleIcon(val);
  localStorage.setItem("isDark", val ? "dark" : "light");
});
// 检测浏览器的暗黑模式状态
const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

// 定义处理函数
const handleDarkModeChange = (event: MediaQueryListEvent) => {
  if (event.matches) {
    // 暗黑模式已启用
    theme.value = true;
  } else {
    // 暗黑模式已禁用
    theme.value = false;
  }
};

// 添加事件监听器
darkModeMediaQuery.addEventListener("change", handleDarkModeChange);

// 在组件销毁时移除事件监听器
onUnmounted(() => {
  darkModeMediaQuery.removeEventListener("change", handleDarkModeChange);
});

// Handle icon
const handleIcon = (isDark: boolean): void => {
  // Select the switch icon element
  const el: any = document.querySelector(".theme_switch .el-switch__action");

  // Change the element's class name to the corresponding icon
  el.className = isDark
    ? "iconfont icon-yueliang el-switch__action"
    : "iconfont icon-sun el-switch__action";

  // Change the element's style
  el.style.color = isDark ? "#fff" : "#000";
  el.style.fontSize = "12px";
};
onMounted(() => {
  handleIcon(isDark.value);
});
</script>

<style>
.el-switch.is-checked .el-switch__core .el-switch__action {
  background: var(--el-bg-color);
}
.el-switch__core {
  border-color: var(--el-border-color) !important;
}
</style>
