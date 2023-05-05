<script lang="ts" setup>
import axios from "axios";
import { onDeactivated, onMounted, ref } from "vue";
// @ts-ignore
import WirelessScroll from "@/utils/wirelessScroll.js";
import type { Res } from "./resType";

const wireless_scroll = new WirelessScroll({});
onMounted(() => {
  const el = document.querySelector(".el-scrollbar__wrap");
  wireless_scroll.init(el, () => {
    console.log("加载更多");
    getList(+list.value.pageNum + 1, +list.value.pageSize);
  });
});
onDeactivated(() => {
  wireless_scroll.destroy();
});


const list = ref<Res>({
  list: [],
  pageNum: 0,
  pageSize: 0,
  total: 0,
});
// 控制是否结束
const isEnd = ref(false);
const getList = async (pageNum: number = 1, pageSize: number = 20) => {
  const res = await axios.get(
    "http://127.0.0.1:4523/m1/1572786-0-default/WTable",
    {
      params: {
        pageNum,
        pageSize,
      },
    }
  );
  if (res.data.list.length === 0) {
    wireless_scroll.destroy();
    isEnd.value = true;
    return;
  }
  list.value.list = [...list.value.list, ...res.data.list];
  list.value.pageNum = res.data.pageNum;
  list.value.pageSize = res.data.pageSize;
  list.value.total = res.data.total;
};
getList();
</script>

<template>
  <div class="wireless_scroll">
    <div class="content">
      <div class="item" v-for="item in list.list" :key="item.id">
        {{ item.name }} -- {{ item.anchorType }} --
        {{ item.originalInstitution }}
      </div>
      <div
        class="loading"
        style="font-size: 12px; text-align: center; color: var(--el-color-info)"
      >
        {{ isEnd ? "没有更多了-" : "加载中..." }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wireless_scroll {
  .content {
    margin: 20px auto;
    // height: 200px;
    overflow-x: hidden;
    overflow-y: auto;
    width: 50%;
    border: 1px solid var(--el-border-color);
    padding: 10px;

    .item {
      height: 100px;
      line-height: 100px;
      cursor: pointer;
      text-align: center;
      transition: all 0.3s;
      &:hover {
        color: var(--el-color-primary);
        transform: scale(1.05);
      }
    }
  }
}
</style>
