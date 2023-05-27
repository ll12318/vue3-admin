<template>
  <div
    class="wk_data_card"
    :class="props.animation && 'wk_data_card_animation'"
    :style="'  background-color: ' + props.cardData.color + ';'"
  >
    <div class="top">{{ props.cardData.title }}</div>
    <div class="bottom">
      <div class="left">
        <div class="left_top">12,256</div>
        <div class="left_bottom">
          <span class="lable">较昨天</span>
          <span class="trend">206</span>
        </div>
      </div>
      <div class="right">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  cardData: {
    type: Object,
    default: () => {},
  },
  animation: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss" scoped>
.wk_data_card_animation {
  // 添加一个鼠标移入的动画
  transition: all 0.3s;
  &:hover {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px) scale(1.01);
  }
}
.wk_data_card {
  height: 134px;
  padding: 10px 10px 10px 20px;
  border-radius: 4px;
  color: #000;
  // 修改鼠标样式
  cursor: pointer;

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .left_top {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 10px;
      }
      .left_bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .lable {
          font-size: 12px;
          color: #999;
          margin-right: 10px;
        }
        .trend {
          margin-top: 5px;
          font-size: 12px;
          color: #165dff;
        }
      }
    }
    .right {
      width: 65%;
      height: 100px;
      // background-color: #fff;
    }
  }
}
</style>
