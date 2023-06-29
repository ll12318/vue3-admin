<template>
  <div class="analysis_page">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="iconfont icon-home"></i>
      </el-breadcrumb-item>
      <el-breadcrumb-item>数据可视化</el-breadcrumb-item>
      <el-breadcrumb-item>分析页</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

  <PublicOpinionAnalysis style="margin-top: 20px"></PublicOpinionAnalysis>
  <div style="margin-top: 20px; display: flex">
    <ContentPublishingRatio
      style="width: 100%; margin-right: 20px"
    ></ContentPublishingRatio>
    <PopularAuthorList style="width: 405px"></PopularAuthorList>
  </div>
  <ContentPeriodAnalysis style="margin-top: 20px"></ContentPeriodAnalysis>
</template>

<script lang="ts" setup>
// @ts-ignore
import PublicOpinionAnalysis from "./publicOpinionAnalysis.vue";
// @ts-ignore
import ContentPublishingRatio from "./contentPublishingRatio.vue";
// @ts-ignore
import PopularAuthorList from "./popularAuthorList.vue";
// @ts-ignore
import ContentPeriodAnalysis from "./contentPeriodAnalysis.vue";
</script>
