<template>
  <el-container
    class="layout-container-demo"
    style="height: 100vh; background-color: var(--wk-bg)"
  >
    <Sidebar></Sidebar>

    <el-container class="container">
      <Header></Header>

      <Main></Main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import Sidebar from "./components/sidebar.vue";
import Header from "./components/header.vue";
import Main from "./components/main.vue";
import { ref } from "vue";
import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";

const item = {
  date: "2016-05-02",
  name: "Tom",
  address: "No. 189, Grove St, Los Angeles",
};
const tableData = ref(Array.from({ length: 20 }).fill(item));
</script>

<style>
.layout-container-demo .el-header {
  position: relative;
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.layout-container-demo .container {
  display: flex;
  flex-direction: column;
}
</style>
