<template>
  <el-header
    style="
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      background: var(--el-bg-color);
      border-bottom: 1px solid var(--el-border-color);
    "
  >
    <span style="display: flex; align-items: center">
      <i
        class="iconfont icon-indent"
        style="font-size: 20px"
        v-if="layoutStore.getLayout"
        @click="handleCollapse(false)"
      ></i>
      <i
        v-else
        class="iconfont icon-outdent"
        style="font-size: 20px"
        @click="handleCollapse(true)"
      ></i>
    </span>
    <div class="toolbar" style="float: right">
        <el-tooltip
                class="box-item"
                effect="light"
                content="Jenkins远程构建"
                placement="left-start"
        >
            <el-button style="margin-right: 10px" type="text" @click="handle_jenkins"
            ><i class="iconfont icon-send"></i></el-button>
        </el-tooltip>

      <switch-theme></switch-theme>

      <span>Tom</span>
    </div>
  </el-header>
</template>

<script lang="ts" setup>
import { useLayoutStore } from "../../../store/layout";
import { useThemeStore } from "../../../store/theme";
import SwitchTheme from "./switch_theme.vue";
const layoutStore = useLayoutStore();
const themeStore = useThemeStore();

const handleTheme = () => {
  themeStore.setTheme(!themeStore.getTheme);
};
const handleCollapse = (isCollapse: boolean) => {
  layoutStore.setLayout(isCollapse);
};
const handle_jenkins = () => {
  window.open(
    "http://c.ll12138.icu:9000/job/vue3_admin/build?token=vue3_admin"
  );
};
</script>
