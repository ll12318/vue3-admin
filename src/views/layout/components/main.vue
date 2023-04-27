<template>
  <el-main>
    <el-scrollbar ref="scrollbar">
      <router-view />
    </el-scrollbar>
  </el-main>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const scrollbar = ref<HTMLElement>();
console.log(scrollbar);
</script>
