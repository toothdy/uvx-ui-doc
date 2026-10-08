<h5-demo src="pages/form/search/search" title="Search 搜索" />

# Search 搜索

`uvx-search` 提供搜索输入、清空、确认搜索、右侧操作、禁用点击和前后插槽。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 输入、清空、确认搜索和双向绑定 | √ | √ | √ | √ | √ |
| 右侧操作、聚焦动画和禁用点击 | √ | √ | √ | √ | √ |
| 前缀、后缀插槽和自定义样式 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. `clearabled` 是源码实际属性名，包含末尾字母 `d`；清除按钮仅在聚焦、内容非空且未禁用时显示。
2. `animation=true` 时，右侧操作只在输入框聚焦期间展开；`show-action=false` 时始终不显示。
3. 键盘确认触发 `search` 并调用 `uni.hideKeyboard`；点击右侧操作触发 `custom` 并收起键盘。
4. `click` 只在 `disabled=true` 时点击搜索区域触发；左侧图标点击使用 `clickIcon`。
5. `input-style` 中的 `color` 优先于 `color` Prop。

:::

## 基础用法

```vue
<template>
   <uvx-search v-model="keyword" @search="handleSearch"></uvx-search>
</template>

<script lang="uts" setup>
const keyword = ref("");

const handleSearch = (value: string): void => {
   console.log("search", value);
};
</script>
```

## 搜索框形状

```vue
<template>
   <uvx-search v-model="keyword" shape="round"></uvx-search>
   <uvx-search v-model="keyword" shape="square"></uvx-search>
</template>

<script lang="uts" setup>
const keyword = ref("");
</script>
```

## 右侧操作

```vue
<uvx-search
   v-model="keyword"
   action-text="取消"
   :show-action="true"
   :animation="true"
   @custom="handleCustom"
></uvx-search>
```

## 禁用状态

```vue
<uvx-search
   v-model="keyword"
   :disabled="true"
   @click="handleDisabledClick"
></uvx-search>
```

## 自定义图标和样式

```vue
<uvx-search
   v-model="keyword"
   search-icon="scan"
   :search-icon-size="24"
   search-icon-color="#3c9cff"
   bg-color="#f5f5f5"
   border-color="#dcdfe6"
   input-style="font-size: 15px;"
   box-style="border-width: 1px;"
></uvx-search>
```

## 前后插槽

```vue
<uvx-search v-model="keyword">
   <template #prefix><text>商品</text></template>
   <template #suffix><uvx-icon name="camera"></uvx-icon></template>
</uvx-search>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `model-value` | 双向绑定搜索内容 | `string` | `""` | 全部 |
| `shape` | 搜索框形状 | `round \| square` | `round` | 全部 |
| `bg-color` | 搜索内容区域背景色 | `string` | `""` | 全部 |
| `placeholder` | 占位文字，使用组件国际化文本 | `string` | `请输入关键字` | 全部 |
| `clearabled` | 是否允许显示清除按钮 | `boolean` | `true` | 全部 |
| `focus` | 是否请求自动聚焦 | `boolean` | `false` | 全部 |
| `show-action` | 是否显示右侧操作 | `boolean` | `true` | 全部 |
| `action-style` | 右侧操作文字样式，CSS 字符串 | `string` | `""` | 全部 |
| `action-text` | 右侧操作文字，使用组件国际化文本 | `string` | `搜索` | 全部 |
| `input-style` | 输入框样式，CSS 字符串 | `string` | `""` | 全部 |
| `disabled` | 是否禁用输入 | `boolean` | `false` | 全部 |
| `border-color` | 搜索内容区域边框颜色 | `string` | `transparent` | 全部 |
| `search-icon-color` | 左侧搜索图标颜色 | `string` | `""` | 全部 |
| `color` | 输入文字颜色 | `string` | `""` | 全部 |
| `placeholder-color` | 占位文字颜色 | `string` | `""` | 全部 |
| `search-icon` | 左侧图标名或图片地址 | `string` | `search` | 全部 |
| `search-icon-size` | 左侧图标尺寸 | `string \| number` | `22` | 全部 |
| `margin` | 根节点外边距 | `string` | `0` | 全部 |
| `animation` | 是否仅在聚焦时展开右侧操作 | `boolean` | `false` | 全部 |
| `maxlength` | 最大输入长度，`-1` 表示不限制 | `string \| number` | `-1` | 全部 |
| `height` | 输入框高度 | `string \| number` | `32` | 全部 |
| `box-style` | 搜索内容区域样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到根节点的外部样式类 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `update:modelValue` | 输入或清空时更新绑定值 | `value: string` | 全部 |
| `input` / `change` | 输入或清空后触发 | `value: string` | 全部 |
| `clear` | 点击清除按钮后触发 | `""` | 全部 |
| `search` | 键盘确认搜索时触发 | `value: string` | 全部 |
| `custom` | 点击右侧操作时触发 | `value: string` | 全部 |
| `focus` / `blur` | 输入框聚焦或失焦时触发 | `value: string` | 全部 |
| `clickIcon` | 点击左侧图标时触发 | - | 全部 |
| `click` | 禁用状态下点击搜索区域时触发 | - | 全部 |

### Slots

| 名称 | 说明 | 平台 |
| :---: | :---: | :---: |
| `prefix` | 替换默认左侧搜索图标 | 全部 |
| `suffix` | 输入框后的自定义内容 | 全部 |

## 参考

- [uni-app x input 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/input.html)
