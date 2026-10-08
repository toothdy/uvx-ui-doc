<h5-demo src="pages/layout/grid/grid" title="Grid 宫格布局" />

# Grid 宫格布局

`uvx-grid` 与 `uvx-grid-item` 组合成固定列数的宫格布局。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

## 基础用法

```vue
<template>
   <uvx-grid :col="4" :border="true" @click="handleClick">
      <uvx-grid-item v-for="(item, index) in items" :key="index" :name="item.id" :data="item">
         <text>{{ item.title }}</text>
      </uvx-grid-item>
   </uvx-grid>
</template>

<script lang="uts" setup>
import type { ClickValue } from "@/uni_modules/uvx-ui/components/uvx-grid/types/index.uts";

const items: UTSJSONObject[] = [
   { id: 1, title: "图片" },
   { id: 2, title: "锁头" },
   { id: 3, title: "星星" },
   { id: 4, title: "地图" },
];

/**
 * 处理宫格点击
 * @param value 有 data 时返回 data,否则返回 name 或索引
 * @returns null
 */
const handleClick = (value: ClickValue): void => {
   console.log(value);
};
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| :---: | :---: | :---: | :---: |
| `col` | 列数 | `string \| number` | `3` |
| `border` | 是否显示边框 | `boolean` | `false` |
| `align` | 子项对齐方式 | `left \| center \| right` | `left` |
| `custom-style` / `custom-class` | 自定义样式和类名 | `string` | `""` |

### Events

| 事件 | 说明 | 参数 |
| :---: | :---: | :---: |
| `click` | 子项点击事件汇总；有 `data` 时返回 `data`，否则返回 `name` 或索引 | `string \| number \| object \| array` |

### GridItem Props

| 属性 | 说明 | 类型 | 默认值 |
| :---: | :---: | :---: | :---: |
| `name` | 子项标识；未设置时使用子项索引 | `string \| number \| null` | `null` |
| `data` | 子项点击时返回的数据；为空时回退到 `name` 或索引 | `object \| array \| string` | `{}` |
| `bg-color` | 子项背景颜色 | `string` | `transparent` |
| `custom-style` / `custom-class` | 子项自定义样式和类名 | `string` | `""` |

### GridItem Events

| 事件 | 说明 | 参数 |
| :---: | :---: | :---: |
| `click` | 点击当前宫格 | `string \| number \| object \| array` |

## 参考

- [CSS grid 官方文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_grid_layout)
