<template>
  <div class="search_bar">
    <input
      v-model.trim="searchValue"
      @keyup="handleSearch"
      @keydown="handleKeyDown"
      class="search_input"
      placeholder="请输入搜索内容"
    />
    <div class="list" v-if="searchValue.length">
      <div
        v-for="item in searchValueList"
        :key="item"
        class="list_item"
        @click="handleSearchValueClick(item)"
      >
        {{ item.meta.title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="search_bar">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { routes } from "../../../router";
import { useRouter } from "vue-router";
import { useLayoutStore } from "../../../store/layout";

const layoutStore = useLayoutStore();
// @ts-ignore
import pinyin from "pinyin";
const router = useRouter();
const searchValue = ref("");
watch(
  () => searchValue.value,
  (newVal) => {
    const flag = newVal.length > 0;
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
// 树结构转数组
const treeToArray = (tree: any) => {
  const arr: any[] = [];
  const loop = (data: any) => {
    data.forEach((item: any) => {
      arr.push(item);
      if (item.children) {
        loop(item.children);
      }
    });
  };
  loop(tree);
  return arr;
};

const routerList = treeToArray(routes).filter((item) => item.isPage);

interface RouterItem {
  name: string;
  path: string;
  isPage: boolean;
  children?: RouterItem[];
  meta: {
    title: string;
    icon: string;
    [key: string]: any;
  };
  [key: string]: any;
}

const searchValueList = ref<RouterItem[]>([]);

const handleSearch = () => {
  if (!searchValue.value) {
    searchValueList.value = [];
    return;
  }
  const pinyinList = pinyin(searchValue.value, { style: pinyin.STYLE_NORMAL });
  const pinyinStr = pinyinList.join("").toLowerCase();
  searchValueList.value = routerList.filter((item: RouterItem) => {
    const titlePinyinList = pinyin(item.meta.title, {
      style: pinyin.STYLE_NORMAL,
    });
    const titlePinyinStr = titlePinyinList.join("").toLowerCase();
    const firstLetterList = pinyin(item.meta.title, {
      style: pinyin.STYLE_FIRST_LETTER,
    });
    const firstLetterStr = firstLetterList.join("").toLowerCase();
    return (
      titlePinyinStr.includes(pinyinStr) ||
      firstLetterStr.includes(searchValue.value.toLowerCase()) ||
      item.meta.title.includes(searchValue.value)
    );
  });
};

const handleSearchValueClick = (route: RouterItem) => {
  // 路由跳转
  router.push(route.path);
  // 清空搜索框
  searchValue.value = "";
  // 关闭搜索框
  layoutStore.setSearch(false);
};

const handleKeyDownSwitch = (event: KeyboardEvent) => {
  // 监听键盘上下键来切换list_item
  if (!searchValue.value) return;
  if (event.keyCode === 38 || event.keyCode === 40) {
    const list = document.querySelectorAll(".search_bar .list_item");
    const activeIndex = Array.from(list).findIndex((item) =>
      item.classList.contains("active")
    );
    if (event.keyCode == 40) {
      // 下
      if (activeIndex === -1) {
        list[0].classList.add("active");
      } else {
        list[activeIndex].classList.remove("active");
        if (activeIndex === list.length - 1) {
          list[0].classList.add("active");
        } else {
          list[activeIndex + 1].classList.add("active");
        }
      }
    } else if (event.keyCode == 38) {
      // 上
      if (activeIndex === -1) {
        list[list.length - 1].classList.add("active");
      } else {
        list[activeIndex].classList.remove("active");
        if (activeIndex === 0) {
          list[list.length - 1].classList.add("active");
        } else {
          list[activeIndex - 1].classList.add("active");
        }
      }
    }
  } else if (event.keyCode == 13) {
    // 回车
    const activeItem = document.querySelector(
      ".search_bar .list_item.active"
    ) as HTMLElement;
    if (activeItem) {
      activeItem.click();
    }
  }
  // 监听esc键关闭搜索框
  if (event.keyCode === 27) {
    layoutStore.setSearch(false);
  }
};

const handleInputFocus = () => {
  const inp = document.querySelector(
    ".search_bar .search_input"
  ) as HTMLInputElement;
  inp?.focus();
};
// 鼠标点击其他地方关闭搜索框
const handleClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (
    !target.closest(".search_bar") &&
    !target.closest(".search_btn") &&
    !target.closest(".search_input")
  ) {
    layoutStore.setSearch(false);
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeyDownSwitch);
  document.addEventListener("click", handleClick);
  handleInputFocus();
});

// 组件卸载时移除事件监听
onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeyDownSwitch);
  document.removeEventListener("click", handleClick);
});

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    event.preventDefault();
  }
  if (event.key === "Escape") {
    if (searchValue.value) {
      searchValue.value = "";
    } else {
      layoutStore.setSearch(false);
    }
  }
};
</script>
<style lang="scss" scoped>
.search_bar {
  // 背景透明
  // 使得搜索框居中
  background-color: #fff;
  position: fixed;
  top: 100px;
  left: 50%;
  z-index: 9999;
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
    box-shadow: 0 0 10px #ccc;
    max-height: 50vh;
    overflow-y: auto;

    .list_item.active {
      background-color: #dfe2e6;
    }
    .list_item {
      height: 50px;
      padding: 0 10px;
      // 垂直居中
      display: flex;
      align-items: center;

      &:hover {
        background-color: #dfe2e6;
      }
    }
  }
}
</style>
