<template>
  <el-sub-menu :index="item.path" :key="item.path" v-if="item.children">
    <template #title>
      <i :class="'iconfont ' + item.meta.icon" style="margin-right: 10px"></i>
      <span>{{ item.meta.title }}</span></template
    >
    <menu-item v-for="items in item.children" :item="items"></menu-item>
  </el-sub-menu>

  <el-menu-item :index="item.path" v-else @click="handleRoute">
    <i :class="'iconfont ' + item.meta.icon" style="margin-right: 10px"></i>
    <span slot="title">{{ item.meta.title }}</span>
  </el-menu-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleRoute() {
      this.$router.push(this.item.path);
    },
  },
});
</script>
