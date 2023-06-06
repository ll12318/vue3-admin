GitHub Copilot: 当然，以下是 `card.vue` 组件的文档，使用 Markdown 格式：

## Card 组件

Card 组件是一个 Vue 组件，用于显示一个卡片。

### 使用方法

在需要使用 Card 组件的地方，可以使用以下代码：

```vue
<template>
  <card title="我的卡片" :animation="false">
    <template #title>
      <span>自定义标题</span>
    </template>
    <template #more>
      <span>更多</span>
    </template>
    <div>卡片内容</div>
  </card>
</template>

<script lang="ts">
import Card from "@/components/Card.vue";

export default {
  components: {
    Card,
  },
};
</script>
```

在这个代码中，我们在父组件中引入了 `Card` 组件，并在模板中使用 `<card>` 标签来调用它。我们可以通过 `title` 和 `animation` 属性来设置卡片的标题和动画效果。同时，我们可以使用 `title` 和 `more` 插槽来自定义卡片的标题和更多按钮。在插槽中，我们可以使用 `slot-scope` 来访问插槽的内容。在这个例子中，我们在插槽中定义了一个 `div` 元素作为卡片的内容。

### Props

Card 组件支持以下属性：

| 属性名    | 类型    | 默认值 | 说明             |
| --------- | ------- | ------ | ---------------- |
| title     | String  | 标题   | 卡片的标题       |
| animation | Boolean | true   | 是否启用动画效果 |

### Slots

Card 组件支持以下插槽：

| 插槽名 | 说明         |
| ------ | ------------ |
| title  | 卡片的标题   |
| more   | 卡片的更多按钮 |
| 默认   | 卡片的内容   |

在 `title` 插槽中，我们可以自定义卡片的标题。在 `more` 插槽中，我们可以自定义卡片的更多按钮。在默认插槽中，我们可以自定义卡片的内容。

### 样式

Card 组件支持以下样式：

| 类名             | 说明                   |
| ---------------- | ---------------------- |
| .wk_card         | 卡片的基本样式         |
| .wk_card_animation | 卡片的动画效果样式     |
| .wk_card .top     | 卡片的标题和更多按钮样式 |
| .wk_card .title   | 卡片的标题样式         |
| .wk_card .more    | 卡片的更多按钮样式     |

在这些样式中，我们可以自定义卡片的外观和动画效果。