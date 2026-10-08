# Page 页面容器

`uvx-page` 是页面根容器，统一提供主题作用域和页面级 Toast。App 端使用 `scroll-view` 承载页面内容，Web 与微信小程序端使用普通 `view`，由页面本身负责滚动。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

小程序端仅支持微信。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :--- | :-: | :-: | :-: | :-: | :-: |
| 页面根容器和主题作用域 | √ | √ | √ | √ | √ |
| 滚动方向、边界和滚动条配置 | √ | √ | √ | - | - |
| 滚动位置控制及滚动事件 | √ | √ | √ | - | - |
| 页面级 Toast | √ | √ | √ | √ | √ |
| 内置主题切换按钮 | √ | √ | √ | - | - |

::: warning 使用须知

1. 推荐把 `uvx-page` 放在页面模板的根部。App 端组件自身已经是滚动容器，除非内容需要独立滚动，否则不要再嵌套 `scroll-view`、`list-view` 或 `waterflow`。
2. `direction`、`bounces`、`show-scrollbar`、`upper-threshold`、`lower-threshold`、`scroll-top`、`scroll-with-animation` 和四个滚动事件仅在 App 端生效。Web 与微信小程序端渲染普通 `view`，需要通过页面滚动 API 和 `onPageScroll` 处理滚动。
3. 当前版本 `bounces` 的实际默认值为 `false`。`direction="none"` 可在 App 端关闭页面容器滚动，适合内部已有独立滚动组件的页面。
4. App 端会在页面中挂载 `uvx-theme` 主题切换按钮；Web 与微信小程序端不会挂载。

:::

## 基础用法

```vue
<template>
   <uvx-page>
      <view class="page-content">
         <text>页面内容</text>
      </view>
   </uvx-page>
</template>
```

## 禁用 App 页面滚动

页面内容由 `list-view`、`waterflow` 等组件独立滚动时，把 `direction` 设为 `none`，避免 App 端出现嵌套滚动冲突。

```vue
<uvx-page direction="none">
   <list-view style="flex: 1;">
      <slot></slot>
   </list-view>
</uvx-page>
```

## 监听滚动并返回顶部

App 端通过 `scroll` 事件获取当前位置，并更新 `scroll-top` 控制滚动。Web 与微信小程序端应使用 `onPageScroll` 和 `uni.pageScrollTo`。

```vue
<template>
   <uvx-page
      :scroll-top="pageScrollTop"
      @scroll="handleScroll"
   >
      <view style="height: 1200px;"></view>
      <uvx-button text="返回顶部" @click="handleBackTop"></uvx-button>
   </uvx-page>
</template>

<script lang="uts" setup>
// 当前滚动距离
const scrollTop = ref(0);
// App 页面滚动位置
const pageScrollTop = ref(0);

/**
 * 记录 App 页面滚动位置
 * @param event 滚动事件
 * @returns null
 */
const handleScroll = (event: UniScrollEvent): void => {
   scrollTop.value = event.detail.scrollTop;
};

/**
 * 返回页面顶部
 * @returns null
 */
const handleBackTop = (): void => {
   // #ifdef APP
   // 先同步当前值，避免绑定值未变化时无法触发回顶
   pageScrollTop.value = scrollTop.value;
   nextTick(() => {
      pageScrollTop.value = 0;
   });
   // #endif
   // #ifndef APP
   uni.pageScrollTo({ scrollTop: 0, duration: 300 });
   // #endif
};

// #ifndef APP
/**
 * 记录非 App 页面滚动位置
 * @param event 页面滚动事件
 * @returns null
 */
onPageScroll((event) => {
   scrollTop.value = event.scrollTop;
});
// #endif
</script>
```

## 显示页面提示

组件内部包含 `uvx-toast`，可通过 `toast(options)` 显示页面提示。

```vue
<template>
   <uvx-page ref="uPage">
      <uvx-button text="显示提示" @click="showToast"></uvx-button>
   </uvx-page>
</template>

<script lang="uts" setup>
// 页面容器实例
const uPage = ref<UvxPageComponentPublicInstance | null>(null);

/**
 * 显示页面提示
 * @returns null
 */
const showToast = (): void => {
   uPage.value?.toast({
      message: "操作成功",
      type: "success",
   });
};
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :--- | :--- | :--- | :--- | :--- |
| `direction` | 滚动方向 | `none \| vertical \| horizontal \| all` | `vertical` | 仅 App |
| `bounces` | 是否启用边界回弹 | `boolean` | `false` | 仅 App |
| `show-scrollbar` | 是否显示滚动条 | `boolean` | `false` | 仅 App |
| `upper-threshold` | 距顶部或左侧多远时触发 `scrolltoupper`，单位 px | `number` | `50` | 仅 App |
| `lower-threshold` | 距底部或右侧多远时触发 `scrolltolower`，单位 px | `number` | `50` | 仅 App |
| `scroll-top` | 竖向滚动位置，单位 px | `number` | `0` | 仅 App |
| `scroll-with-animation` | 设置 `scroll-top` 时是否使用滚动动画 | `boolean` | `true` | 仅 App |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :--- | :--- | :--- | :--- |
| `scroll` | 滚动时触发 | `event: UniScrollEvent` | 仅 App |
| `scrolltoupper` | 滚动到顶部或左侧阈值时触发 | `event: UniScrollToUpperEvent` | 仅 App |
| `scrolltolower` | 滚动到底部或右侧阈值时触发 | `event: UniScrollToLowerEvent` | 仅 App |
| `scrollend` | 滚动结束时触发 | `event: UniScrollEvent` | 仅 App |

### Methods

| 方法 | 说明 | 参数 | 平台 |
| :--- | :--- | :--- | :--- |
| `toast(options)` | 显示页面内置 Toast | `options: ToastOptions`，字段见 [Toast 消息提示](/components/toast) | 全平台 |

### Slots

| 插槽 | 说明 | 平台 |
| :--- | :--- | :--- |
| `default` | 页面内容 | 全平台 |

## 参考

- [uni-app x `scroll-view` 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/scroll-view.html)
- [uvx-ui 页面滚动注意事项](/guide/notes#页面滚动)
- [Toast 消息提示](/components/toast)
