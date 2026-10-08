<h5-demo src="pages/feedback/popup/popup" title="Popup 弹出层" />

# Popup 弹出层

`uvx-popup` 提供顶部、底部、左右侧和居中弹出的通用内容容器，内置遮罩、过渡动画、安全区和关闭按钮。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 五种弹出方向、遮罩、圆角和关闭按钮 | √ | √ | √ | √ | √ |
| 顶部与底部安全区 | √ | √ | √ | √ | √ |
| `open`、`close`、`closeMask` 方法 | √ | √ | √ | √ | √ |
| Escape 键触发遮罩关闭逻辑 | × | × | × | √ | × |

::: warning 使用须知

1. 组件没有 `show` 属性，应通过实例方法控制；`open(mode)` 可临时覆盖本次弹出方向。
2. 点击遮罩始终触发 `mask-click`，仅当 `close-on-click-overlay` 为 `true` 时才会关闭。
3. `closeMask()` 只隐藏当前遮罩，不关闭弹出内容；下次 `open()` 会重新显示遮罩。
4. `round` 仅对 `top`、`bottom` 和 `center` 设置对应圆角；左右弹出不应用圆角。
5. Web 端打开时监听 Escape 键，并复用遮罩点击逻辑。

:::

## 基础用法

```vue
<template>
   <uvx-button text="打开" @click="handleOpen"></uvx-button>
   <uvx-popup ref="uPopup" mode="bottom">
      <view class="popup-content">
         <text>弹出内容</text>
      </view>
   </uvx-popup>
</template>

<script lang="uts" setup>
const uPopup = ref<UvxPopupComponentPublicInstance | null>(null);

/**
 * 打开弹层
 * @returns null
 */
const handleOpen = (): void => {
   uPopup.value?.open();
};
</script>
```

## 弹出方向

`mode` 支持 `top`、`center`、`bottom`、`left` 和 `right`。

```vue
<uvx-popup ref="uPopup" mode="right">
   <view class="side-content">
      <text>右侧内容</text>
   </view>
</uvx-popup>
```

也可在打开时临时指定方向：

```uts
uPopup.value?.open("left");
```

## 圆角和关闭按钮

```vue
<uvx-popup
   ref="uPopup"
   mode="bottom"
   :round="12"
   :closeable="true"
   close-icon-pos="top-right"
></uvx-popup>
```

## 遮罩控制

```vue
<uvx-popup
   ref="uPopup"
   :overlay="true"
   :overlay-opacity="0.6"
   :close-on-click-overlay="false"
   @mask-click="handleMaskClick"
></uvx-popup>
```

```uts
const handleMaskClick = (): void => {
   console.log("mask clicked");
};
```

## 安全区

`safe-area` 是总开关。顶部弹层可启用 `safe-area-inset-top`，底部弹层默认启用 `safe-area-inset-bottom`。

```vue
<uvx-popup
   ref="uPopup"
   mode="top"
   :safe-area="true"
   :safe-area-inset-top="true"
></uvx-popup>
```

## 监听状态

```vue
<uvx-popup ref="uPopup" @change="handleChange"></uvx-popup>
```

```uts
import type { ChangeEvent } from "@/uni_modules/uvx-ui/components/uvx-popup/types/index.uts";

const handleChange = (event: ChangeEvent): void => {
   console.log(event.show, event.type);
};
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `mode` | 默认弹出方向 | `top \| center \| bottom \| left \| right` | `center` | 全部 |
| `duration` | 过渡动画时长，单位 ms | `number` | `300` | 全部 |
| `z-index` | 遮罩层级；内容层级在此基础上加 `1` | `string \| number` | 全局层级 | 全部 |
| `bg-color` | 内容背景色；`page` 使用页面色，`none` 使用透明色 | `string` | `""` | 全部 |
| `safe-area` | 是否启用安全区适配 | `boolean` | `true` | 全部 |
| `overlay` | 是否显示遮罩 | `boolean` | `true` | 全部 |
| `close-on-click-overlay` | 点击遮罩是否关闭 | `boolean` | `true` | 全部 |
| `overlay-opacity` | 遮罩透明度 | `string \| number` | `0.4` | 全部 |
| `overlay-style` | 遮罩自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `safe-area-inset-bottom` | 是否留出底部安全区 | `boolean` | `true` | 全部 |
| `safe-area-inset-top` | 是否留出顶部状态栏安全区 | `boolean` | `false` | 全部 |
| `closeable` | 是否显示关闭按钮 | `boolean` | `false` | 全部 |
| `close-icon-pos` | 关闭按钮位置 | `top-left \| top-right \| bottom-left \| bottom-right` | `top-right` | 全部 |
| `zoom` | 居中模式是否使用缩放动画；关闭后使用淡入淡出 | `boolean` | `true` | 全部 |
| `round` | 弹层圆角，负值按 `0` 处理 | `string \| number` | `0` | 全部 |
| `u-style` | 内容容器自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 根节点追加类名 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `change` | 打开或关闭时触发 | `ChangeEvent` | 全部 |
| `mask-click` | 点击遮罩或 Web 端按下 Escape 时触发 | - | 全部；Escape 仅 H5 |

### Slots

| 名称 | 说明 | 平台 |
| :---: | :---: | :---: |
| `default` | 弹层内容 | 全部 |

### Methods

| 方法 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `open(mode?)` | 打开弹层，可临时指定方向 | `Mode` | 全部 |
| `close()` | 关闭弹层 | - | 全部 |
| `closeMask()` | 隐藏当前遮罩，不关闭内容 | - | 全部 |

### ChangeEvent

| 字段 | 说明 | 类型 |
| :---: | :---: | :---: |
| `show` | 弹层是否打开 | `boolean` |
| `type` | 当前弹出方向 | `Mode` |

## 参考

- [uni-app x 安全区适配](https://doc.dcloud.net.cn/uni-app-x/css/common/variable.html)
