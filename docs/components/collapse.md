<h5-demo src="pages/layout/collapse/collapse" title="Collapse 折叠面板" />

# Collapse 折叠面板

`uvx-collapse` 与 `uvx-collapse-item` 配合实现展开/收起列表，支持手风琴模式和状态事件。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 普通、手风琴、受控值和状态事件 | √ | √ | √ | √ | √ |

## 基础用法

```vue
<template>
   <uvx-collapse :value="activeNames">
      <uvx-collapse-item name="a" title="标题 A">
         <text>内容 A</text>
      </uvx-collapse-item>
      <uvx-collapse-item name="b" title="标题 B">
         <text>内容 B</text>
      </uvx-collapse-item>
   </uvx-collapse>
</template>

<script lang="uts" setup>
import type { Name } from "@/uni_modules/uvx-ui/components/uvx-collapse/types/index.uts";

// 当前展开项名称
const activeNames: Name[] = ["a"];
</script>
```

## 手风琴模式

```vue
<uvx-collapse :accordion="true">
   <uvx-collapse-item name="a" title="只展开一个">
      <text>内容</text>
   </uvx-collapse-item>
</uvx-collapse>
```

## API

### Collapse Props

| 属性 | 说明 | 类型 | 默认值 |
| :---: | :---: | :---: | :---: |
| `value` | 当前展开项名称或数组；非手风琴模式建议传数组，手风琴模式传单个名称 | `string \| number \| (string \| number)[] \| null` | `""` |
| `accordion` | 是否手风琴模式 | `boolean` | `false` |
| `border` | 是否显示边框 | `boolean` | `true` |

### Events

| 事件 | 说明 | 参数 |
| :---: | :---: | :---: |
| `change` | 展开状态变化 | `ChangeItem[]` |
| `open` / `close` | 单项打开或关闭 | `name` |

### CollapseItem Props

| 属性 | 说明 | 类型 | 默认值 |
| :---: | :---: | :---: | :---: |
| `title` / `value` / `label` | 标题、右侧内容和描述 | `string` | `""` / `""` / `""` |
| `name` | 面板唯一标识；未设置时事件中使用索引 | `string \| number` | `""` |
| `disabled` | 是否禁用展开 | `boolean` | `false` |
| `is-link` / `clickable` | 是否显示箭头和点击反馈 | `boolean` | `true` / `true` |
| `border` | 是否显示内边框 | `boolean` | `true` |
| `align` | 标题对齐方式 | `string` | `left` |
| `icon` | 标题左侧图标名称或图片路径 | `string` | `""` |
| `duration` | 展开收起动画时长（ms） | `number` | `300` |

默认插槽用于放置展开内容。

## 参考

- [Vue transition 官方文档](https://cn.vuejs.org/guide/built-ins/transition.html)
