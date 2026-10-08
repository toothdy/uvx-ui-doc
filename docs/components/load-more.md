<h5-demo src="pages/data/load-more/load-more" title="LoadMore 加载更多" />

# LoadMore 加载更多

`uvx-load-more` 用于列表底部展示加载前、加载中和没有更多数据三种状态，可配合 `scroll-view`、`list-view` 等滚动容器使用。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 4.51+ | 4.51+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 三种状态切换与默认提示文案 | √ | √ | √ | √ | √ |
| `loadmore` 点击事件 | √ | √ | √ | √ | √ |
| 加载中图标（App 端 `UniElement.animate()` 驱动旋转） | 4.51+ | 4.51+ | 4.61+ | √ | √ |
| 两侧分割线与虚线样式 | √ | √ | √ | √ | √ |
| `nomore` 粗点样式 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. `status` 取值 `loadmore`、`loading`、`nomore`，默认 `loadmore`。未传对应文字时，三种状态分别显示"加载更多"、"正在加载..."、"没有更多了"。
2. `@loadmore` 事件绑定在提示文字上，仅 `status="loadmore"` 时点击触发；`loading`、`nomore` 状态点击无响应。
3. `status="nomore"` 且 `is-dot` 为 `true` 时，提示文字替换为粗点 `●`，此时 `nomore-text` 不再显示。
4. `status="loading"` 且 `icon` 为 `true` 时左侧显示加载图标，`loading-icon` 切换图标模式，`icon-size`、`icon-color` 控制大小与颜色。
5. `line` 为 `true` 时两侧显示分割线，长度固定 `140rpx`；`line-color` 为空时使用主题色，`dashed` 设置虚线。
6. `margin-top`、`margin-bottom`、`height`、`font-size` 等尺寸传数字时自动补 `px`，带单位字符串原样使用；`bg-color` 为空时背景保持透明。

:::

## 基础用法

通过 `status` 设置组件状态，加载中状态左侧显示加载图标。

```vue
<template>
   <uvx-load-more
      status="loading"
      :is-dot="true"
      :icon-size="17"
   ></uvx-load-more>
</template>
```

## 点击加载更多

`loadmore` 状态下点击提示文字触发 `@loadmore` 事件，在事件回调中请求下一页数据。

```vue
<template>
   <uvx-load-more
      status="loadmore"
      :line="true"
      @loadmore="handleLoadMore"
   ></uvx-load-more>
</template>

<script lang="uts" setup>
/**
 * 展示加载更多事件反馈
 * @returns null
 */
const handleLoadMore = (): void => {
   uni.showToast({
      title: "加载更多",
      icon: "none",
   });
};
</script>
```

## 没有更多数据

`status="nomore"` 显示没有更多数据的提示，`line` 显示两侧分割线。

```vue
<template>
   <uvx-load-more
      status="nomore"
      :line="true"
   ></uvx-load-more>
</template>
```

## 显示点

`nomore` 状态下 `is-dot` 为 `true` 时，提示文字替换为粗点 `●`。

```vue
<template>
   <uvx-load-more
      status="nomore"
      :is-dot="true"
      :line="true"
      color="#909399"
   ></uvx-load-more>
</template>
```

## 自定义提示语

`loading-text` 自定义加载中提示文字，`color` 设置文字颜色。

```vue
<template>
   <uvx-load-more
      status="loading"
      loading-text="努力加载中，先喝杯茶"
      color="#909399"
   ></uvx-load-more>
</template>
```

## 自定义图标

`loading-icon` 切换加载图标模式，取值同 `uvx-loading-icon` 的 `mode`。

```vue
<template>
   <uvx-load-more
      status="loading"
      loading-icon="circle"
   ></uvx-load-more>
</template>
```

## 自定义分割线

`line-color` 设置分割线颜色，`dashed` 显示虚线，`loadmore-text` 自定义加载前提示文字。

```vue
<template>
   <uvx-load-more
      loadmore-text="看，我和别人不一样"
      color="#1cd29b"
      line-color="#1cd29b"
      :dashed="true"
      :line="true"
   ></uvx-load-more>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `status` | 组件状态 | `loadmore \| loading \| nomore` | `loadmore` | 全部 |
| `bg-color` | 背景颜色，空时保持透明 | `string` | `""` | 全部 |
| `icon` | 加载中状态是否显示加载图标 | `boolean` | `true` | 全部 |
| `font-size` | 提示文字大小，数字自动补 `px` | `string \| number` | `14` | 全部 |
| `icon-size` | 加载图标大小，数字自动补 `px` | `string \| number` | `16` | 全部 |
| `color` | 提示文字颜色 | `string` | `#606266` | 全部 |
| `loading-icon` | 加载图标模式 | `spinner \| circle \| semicircle` | `spinner` | 全部 |
| `loadmore-text` | `loadmore` 状态提示文字，空时显示"加载更多" | `string` | `""` | 全部 |
| `loading-text` | `loading` 状态提示文字，空时显示"正在加载..." | `string` | `""` | 全部 |
| `nomore-text` | `nomore` 状态提示文字，空时显示"没有更多了" | `string` | `""` | 全部 |
| `is-dot` | `nomore` 状态是否显示粗点 | `boolean` | `false` | 全部 |
| `icon-color` | 加载图标颜色 | `string` | `#b7b7b7` | 全部 |
| `margin-top` | 上边距，数字自动补 `px` | `string \| number` | `10` | 全部 |
| `margin-bottom` | 下边距，数字自动补 `px` | `string \| number` | `10` | 全部 |
| `height` | 组件高度，数字自动补 `px` | `string \| number` | `auto` | 全部 |
| `line` | 是否显示两侧分割线 | `boolean` | `false` | 全部 |
| `line-color` | 分割线颜色 | `string` | `#E6E8EB` | 全部 |
| `dashed` | 分割线是否为虚线 | `boolean` | `false` | 全部 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到根节点的外部样式类 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `loadmore` | 点击提示文字时触发，仅 `loadmore` 状态响应 | - | 全部 |

## 参考

- [uni-app x scroll-view 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/scroll-view.html)
