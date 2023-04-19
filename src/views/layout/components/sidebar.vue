<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    :collapse="layoutStore.getLayout"
    @open="handleOpen"
    @close="handleClose"
  >
    <template v-for="item in menuList" :key="item.path">
      <menu-item :item="item"></menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
// 禁止引入 ts报错
import { routes } from "../../../router/index";
import MenuItem from "./MenuItem.vue";
import { useLayoutStore } from "../../../store/layout";
const layoutStore = useLayoutStore();
const routeList = ref(routes);

const handleOpen = (key: string, keyPath: string[]) => {};
const handleClose = (key: string, keyPath: string[]) => {};
const menuList: any = ref([]);

// 递归处理菜单数据
const processMenuList = (list: any[]) => {
  return list.map((item: any) => {
    if (item.children && item.children.length) {
      item.children = processMenuList(item.children);
    }
    return item;
  });
};

// 处理路由菜单数据
const processRoutes = () => {
  menuList.value = processMenuList(routeList.value);
};

// 初次处理菜单数据
processRoutes();
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
