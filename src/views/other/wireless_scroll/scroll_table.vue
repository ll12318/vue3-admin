<script lang="ts" setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import type { Res } from "./resType";
// @ts-ignore
import WirelessScroll from "@/utils/wirelessScroll.js";

const list = ref<Res>({
  list: [],
  pageNum: 0,
  pageSize: 0,
  total: 0,
});
onMounted(() => {
  const el = document.querySelector(
    ".wireless_scroll_table .el-scrollbar__wrap"
  );
  const wireless_scroll = new WirelessScroll({});
  wireless_scroll.init(el, () => {
    getList(+list.value.pageNum + 1, +list.value.pageSize);
  });
});

const getList = async (pageNum: number = 1, pageSize: number = 10) => {
  const res = await axios.get(
    "http://zlc.ll12138.icu:4523/m1/1572786-0-default/WTable",
    {
      params: {
        pageNum,
        pageSize,
      },
    }
  );
  if (res.data.list.length === 0) {
    WirelessScroll.destroy();
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
  <div class="wireless_scroll_table">
    <el-table :data="list.list" style="width: 100%" max-height="400" border>
      <el-table-column prop="name" label="name" />
      <el-table-column prop="anchorType" label="anchorType" />
      <el-table-column prop="warehousingTime" label="warehousingTime" />
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.wireless_scroll_table {
  padding: 40px;
}
</style>
