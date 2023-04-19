<template>
  <el-header
    style="
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      background: var(--wk-bg);
      color: var(--wk-color-1);
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
      <i
        class="iconfont icon-poweroff"
        style="margin-right: 10px"
        @click="handleTheme"
      ></i>
      <el-dropdown>
        <el-icon style="margin-right: 8px; margin-top: 1px"
          ><setting
        /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>View</el-dropdown-item>
            <el-dropdown-item>Add</el-dropdown-item>
            <el-dropdown-item>Delete</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span>Tom</span>
    </div>
  </el-header>
</template>

<script lang="ts" setup>
import { useLayoutStore } from "../../../store/layout";
import { useThemeStore } from "../../../store/theme";
const layoutStore = useLayoutStore();
const themeStore = useThemeStore();

const handleCollapse = (isCollapse: boolean) => {
  layoutStore.setLayout(isCollapse);
};

const handleTheme = () => {
  themeStore.setTheme(!themeStore.getTheme);
};
</script>
