<script setup lang="ts">
import { computed } from "vue";
import { useThemeStore } from "./store/theme";
const themeStore = useThemeStore();
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
  <div :style="styles">
    <router-view></router-view>
  </div>
</template>

<style>
@import url("https://at.alicdn.com/t/c/font_4025867_r1dfu6as6z.css?spm=a313x.7781069.1998910419.52&file=font_4025867_r1dfu6as6z.css");
*,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
