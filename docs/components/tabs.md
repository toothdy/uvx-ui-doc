<h5-demo src="pages/navigation/tabs/tabs" title="Tabs 标签页" />

# Tabs 标签页

`uvx-tabs` 展示可滚动或固定宽度的标签栏，支持当前项、指示线和点击/变化事件。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

## 基础用法

```vue
<template>
   <uvx-tabs :list="tabs" :current="current" @change="handleChange"></uvx-tabs>
</template>

<script lang="uts" setup>
import type { Event, Item } from "@/uni_modules/uvx-ui/components/uvx-tabs/types/index.uts";

const tabs: Item[] = [
   { name: "关注" },
   { name: "推荐" },
   { name: "热榜" },
];
const current = ref(0);

/**
 * 处理标签变化
 * @param event 标签事件值,含 name 与 index 字段
 * @returns null
 */
const handleChange = (event: Event): void => {
   console.log(event.getString("name"));
};
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| :---: | :---: | :---: | :---: |
| `duration` | 指示线动画时长（ms） | `number` | `300` |
| `list` | 标签对象数组，文本字段由 `key-name` 指定，也可为项设置 `disabled`、`badge` | `object[]` | `[]` |
| `line-color` | 指示线颜色 | `string` | `#3c9cff` |
| `line-width` / `line-height` | 指示线宽度和高度 | `string \| number` | `20` / `3` |
| `line-bg-size` | 指示线背景尺寸 | `string` | `cover` |
| `active-style` / `inactive-style` / `item-style` | 标签样式，支持样式对象或 CSS 字符串 | `object \| string` | `{ color: '#303133' }` / `{ color: '#606266' }` / `{ height: '44px' }` |
| `scrollable` | 是否可滚动 | `boolean` | `true` |
| `current` | 当前选中标签索引 | `string \| number` | `0` |
| `key-name` | 标签文本字段 | `string` | `name` |
| `u-style` / `u-class` | 自定义样式和类名 | `string` | `""` |

### Events

| 事件 | 说明 | 参数 |
| :---: | :---: | :---: |
| `click` | 点击标签（禁用项也会触发） | `Event`（`UTSJSONObject`，含 `name`、`index` 字段） |
| `change` | 点击可用标签后触发 | `Event`（`UTSJSONObject`，含 `name`、`index` 字段） |

组件还提供 `left` 和 `right` 默认插槽，用于在标签滚动区域两侧放置内容。

## 参考

- [uni-app x scroll-view 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/scroll-view.html)
