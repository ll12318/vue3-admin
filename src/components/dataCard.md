GitHub Copilot: 当然，以下是 `dataCard.vue` 组件的使用文档，使用 Markdown 格式：

## DataCard 组件

DataCard 组件是一个 Vue 组件，用于显示一个数据卡片。

### 使用方法

在需要使用 DataCard 组件的地方，可以使用以下代码：

```vue
<template>
  <data-card :card-data="cardData" :animation="false">
    <template #default>
      <div>卡片内容</div>
    </template>
  </data-card>
</template>

<script lang="ts">
import DataCard from "@/components/DataCard.vue";

export default {
  components: {
    DataCard,
  },
  data() {
    return {
      cardData: {
        title: "我的卡片",
        color: "#fff",
      },
    };
  },
};
</script>
```

在这个代码中，我们在父组件中引入了 `DataCard` 组件，并在模板中使用 `<data-card>` 标签来调用它。我们可以通过 `card-data` 和 `animation` 属性来设置卡片的数据和动画效果。同时，我们可以使用默认插槽来自定义卡片的内容。在插槽中，我们可以使用 `slot-scope` 来访问插槽的内容。在这个例子中，我们在插槽中定义了一个 `div` 元素作为卡片的内容。

### Props

DataCard 组件支持以下属性：

| 属性名    | 类型    | 默认值 | 说明             |
| --------- | ------- | ------ | ---------------- |
| card-data | Object  | 数据   | 卡片的数据       |
| animation | Boolean | true   | 是否启用动画效果 |

### Slots

DataCard 组件支持以下插槽：

| 插槽名 | 说明         |
| ------ | ------------ |
| 默认   | 卡片的内容   |

在默认插槽中，我们可以自定义卡片的内容。

### 样式

DataCard 组件支持以下样式：

| 类名                 | 说明                   |
| -------------------- | ---------------------- |
| .wk_data_card         | 卡片的基本样式         |
| .wk_data_card_animation | 卡片的动画效果样式     |
| .wk_data_card .top     | 卡片的标题样式         |
| .wk_data_card .bottom  | 卡片的底部样式         |
| .wk_data_card .left    | 卡片的左侧样式         |
| .wk_data_card .right   | 卡片的右侧样式         |
| .wk_data_card .left_top | 卡片左侧顶部样式       |
| .wk_data_card .left_bottom | 卡片左侧底部样式       |
| .wk_data_card .lable   | 卡片左侧底部标签样式   |
| .wk_data_card .trend   | 卡片左侧底部趋势样式   |

在这些样式中，我们可以自定义卡片的外观和动画效果。