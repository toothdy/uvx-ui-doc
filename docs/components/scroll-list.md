<h5-demo src="pages/data/scroll-list/scroll-list" title="ScrollList 横向滚动列表" />

# ScrollList 横向滚动列表

`uvx-scroll-list` 提供横向滚动容器、滚动进度指示器和左右边界事件，适合商品列表与横向菜单。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 横向滚动、隐藏滚动条和默认插槽 | √ | √ | √ | √ | √ |
| 滚动进度指示器和边界事件 | √ | √ | √ | √ | √ |
| `init()` 重新测量可视宽度 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. 插槽内容需要形成大于组件宽度的横向布局，才能产生滚动和进度变化。
2. 组件挂载时只测量一次可视宽度；布局宽度变化后应调用 `init()` 重新测量。
3. `left`、`right` 分别由内部 `scrolltoupper`、`scrolltolower` 触发，不会在普通滚动的每一帧重复触发。
4. `indicator-bar-width` 会被限制为不超过 `indicator-width`；负数或无法解析的尺寸回退默认值。

:::

## 基础用法

```vue
<template>
   <uvx-scroll-list>
      <view class="goods-row">
         <view v-for="(item, index) in goods" :key="index" class="goods-item">
            <text class="goods-item-text">{{ item }}</text>
         </view>
      </view>
   </uvx-scroll-list>
</template>

<script lang="uts" setup>
// 横向列表数据
const goods = ref<string[]>(["商品一", "商品二", "商品三", "商品四"]);
</script>
```

## 自定义指示器

```vue
<uvx-scroll-list
   :indicator-width="60"
   :indicator-bar-width="24"
   indicator-color="#fff0f0"
   indicator-active-color="#f56c6c"
   indicator-style="margin-top: 20px;"
>
   <view class="goods-row"><!-- 横向内容 --></view>
</uvx-scroll-list>
```

## 隐藏指示器

```vue
<uvx-scroll-list :indicator="false">
   <view class="menu-row"><!-- 横向内容 --></view>
</uvx-scroll-list>
```

## 边界事件

```vue
<template>
   <uvx-scroll-list @left="handleLeft" @right="handleRight">
      <view class="goods-row"><!-- 横向内容 --></view>
   </uvx-scroll-list>
</template>

<script lang="uts" setup>
/**
 * 滚动到左边界
 * @returns null
 */
const handleLeft = (): void => {
   console.log("scroll-list left");
};

/**
 * 滚动到右边界
 * @returns null
 */
const handleRight = (): void => {
   console.log("scroll-list right");
};
</script>
```

## 内容变化后重新测量

```vue
<uvx-scroll-list ref="uScrollList">
   <view class="goods-row"><!-- 横向内容 --></view>
</uvx-scroll-list>
```

```uts
// 滚动列表组件实例
const uScrollList = ref<UvxScrollListComponentPublicInstance | null>(null);

const handleLayoutChange = (): void => {
   uScrollList.value?.init();
};
```

## 自定义根节点

```vue
<uvx-scroll-list
   u-class="custom-scroll-list"
   u-style="padding-bottom: 16px;"
></uvx-scroll-list>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `indicator-width` | 指示器轨道宽度；支持 px 数值和 rpx 字符串 | `string \| number` | `50` | 全部 |
| `indicator-bar-width` | 指示器滑块宽度，不超过轨道宽度 | `string \| number` | `20` | 全部 |
| `indicator` | 是否显示进度指示器 | `boolean` | `true` | 全部 |
| `indicator-color` | 指示器轨道颜色，为空时使用边框主题色 | `string` | `""` | 全部 |
| `indicator-active-color` | 指示器滑块颜色，为空时使用主色 | `string` | `""` | 全部 |
| `indicator-style` | 指示器容器样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到根节点的外部样式类 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `left` | 滚动到左边界时触发 | - | 全部 |
| `right` | 滚动到右边界时触发 | - | 全部 |

### Slots

| 名称 | 说明 | 平台 |
| :---: | :---: | :---: |
| `default` | 横向滚动内容 | 全部 |

### Methods

| 方法 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `init()` | 下一帧重新测量滚动可视区宽度 | - | 全部 |

## 参考

- [uni-app x scroll-view 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/scroll-view.html)
