<template>
  <div class="wk_card" :class="props.animation && 'wk_card_animation'">
    <div class="top" @click="test($slots)">
      <div class="title">
        <slot name="title">
          <span>{{ props.title }}</span>
        </slot>
      </div>
      <div class="more">
        <slot name="more"></slot>
      </div>
    </div>

    <div>
      <slot> content </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
const props = defineProps({
  title: {
    type: String,
    default: "标题",
  },
  animation: {
    type: Boolean,
    default: true,
  },
});

const test = (slots: any) => {
  console.log(slots);
};
</script>

<style lang="scss" scoped>
.wk_card_animation {
  transition: all 0.3s;
  &:hover {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px) scale(1.005);
  }
}
.wk_card {
  width: 100%;
  padding: 10px 20px;
  background-color: var(--el-bg-color);
  border-radius: 4px;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    margin-bottom: 10px;
    .title {
      font-size: 16px;
      font-weight: 600;
    }
    .more {
      font-size: 12px;
      color: #165dff;
      cursor: pointer;
    }
  }
}
</style>
