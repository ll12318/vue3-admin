<template>
  <el-main class="main-page">
    <el-scrollbar ref="scrollbar">
      <router-view />
    </el-scrollbar>
  </el-main>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const scrollbar = ref<HTMLElement>();
</script>

<style lang="scss" scoped>
.main-page {
  background-color: var(--el-bg-main-color);
  padding: 20px !important;
}
</style>
