<script setup lang="ts">
import { computed, ref } from "vue";

const sysInfo = ref("");
const eventSource = new EventSource("http://192.168.1.12:8000/sse");

eventSource.onopen = function (event) {
  console.log("连接已打开");
};

eventSource.onerror = function (event) {
  console.error("连接错误");
};

eventSource.onmessage = function (event) {
  sysInfo.value = event.data;
};

// 计算属性
const sysInfoObj = computed(() => {
  const keyValuePairs = sysInfo.value.split("{|}");
  console.log(sysInfo.value, "sysInfo.value");

  console.log(
    "🚀 ~ file: aida64.vue:22 ~ sysInfoObj ~ keyValuePairs:",
    keyValuePairs
  );
  const list = keyValuePairs.map((item) => item.split("|")[1]);
  console.log("🚀 ~ file: aida64.vue:22 ~ sysInfoObj ~ list:", list);
  return list;
  // 将键值对转换为对象
  const dataObject: any = {};

  return dataObject;
});
</script>

<template>
  <div>
    <h1>AIDA64</h1>
    <p>{{ sysInfoObj }}</p>
  </div>
</template>
