<script setup lang="ts">
import { useThemeStore } from "./store/theme";
console.log(useThemeStore());
const themeStore = useThemeStore();
themeStore.setTheme("dark");
const { getTheme } = themeStore;

console.log("🚀 ~ file: App.vue:6 ~ theme:", getTheme);
</script>

<template>
  <router-view></router-view>
</template>

<style>
*,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
