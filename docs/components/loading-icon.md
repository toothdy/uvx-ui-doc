<h5-demo src="pages/data/loading-icon/loading-icon" title="LoadingIcon 加载动画" />

# LoadingIcon 加载动画

`uvx-loading-icon` 提供菊花、圆环和半圆三种旋转加载动画，可与提示文字横向或纵向排列。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 三种动画、尺寸、颜色和提示文字 | √ | √ | √ | √ | √ |
| 动画周期和缓动函数 | √ | √ | √ | √ | √ |
| 原生元素动画实现 | √ | √ | √ | × | × |
| CSS 关键帧动画实现 | × | × | × | √ | √ |

::: warning 使用须知

1. App 端使用元素 `animate` 执行动画；H5 和小程序使用 CSS 变量与关键帧，`duration` 和 `easing` 均会传入对应实现。
2. `color` 支持 `primary`、`success`、`warning`、`error`、`info`、`content`、`placeholder` 语义色，也支持普通 CSS 颜色。
3. `circle` 模式可通过 `incolor` 设置轨道颜色；未设置时使用默认浅色轨道。
4. `show=false` 时节点不渲染，App 端同时取消当前动画。

:::

## 基础用法

```vue
<uvx-loading-icon></uvx-loading-icon>
```

## 动画模式

```vue
<template>
   <uvx-loading-icon mode="spinner"></uvx-loading-icon>
   <uvx-loading-icon mode="circle"></uvx-loading-icon>
   <uvx-loading-icon mode="semicircle"></uvx-loading-icon>
</template>
```

## 尺寸和颜色

```vue
<uvx-loading-icon
   mode="circle"
   :size="30"
   color="#f56c6c"
   incolor="#fde2e2"
></uvx-loading-icon>
```

## 提示文字

`vertical=true` 时文字位于图标下方，设为 `false` 后横向排列。

```vue
<template>
   <uvx-loading-icon mode="spinner" text="加载中"></uvx-loading-icon>
   <uvx-loading-icon
      mode="circle"
      text="提交中"
      :vertical="false"
      text-color="#3c9cff"
      :text-size="14"
   ></uvx-loading-icon>
</template>
```

## 动画周期

```vue
<uvx-loading-icon
   mode="circle"
   easing="ease-in"
   :duration="3000"
></uvx-loading-icon>
```

## 自定义样式

```vue
<uvx-loading-icon
   text="加载中"
   text-style="font-weight: 600; margin-top: 8px;"
   u-style="padding: 12px;"
></uvx-loading-icon>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `show` | 是否渲染组件并运行动画 | `boolean` | `true` | 全部 |
| `color` | 动画活动色，支持语义色和 CSS 颜色 | `string` | `""`（空时使用主题色） | 全部 |
| `text-color` | 提示文字颜色 | `string` | `""`（空时使用主题色） | 全部 |
| `vertical` | 图标与文字是否纵向排列 | `boolean` | `true` | 全部 |
| `mode` | 动画模式 | `spinner \| circle \| semicircle` | `spinner` | 全部 |
| `size` | 图标宽高 | `string \| number` | `24` | 全部 |
| `text-size` | 提示文字大小 | `string \| number` | `15` | 全部 |
| `text` | 提示文字；为空时不渲染文字节点 | `string` | `""` | 全部 |
| `text-style` | 提示文字自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `easing` | 动画缓动函数 | `string` | `linear` | 全部 |
| `duration` | 单圈动画周期，单位 ms | `number` | `1200` | 全部 |
| `incolor` | `circle` 模式的轨道颜色 | `string` | `""` | 全部 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |

## 参考

- [uni-app x animation 官方文档](https://doc.dcloud.net.cn/uni-app-x/dom/animation.html)
