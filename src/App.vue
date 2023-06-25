<script setup lang="ts">
import { computed } from "vue";
import { useThemeStore } from "./store/theme";
import useCheckUpdates from "./hooks/useCheckUpdates";
const themeStore = useThemeStore();
// useCheckUpdates();
const light = {
  "--wk-bg": "#fff",
  "--wk-color-1": "#000",
  "--wk-color-2": "#5c5c5c",
  "--wk-border-1": "#e7e7e7",
};
const duck = {
  "--wk-bg": "#1a1a1a",
  "--wk-color-1": "#e8e8e9",
  "--wk-color-2": "#89898a",
  "--wk-border-1": "#363636",
};
const styles = computed(() => {
  return !themeStore.getTheme ? duck : light;
});
</script>

<template>
  <router-view></router-view>
</template>

<style>
@import url("//at.alicdn.com/t/c/font_4025867_rtyi7du003.css");
@import url("./views/style/el-dark.css");
@import url("./views/style/dark.css");
*,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
