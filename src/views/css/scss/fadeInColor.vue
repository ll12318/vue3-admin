<template>
  <div class="scss">
    <Card title="颜色变淡scss" :animation="false">
      <template #default>
        <div class="fadeInColor">
          <button class="btn" type-color="1" type-size="large">按钮1</button>
          <button class="btn" type-color="2" type-size="medium">按钮2</button>
          <button class="btn" type-color="3" type-size="small">按钮3</button>
          <button class="btn" type-color="4" type-size="mini">按钮4</button>
          <button class="btn" disabled type-color="5" type-size="large">
            按钮5
          </button>
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts" setup name="fadeInColor">
import Card from "../../../components/card.vue";
</script>

<style lang="scss" scoped>
$btnSize: "large", "medium", "small", "mini";
$colorList: #409eff, #67c23a, #e6a23c, #f56c6c, #909399;
$color: #409eff;

@for $i from 1 through length($btnSize) {
  .fadeInColor {
    $typeSize: nth($btnSize, $i);
    .btn[type-size="#{$typeSize}"] {
      width: calc(100px - (#{$i} - 1) * 10px);
      height: calc(40px - (#{$i} - 1) * 3px);
      margin: calc(10px - (#{$i} - 1) * 2px);
      border: none;
      color: #fff;
      font-size: calc(16px - (#{$i} - 1) * 2px);
    }
  }
}

@for $i from 1 through length($colorList) {
  .fadeInColor {
    .btn[type-color="#{$i}"] {
      background-color: nth($colorList, $i);
      &:hover {
        background-color: lighten(nth($colorList, $i), 10%);
      }
      &:disabled {
        background-color: lighten(nth($colorList, $i), 20%);
        cursor: not-allowed;
      }
      &:active {
        background-color: darken(nth($colorList, $i), 10%);
      }
    }
  }
}

.btn {
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;
}
</style>
