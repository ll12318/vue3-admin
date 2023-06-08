<template>
  <el-header
    style="
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      background-color: var(--el-bg-color);
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
      <el-popover :visible="visible" placement="bottom" :width="160">
        <el-input
          placeholder="输入密码远程构建jenkins"
          suffix-icon="el-icon-search"
          type="password"
          v-model="pwd"
          @keyup.enter.native="handle_jenkins"
          clearable
          size="mini"
          style="width: 100%"
        />
        <template #reference>
          <el-button
            style="margin-right: 10px"
            type="text"
            @click="visible = !visible"
            ><i class="iconfont icon-send"></i
          ></el-button>
        </template>
      </el-popover>

      <switch-theme></switch-theme>

      <span class="showSearch" style="cursor: pointer" @click="handleShowSearch"
        >Tom</span
      >
    </div>
  </el-header>
</template>

<script lang="ts" setup>
import { useLayoutStore } from "../../../store/layout";
import { useThemeStore } from "../../../store/theme";
import SwitchTheme from "./switch_theme.vue";
import { ref } from "vue";
import { ElNotification } from "element-plus";
const layoutStore = useLayoutStore();
const themeStore = useThemeStore();

const handleTheme = () => {
  themeStore.setTheme(!themeStore.getTheme);
};
const handleCollapse = (isCollapse: boolean) => {
  layoutStore.setLayout(isCollapse);
};
const handle_jenkins = () => {
  if (pwd.value !== "liuli520") {
    ElNotification({
      message: "密码错误",
      type: "error",
      duration: 2000,
    });
    pwd.value = "";
    visible.value = false;
    return;
  }
  window.open(
    "http://c.ll12138.icu:9000/job/vue3_admin/build?token=vue3_admin"
  );
  pwd.value = "";
  visible.value = false;
};
const visible = ref(false);
const pwd = ref("");

const handleShowSearch = () => {
  console.log("handleShowSearch");
  layoutStore.setSearch(!layoutStore.getSearch);
};
</script>
