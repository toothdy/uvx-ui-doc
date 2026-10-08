<h5-demo src="pages/layout/waterfall/waterfall" title="Waterfall 瀑布流布局" />

# Waterfall 瀑布流布局

`uvx-waterfall` 将任意卡片内容排列为多列瀑布流。App 端基于 uni-app x 原生 `waterflow` 和 `flow-item` 实现列布局与屏外节点回收，H5 和微信小程序使用 `scroll-view` 与 Flex 多列回退布局。组件内部集成 `uvx-load-more`，通过受控状态和语义化事件完成触底加载。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 4.41+ | 5.11+ Vapor | 5.02+ Vapor | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :--- | :-: | :-: | :-: | :-: | :-: |
| 原生瀑布流排版 | √ | √ | √ | × | × |
| 屏外列表项回收复用 | √ | √ | √ | × | × |
| 按 `height-key` 分配最短列 | × | × | × | √ | √ |
| 内部竖向滚动 | √ | √ | √ | √ | √ |
| `scrolltolower` 触底事件 | √ | √ | √ | √ | √ |
| `loadmore` 加载事件与状态控制 | √ | √ | √ | √ | √ |
| `clear` / `remove` 命令式方法 | √ | √ | √ | √ | √ |
| 自定义整行加载插槽 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. 组件本身是滚动容器，需要获得可确定的高度。在 Flex 页面中可设置 `u-style="flex: 1;"`，固定区域可直接设置 `height` CSS。
2. App 端由原生 `waterflow` 计算最短列，不读取 `height-key`。网络图片加载后若改变项高度，原生布局会重排并可能出现短暂位移；建议像演示页一样预先确定图片高度。
3. H5 和微信端不支持原生 `waterflow`，组件会读取 `height-key` 指定的正数高度权重并将项分配到当前最短列。字段缺失或无效时按等高项处理，列数量仍均衡，但视觉高度可能不均衡。
4. `load-status` 是受控属性。组件负责展示状态并阻止 `loading`、`nomore` 状态重复触发 `loadmore`，数据请求、列表追加和状态更新仍由使用方处理。
5. `column-count` 会被限制在 1–5 之间；小数会向下取整，非数字值回退为 2。
6. `remove(id)` 根据 `id-key` 删除第一个匹配项。数据中应保证该字段唯一；字段缺失时组件仅使用索引作为渲染 key。
7. `finish` 表示数据长度变化后已进入下一个渲染周期，不代表网络图片已下载完成。
8. App 原生 `waterflow` 不支持 `overflow: visible`，卡片阴影、负边距或越界徽标可能被裁剪。

:::

## 基础用法

使用 `v-model` 传入唯一数据源，默认作用域插槽提供 `item` 和数据源中的 `index`。数据项为 `UTSJSONObject`，可直接读取一级字段。

```vue
<template>
   <uvx-waterfall
      v-model="items"
      u-style="height: 600px;"
   >
      <template #default="{ item, index }">
         <view class="card">
            <uvx-image
               :src="item.image"
               :height="item.imageHeight"
               :fade="false"
               mode="aspectFill"
               width="100%"
            ></uvx-image>
            <text class="card__title">{{ index + 1 }}. {{ item.title }}</text>
         </view>
      </template>
   </uvx-waterfall>
</template>

<script lang="uts" setup>
import type { Item } from "@/uni_modules/uvx-ui/components/uvx-waterfall/types/index.uts";

const items = ref<Item[]>([
   {
      "id": 1,
      "height": 230,
      "image": "https://cdn.uviewui.com/uview/album/1.jpg",
      "imageHeight": 140,
      "title": "瀑布流卡片",
   },
]);
</script>
```

## 列数与间距

`column-count` 设置列数，`column-gap` 和 `row-gap` 分别设置横向、纵向间距，`left-gap` 和 `right-gap` 设置容器两侧间距。尺寸数字按 px 处理，也可传入带 `px` 或 `rpx` 的字符串。

```vue
<uvx-waterfall
   v-model="items"
   :column-count="3"
   column-gap="12rpx"
   row-gap="12"
   left-gap="16rpx"
   right-gap="16rpx"
   u-style="height: 600px;"
>
   <template #default="{ item }">
      <view class="card">...</view>
   </template>
</uvx-waterfall>
```

## H5 与微信高度预估

H5 和微信端通过 `height-key` 读取每项的高度权重。它可以是真实 px 高度，也可以是能反映相对高度的数值；组件只用它选择最短列，不会将该值写入卡片样式。

```uts
const items = ref<Item[]>([
   { "id": 1, "layoutHeight": 180, "title": "短卡片" },
   { "id": 2, "layoutHeight": 320, "title": "长卡片" },
]);
```

```vue
<uvx-waterfall
   v-model="items"
   height-key="layoutHeight"
   u-style="height: 600px;"
>
   <template #default="{ item }">
      <view class="card">...</view>
   </template>
</uvx-waterfall>
```

## 触底加载

组件内部默认渲染 `uvx-load-more`。滚动到 `lower-threshold` 指定距离或点击“加载更多”时，仅 `load-status="loadmore"` 会触发 `loadmore`；`loading` 和 `nomore` 状态不会重复触发。需要底层滚动事件时仍可监听 `scrolltolower`。

```vue
<uvx-waterfall
   v-model="items"
   :lower-threshold="80"
   :load-status="loadStatus"
   u-style="height: 600px;"
   @loadmore="handleLoadMore"
>
   <template #default="{ item }">
      <view class="card">...</view>
   </template>
</uvx-waterfall>
```

```uts
import type { Status } from "@/uni_modules/uvx-ui/components/uvx-load-more/types/index.uts";

const loadStatus = ref<Status>("loadmore");

/**
 * 加载下一页
 * @returns null
 */
const handleLoadMore = (): void => {
   loadStatus.value = "loading";
   setTimeout((): void => {
      // 数据追加完成后恢复；没有下一页时设置为 nomore。
      loadStatus.value = "loadmore";
   }, 500);
};
```

## 自定义加载区域

`loadmore` 插槽可覆盖组件内置的 `uvx-load-more`，自定义内容在所有平台都占据整行。`load-status` 仍负责控制触底时是否触发 `loadmore` 事件。

```vue
<uvx-waterfall
   v-model="items"
   :load-status="loadStatus"
   @loadmore="handleLoadMore"
>
   <template #default="{ item }">
      <view class="card">...</view>
   </template>
   <template #loadmore>
      <view class="custom-loadmore">{{ loadStatus }}</view>
   </template>
</uvx-waterfall>
```

## 清空与删除

`clear()` 通过 `update:modelValue` 清空数据并触发 `clear`；`remove(id)` 使用 `id-key` 查找数据，成功时更新 `v-model`，然后触发 `remove`。

```vue
<template>
   <uvx-waterfall ref="uWaterfall" v-model="items">
      <template #default="{ item }">
         <view class="card" @longpress="handleRemove(item)">...</view>
      </template>
   </uvx-waterfall>
</template>

<script lang="uts" setup>
import type { Item } from "@/uni_modules/uvx-ui/components/uvx-waterfall/types/index.uts";

// 瀑布流组件实例
const uWaterfall = ref<UvxWaterfallComponentPublicInstance | null>(null);

/**
 * 删除数据项
 * @param item 数据项
 * @returns null
 */
const handleRemove = (item: Item): void => {
   uWaterfall.value?.remove(item.id as number);
};

/**
 * 清空全部数据
 * @returns null
 */
const handleClear = (): void => {
   uWaterfall.value?.clear();
};
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台与限制 |
| :--- | :--- | :---: | :---: | :--- |
| `v-model` / `model-value` | 瀑布流数据 | `UTSJSONObject[]` | `[]` | 全部 |
| `id-key` | `remove` 与渲染 key 使用的唯一标识字段 | `string` | `"id"` | 全部 |
| `height-key` | 最短列分配使用的高度字段 | `string` | `"height"` | 仅 H5、微信读取；App 由原生布局测量 |
| `column-count` | 瀑布流列数 | `string \| number` | `2` | 全部；限制为 1–5 |
| `column-gap` | 列间距 | `string \| number` | `10` | 全部；数字单位为 px，支持 px/rpx 字符串 |
| `row-gap` | 行间距 | `string \| number` | `10` | 全部；数字单位为 px，支持 px/rpx 字符串 |
| `left-gap` | 容器左侧间距 | `string \| number` | `0` | 全部 |
| `right-gap` | 容器右侧间距 | `string \| number` | `0` | 全部 |
| `show-scrollbar` | 是否显示滚动条 | `boolean` | `false` | 全部 |
| `lower-threshold` | 触发 `scrolltolower` 的底部距离，单位 px | `number` | `50` | 全部 |
| `load-status` | 内置加载区状态，并控制是否触发 `loadmore` | `loadmore \| loading \| nomore` | `loadmore` | 全部 |
| `u-style` | 根节点自定义样式 | `string` | `""` | 全部 |
| `u-class` | 根节点外部类 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :--- | :--- | :--- | :---: |
| `update:modelValue` | `clear` 或成功 `remove` 后更新数据 | `value: UTSJSONObject[]` | 全部 |
| `finish` | 首次挂载或数据长度变化后的下一渲染周期触发 | 无 | 全部 |
| `clear` | `clear()` 清空数据后触发 | 无 | 全部 |
| `remove` | `remove(id)` 执行后触发 | `id: string \| number` | 全部 |
| `loadmore` | 触底或点击内置加载提示时触发，仅 `load-status="loadmore"` 响应 | 无 | 全部 |
| `scrolltolower` | 滚动到底部时触发 | `UniScrollToLowerEvent` | 全部 |

### Slots

| 名称 | 说明 | 参数 | 平台 |
| :--- | :--- | :--- | :---: |
| `default` | 渲染单个瀑布流项 | `item: UTSJSONObject`, `index: number` | 全部 |
| `loadmore` | 覆盖内置 `uvx-load-more` 的底部整行内容 | 无 | 全部 |

### Methods

| 方法 | 说明 | 参数 | 返回值 |
| :--- | :--- | :--- | :---: |
| `clear()` | 清空 `v-model` 数据 | 无 | `void` |
| `remove(id)` | 根据 `id-key` 删除第一个匹配项 | `string \| number` | `void` |

## 参考

- [uni-app x waterflow / flow-item 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/waterflow.html)
- [uni-app x scroll-view 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/scroll-view.html)
- [uni-app x 作用域插槽与 `defineSlots`](https://doc.dcloud.net.cn/uni-app-x/vue/composition-api.html#defineslots)
