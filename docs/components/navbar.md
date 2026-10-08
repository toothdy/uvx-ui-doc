<h5-demo src="pages/navigation/navbar/navbar" title="Navbar 导航栏" />

# Navbar 导航栏

`uvx-navbar` 提供页面顶部导航、返回、左右操作、固定定位和滚动透明效果。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

## 基础用法

```vue
<template>
   <uvx-navbar title="页面标题" :auto-back="true" @left-click="handleBack"></uvx-navbar>
</template>

<script lang="uts" setup>
/**
 * 处理左侧区域点击
 * @returns null
 */
const handleBack = (): void => {
   console.log("left click");
};
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| :---: | :---: | :---: | :---: |
| `safe-area-inset-top` / `placeholder` / `fixed` | 安全区、占位和固定定位 | `boolean` | `true` / `true` / `true` |
| `border` | 是否显示底部边框 | `boolean` | `false` |
| `left-icon` / `right-icon` | 左右图标 | `string` | `arrow-left` / `""` |
| `left-text` / `right-text` | 左右文字 | `string` | `""` / `""` |
| `title` | 标题 | `string \| number` | `""` |
| `bg-color` | 背景颜色、渐变或图片地址 | `string` | `#ffffff` |
| `img-mode` | 背景图片裁剪模式 | `Mode` | `aspectFill` |
| `title-width` / `height` / `left-icon-size` | 尺寸 | `string \| number` | `400rpx` / `44px` / `20` |
| `left-icon-color` | 左侧图标和文字颜色 | `string` | `#303133` |
| `auto-back` | 左侧点击是否自动返回 | `boolean` | `false` |
| `scroll-transparent` | 是否随滚动透明 | `boolean` | `false` |
| `scroll-distance` / `initial-opacity` | 透明滚动距离和初始透明度 | `string \| number` | `200` / `0` |
| `title-style` | 标题样式，支持样式对象或 CSS 字符串 | `object \| string` | `""` |

### Events

| 事件 | 说明 | 参数 |
| :---: | :---: | :---: |
| `left-click` / `right-click` | 点击左右区域 | - |

## 参考

- [uni-app x navigationBar 官方文档](https://doc.dcloud.net.cn/uni-app-x/collocation/pages.html#navigationbar)
