<template>
  <div class="search_bar">
    <input
      v-model="seachValue"
      class="search_input"
      placeholder="请输入搜索内容"
    />
    <div class="list">
      <div v-for="item in seachValue" :key="item">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="search_bar">
import { ref, watch } from "vue";

const seachValue = ref("");
watch(
  () => seachValue.value,
  (newVal) => {
    const flag = newVal.length > 0;
    console.log("🚀 ~ file: seachBar.vue:24 ~ flag:", flag);
    const inp = document.querySelector(
      ".search_bar .search_input"
    ) as HTMLInputElement;
    if (flag) {
      inp?.style.setProperty("border-bottom", "none");
      inp?.style.setProperty("border-radius", "6px 6px 0 0");
    } else {
      inp?.style.setProperty("border-bottom", "1px solid #ccc");
      inp?.style.setProperty("border-radius", "6px");
    }
  }
);
</script>
<style lang="scss" scoped>
.search_bar {
  // 背景透明
  // 使得搜索框居中
  background-color: #fff;
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  .search_input {
    width: 400px;
    height: 40px;
    border-radius: 6px;
    border: 1px solid #ccc;

    padding: 0 20px;
    &:focus {
      outline: none;
    }
    // placeholder文字颜色
    &::-webkit-input-placeholder {
      color: #ccc;
    }
  }
  .list {
    width: 400px;
    border-radius: 0 0 6px 6px;
    border: 1px solid #ccc;
    border-top: none;
    background-color: #fff;
    padding: 10px 20px;
    box-shadow: 0 0 10px #ccc;
    div {
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
