<template>
  <div class="see_here">
    <el-button type="" @click="handleClick">看到100</el-button>
    <Card title="看到这里" :animation="false" class="see">
      <template #default>
        <div class="see_here">
          <div
            class="see_here_item"
            v-for="item in listData"
            :key="item.id"
            :data-index="item.id"
            style="background-color: #000"
          >
            <el-image
              style="width: 100%; height: 200px"
              :src="item.url"
              :fit="'cover'"
            />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts" setup name="seeHere">
import Card from "../../../components/card.vue";
import { nextTick, onMounted, ref } from "vue";
// @ts-ignore
import WirelessScroll from "@/utils/wirelessScroll.js";

const wirelessScroll = new WirelessScroll({});
onMounted(() => {
  wirelessScroll.init(
    document.querySelector(".el-scrollbar__wrap") as HTMLElement,
    () => {
      getList(pageNum.value);
      console.log("滚到底了");
    }
  );
});

const apiGetList = (pageNum: number, pageSize: number) => {
  // 生成 100 到 200 的随机数
  const random = Math.floor(Math.random() * 100 + 100);
  const list: any = [];
  for (let i = 1; i <= pageSize; i++) {
    const id = (pageNum - 1) * pageSize + i;
    list.push({
      id,
      name: `name${id}`,
      url: `https://picsum.photos/id/${id}/200/200`,
    });
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(list);
    }, random);
  });
};
const listData: any = ref([]);
const pageNum = ref(1);
const pageSize = ref(10);

const getList = async (num: number) => {
  const list: any = await apiGetList(num, pageSize.value);
  let newList: any = [];
  if (num === 1) {
    newList = list;
  } else {
    newList = [...listData.value, ...list];
  }
  listData.value = newList.sort((a: any, b: any) => a.id - b.id);
  pageNum.value++;
  console.log(listData.value);
};

getList(pageNum.value);

const handleClick = async () => {
  const data_index = 1000;
  const num = data_index / pageSize.value;
  // 当前页数 和 num页数 的中间所有页数
  const numList = [];
  for (let i = pageNum.value; i <= num; i++) {
    numList.push(i);
  }
  await handlePromiseAll(numList);

  await nextTick();
  // 获取自定义属性 data-index 为100的元素
  const el = document.querySelector(
    ".see_here_item[data-index='" + data_index + "nbcb']"
  ) as HTMLElement;
  console.dir(el);
  // 滚动到该元素
  (document.querySelector(".el-scrollbar__wrap") as any).scrollTo({
    top: el.offsetTop,
    behavior: "smooth",
  });
};

const handlePromiseAll = async (list: number[]) => {
  const promiseList = list.map((item) => {
    return getList(item);
  });
  await Promise.all(promiseList);
};
</script>

<style lang="scss">
.see_here {
  display: flex;
  flex-wrap: wrap;
  width: 500px;
  margin: 10px auto;
  .see_here_item {
    width: 28%;
    height: 200px;
    background-color: #000;
    overflow: hidden;

    margin: 10px;
    img {
      // 高度100%宽度自适应
      height: 100%;
      // width: 100%;
      // object-fit: contain;
    }
  }
}
</style>
