<template>
  <Card title="热门作者榜单" style="height: 440px" :animation="false">
    <template #default>
      <el-table
        :data="data"
        style="width: 100%"
        max-height="380"
        :header-cell-style="() => ({ background: '#f2f3f8' })"
      >
        <el-table-column
          prop="ranking"
          label="排名"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="author"
          label="作者"
          width="100"
        ></el-table-column>
        <el-table-column
          sortable
          prop="content"
          label="内容量"
          width="100"
        ></el-table-column>
        <el-table-column
          sortable
          prop="click"
          label="点击量"
          width="100"
        ></el-table-column>
      </el-table>
    </template>
    <template #more>
      <span> 查看更多 </span>
    </template>
  </Card>
</template>
<script lang="ts" setup name="PopularAuthorList">
import Card from "@/components/card.vue";
// 帮我生成二十条表格假数据，每列数据的格式为：排名，作者，内容量，点击量，每个数据是对象
const data = Array.from({ length: 20 }).map((item, index) => ({
  ranking: index + 1,
  // 作者名字要随机生成，不要都是作者1，作者2，作者3
  author: `作者${Math.floor(Math.random() * 1000)}`,
  content: Math.floor(Math.random() * 1000),
  click: Math.floor(Math.random() * 1000),
}));
</script>
