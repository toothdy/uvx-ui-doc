<h5-demo src="pages/navigation/sticky/sticky" title="Sticky 吸顶" />

# Sticky 吸顶

`uvx-sticky` 让内容滚动到指定位置后停靠在顶部，可用于操作栏、筛选栏和分组标题。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 5.21+ | 5.11+ | 5.0+ | 4.0+ | 4.41+ |

小程序端仅支持微信。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 内容吸顶与顶部偏移 | 需滚动回调 | 需滚动回调 | 需滚动回调 | √ | √ |
| 禁用吸顶 | √ | √ | √ | √ | √ |
| 自定义背景色、层级和样式 | √ | √ | √ | √ | √ |
| 默认插槽 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. `offset-top` 默认为 `0`。`custom-nav-height` 在 H5 默认为 `44`，其他平台默认为 `0`；最终吸顶位置为两者之和，单位为 px，也接受带 `px` 或 `rpx` 的字符串。
2. App 不支持 CSS `position: sticky`。在 `uvx-page` 或其他滚动容器的 `scroll` 回调中调用组件的 `init()`，用于更新吸顶状态和位置。H5 会监听页面及内部滚动容器的滚动事件；微信端使用交叉观察器。
3. 吸顶内容使用固定定位；请为吸顶区域保留足够的显示空间，避免被页面中更高层级的固定内容覆盖。
4. `bg-color` 默认为空字符串，此时使用主题容器背景；显式颜色不会随主题切换。`z-index` 默认为 `970`；`disabled` 默认为 `false`。
5. `index` 是自定义标识，默认空字符串，不影响吸顶行为，也不会触发事件。

:::

## 基础用法

内容放在默认插槽中。H5 和微信端由组件监听滚动；App 端按下文连接滚动回调。

```vue
<template>
   <uvx-sticky>
      <uvx-button text="吸顶区域" type="success"></uvx-button>
   </uvx-sticky>
</template>
```

## 顶部偏移

`offset-top` 指定吸顶后与顶部的距离，`custom-nav-height` 可叠加自定义导航栏高度。

```vue
<uvx-sticky :offset-top="20" :custom-nav-height="48">
   <view><text>筛选条件</text></view>
</uvx-sticky>
```

## 禁用吸顶

设置 `disabled` 后，内容留在正常文档流中。

```vue
<uvx-sticky :disabled="true">
   <view><text>普通内容</text></view>
</uvx-sticky>
```

## 背景与样式

背景色为空时跟随主题；需要指定颜色时可传入 `bg-color`。`u-style` 和 `u-class` 作用于根节点。

```vue
<uvx-sticky
   bg-color="#ffffff"
   :z-index="980"
   u-style="padding: 8px;"
   u-class="filter-bar"
>
   <view><text>筛选条件</text></view>
</uvx-sticky>
```

## App 滚动容器

App 页面使用 `uvx-page` 时，在其滚动事件中调用 `init()`。普通页面也可在滚动事件中调用同一方法。

```vue
<template>
   <uvx-page @scroll="handleScroll">
      <uvx-sticky ref="uSticky">
         <uvx-button text="吸顶区域"></uvx-button>
      </uvx-sticky>
      <uvx-gap height="1500px"></uvx-gap>
   </uvx-page>
</template>

<script lang="uts" setup>
const uSticky = ref<UvxStickyComponentPublicInstance | null>(null);

/**
 * 更新吸顶位置
 * @param _event 页面滚动事件
 * @returns null
 */
const handleScroll = (_event: UniScrollEvent): void => {
   uSticky.value?.init();
};
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :--- | :--- | :--- | :--- | :--- |
| `offset-top` | 吸顶时距顶部的距离，单位 px，支持 `px`/`rpx` 字符串 | `string \| number` | `0` | 全平台 |
| `custom-nav-height` | 叠加的自定义导航栏高度，单位 px，支持 `px`/`rpx` 字符串 | `string \| number` | H5 `44`，其他 `0` | 全平台 |
| `disabled` | 禁用吸顶 | `boolean` | `false` | 全平台 |
| `bg-color` | 背景颜色，空值时使用主题容器背景 | `string` | `""` | 全平台 |
| `z-index` | 吸顶层级 | `string \| number` | `970` | 全平台 |
| `index` | 自定义标识，不参与定位 | `string \| number` | `""` | 全平台 |
| `u-style` | 根节点自定义 CSS 字符串 | `string` | `""` | 全平台 |
| `u-class` | 根节点自定义类名 | `string` | `""` | 全平台 |

### Methods

| 方法 | 说明 | 参数 | 平台 |
| :--- | :--- | :--- | :--- |
| `init()` | 更新吸顶状态与位置；微信端会重建观察器 | 无 | 全平台；App 滚动时需主动调用 |

### Slots

| 插槽 | 说明 | 平台 |
| :--- | :--- | :--- |
| `default` | 吸顶内容 | 全平台 |

组件不定义事件。

## 参考

- [uni-app x `position` 兼容性](https://doc.dcloud.net.cn/uni-app-x/css/position.html)
- [uni-app x `sticky-header` 使用限制](https://doc.dcloud.net.cn/uni-app-x/component/sticky-header.html)
- [uni-app x 元素引用与位置测量](https://doc.dcloud.net.cn/uni-app-x/refs.html)
