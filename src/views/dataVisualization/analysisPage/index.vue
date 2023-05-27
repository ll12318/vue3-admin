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
      style="flex: 1; margin-right: 20px"
    ></ContentPublishingRatio>
    <PopularAuthorList style="width: 405px"></PopularAuthorList>
  </div>
  <ContentPeriodAnalysis style="margin-top: 20px"></ContentPeriodAnalysis>
</template>

<script lang="ts" setup>
import PublicOpinionAnalysis from "./publicOpinionAnalysis.vue";
import ContentPublishingRatio from "./contentPublishingRatio.vue";
import PopularAuthorList from "./popularAuthorList.vue";
import ContentPeriodAnalysis from "./contentPeriodAnalysis.vue";
</script>
