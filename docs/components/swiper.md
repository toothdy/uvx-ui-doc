<h5-demo src="pages/layout/swiper/swiper" title="Swiper 轮播图" />

# Swiper 轮播图

`uvx-swiper` 展示图片或视频轮播列表，支持自动播放、循环、垂直方向、多项展示和指标器。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

## 基础用法

```vue
<template>
   <uvx-swiper
      :list="images"
      :autoplay="true"
      :indicator="true"
      @change="handleChange"
   ></uvx-swiper>
</template>

<script lang="uts" setup>
import type { ChangeEvent, Item } from "@/uni_modules/uvx-ui/components/uvx-swiper/types/index.uts";

const images: Item[] = [
   "https://picsum.photos/750/400?random=1",
   "https://picsum.photos/750/400?random=2",
   "https://picsum.photos/750/400?random=3",
];

const handleChange = (event: ChangeEvent): void => {
   console.log("current index", event.current);
};
</script>
```

`list` 也可以传对象数组；配合 `key-name` 指定图片地址字段。对象中设置 `type: "video"` 时会按视频项处理，并建议关闭自动播放。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| :---: | :---: | :---: | :---: |
| `list` | 图片地址或对象数据 | `(string \| UTSJSONObject)[]` | `[]` |
| `indicator` | 是否显示指标器 | `boolean` | `false` |
| `indicator-active-color` / `indicator-inactive-color` | 指标器激活和未激活颜色 | `string` | `""` |
| `indicator-style` / `indicator-mode` | 指标器样式和模式 | `string` | `""` / `line` |
| `autoplay` / `circular` | 自动播放和循环 | `boolean` | `true` / `false` |
| `current` / `current-item-id` | 当前项索引和标识 | `string \| number` / `string` | `0` / `""` |
| `interval` / `duration` | 自动播放间隔和动画时长，单位 ms | `string \| number` | `3000` / `300` |
| `vertical` | 是否垂直方向 | `boolean` | `false` |
| `previous-margin` / `next-margin` | 前后露出边距 | `string \| number` | `0` |
| `acceleration` | 是否开启加速 | `boolean` | `false` |
| `display-multiple-items` | 同时显示的轮播项数量 | `number` | `1` |
| `easing-function` | 滑动动画缓动函数 | `EasingFunction` | `default` |
| `key-name` | 对象数据中的图片地址字段 | `string` | `url` |
| `img-mode` | 图片裁剪模式 | `ImageMode` | `aspectFill` |
| `height` / `radius` | 高度和圆角 | `string \| number` | `130` / `4` |
| `bg-color` | 背景颜色 | `string` | `""` |
| `loading` | 是否显示加载状态 | `boolean` | `false` |
| `show-title` / `title-style` | 是否显示标题及样式 | `boolean` / `string` | `false` / `""` |
| `u-style` / `u-class` | 自定义样式和类名 | `string` | `""` |

### Events

| 事件 | 说明 | 参数 |
| :---: | :---: | :---: |
| `click` | 点击轮播项 | `item: Item, index: number` |
| `change` | 当前项变化 | `ChangeEvent`（`current`, `currentItemId`, `source`） |

轮播项点击回调接收两个参数，不能只按事件对象读取：

```uts
const handleClick = (item: Item, index: number): void => {
   console.log(item, index);
};
```

### Slots

| 名称 | 说明 |
| :---: | :---: |
| `indicator` | 自定义指标器内容；使用后替换内置指标器 |

## 参考

- [uni-app x swiper 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/swiper.html)
