<h5-demo src="pages/form/pick-color/pick-color" title="PickColor 颜色选择器" />

# PickColor 颜色选择器

`uvx-pick-color` 提供底部弹出的颜色选择器，支持饱和度、亮度、色相、透明度、预设颜色和 HEX/RGBA 展示。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

小程序端仅支持微信。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 底部弹层、工具栏和遮罩 | √ | √ | √ | √ | √ |
| 面板、色相和透明度触摸选择 | √ | √ | √ | √ | √ |
| 预设颜色与 HEX/RGBA 展示 | √ | √ | √ | √ | √ |
| `closeOnClickOverlay` | √ | √ | √ | √ | √ |

::: warning 使用须知

1. 组件通过 `open()` 打开，确认、取消和遮罩关闭分别触发对应事件。
2. `color` 和 `prefab-color` 使用 `{ r, g, b, a }`，RGB 范围为 `0-255`，透明度范围为 `0-1`。
3. 颜色面板的布局测量发生在弹层打开后的过渡阶段；组件首次打开时会自动完成测量。
4. `cancel-color` 和 `confirm-color` 为空时跟随当前主题，显式传值才会覆盖主题颜色。

:::

## 基础用法

使用 `ref` 调用 `open()`，在 `confirm` 事件中读取选中的颜色。

```vue
<template>
   <uvx-button text="选择颜色" @click="openPicker"></uvx-button>
   <uvx-pick-color
      ref="picker"
      @confirm="handleConfirm"
   ></uvx-pick-color>
</template>

<script lang="uts" setup>
import { ref } from "vue";
import type { ConfirmEvent } from "@/uni_modules/uvx-ui/components/uvx-pick-color/types/index.uts";

const picker = ref<UvxPickColorComponentPublicInstance | null>(null);

/**
 * 打开颜色选择器
 * @returns null
 */
const openPicker = (): void => {
   picker.value?.open();
};

/**
 * 处理颜色确认
 * @param event 颜色确认事件
 * @returns null
 */
const handleConfirm = (event: ConfirmEvent): void => {
   console.log(event.rgba, event.hex);
};
</script>
```

## 设置初始颜色

`color` 设置打开时的初始颜色，颜色对象中的 `a` 表示透明度。

```vue
<uvx-pick-color
   :color="{ r: 60, g: 156, b: 255, a: 1 }"
   title="品牌颜色"
></uvx-pick-color>
```

## 设置预设颜色

`prefab-color` 会替换底部的预设颜色列表，点击色块即可应用。

```vue
<uvx-pick-color
   :prefab-color="[
      { r: 60, g: 156, b: 255, a: 1 },
      { r: 245, g: 108, b: 108, a: 1 },
      { r: 0, g: 0, b: 0, a: 0 },
   ]"
></uvx-pick-color>
```

## 禁止遮罩关闭

将 `close-on-click-overlay` 设置为 `false` 后，点击遮罩不会关闭弹层，只能通过取消或确认关闭。

```vue
<uvx-pick-color :close-on-click-overlay="false"></uvx-pick-color>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `color` | 初始颜色 | `Color` | `{ r: 0, g: 0, b: 0, a: 0 }` | 全部 |
| `prefab-color` | 预设颜色列表；传空数组时使用内置预设颜色 | `Color[]` | `[]`（内部回退为内置预设颜色） | 全部 |
| `close-on-click-overlay` | 是否允许点击遮罩关闭 | `boolean` | `true` | 全部 |
| `title` | 顶部标题 | `string` | `""` | 全部 |
| `cancel-text` | 取消按钮文字 | `string` | `取消` | 全部 |
| `confirm-text` | 确认按钮文字 | `string` | `确定` | 全部 |
| `cancel-color` | 取消按钮颜色，空值跟随主题 | `string` | `""` | 全部 |
| `confirm-color` | 确认按钮颜色，空值跟随主题 | `string` | `""` | 全部 |
| `u-style` | 根节点自定义样式 | `string` | `""` | 全部 |
| `u-class` | 根节点自定义类名 | `string` | `""` | 全部 |

`Color` 类型定义如下：

```ts
type Color = {
   r: number;
   g: number;
   b: number;
   a: number;
};
```

### Methods

| 方法 | 说明 |
| :---: | :---: |
| `open()` | 打开颜色选择器 |
| `close()` | 关闭颜色选择器 |

### Events

| 事件 | 说明 | 参数 |
| :---: | :---: | :---: |
| `confirm` | 点击确认按钮时触发 | `{ rgba: Color, hex: string }` |
| `cancel` | 点击取消按钮时触发 | 无 |
| `close` | 弹层关闭时触发，包括遮罩关闭 | 无 |
| `change` | 面板、控制条或预设颜色改变时触发 | `{ rgba: Color, hex: string }` |

### Slots

组件没有公开插槽。

## 参考

- [uvx-popup 弹出层](/components/popup)
- [uni-app x view 组件](https://doc.dcloud.net.cn/uni-app-x/component/view.html)
- [uni-app x DOM 元素](https://doc.dcloud.net.cn/uni-app-x/api/dom/unielement.html)
