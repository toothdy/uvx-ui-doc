<h5-demo src="pages/form/signature/signature" title="Signature 签名板" />

# Signature 签名板

`uvx-signature` 提供跨端手写签名、画笔与橡皮工具、撤销重做、清空和 PNG 临时图片导出能力。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 4.25+ | 4.25+ | 4.61+ | 4.25+ | 4.41+ |

小程序端仅支持微信。H5 同时支持鼠标和触摸输入，App 与微信小程序支持触摸输入。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 手写、画笔、橡皮和内置工具栏 | √ | √ | √ | √ | √ |
| 撤销、重做、清空和判空 | √ | √ | √ | √ | √ |
| PNG 临时图片导出 | √ | √ | √ | √ | √ |
| 鼠标绘制 | × | × | × | √ | × |

::: warning 使用须知

1. `ready` 事件触发后画布才可稳定绘制和导出。组件会在挂载时自动初始化，容器尺寸尚未确定时可调用 `init()` 重新测量。
2. `background-color` 必须是不透明颜色。橡皮通过背景色覆盖原笔画，不是透明像素擦除。
3. `clear()` 会同时清空撤销和重做记录，清空操作本身不可撤销。
4. `isEmpty()` 按画笔笔画判断，不进行像素级检测；只有橡皮笔画时仍视为空签名。
5. 空签名、画布未就绪或重复导出时，`toTempFilePath()` 会触发 `error`。
6. `disabled=true` 会禁用绘制和工具栏操作；`show-toolbar=false` 仅隐藏工具栏，可通过实例方法控制签名。

:::

## 基础用法

```vue
<template>
   <uvx-signature
      ref="signature"
      @ready="handleReady"
      @change="handleChange"
      @export="handleExport"
      @error="handleError"
   ></uvx-signature>
</template>

<script lang="uts" setup>
import type { SignatureChangeEvent } from "@/uni_modules/uvx-ui/components/uvx-signature/types/index.uts";

// 签名板组件实例
const signature = ref<UvxSignatureComponentPublicInstance | null>(null);

/**
 * 处理画布就绪
 * @returns null
 */
const handleReady = (): void => {
   console.log("签名板已就绪");
};

/**
 * 处理签名变化
 * @param event 签名变化事件
 * @returns null
 */
const handleChange = (event: SignatureChangeEvent): void => {
   console.log(event.action, event.strokeCount, event.empty);
};

/**
 * 处理导出完成
 * @param tempFilePath 临时图片路径
 * @returns null
 */
const handleExport = (tempFilePath: string): void => {
   console.log("导出路径", tempFilePath);
};

/**
 * 处理组件错误
 * @param message 错误信息
 * @returns null
 */
const handleError = (message: string): void => {
   uni.showToast({ title: message, icon: "none" });
};
</script>
```

## 自定义画笔与工具栏

```vue
<uvx-signature
   height="200"
   background-color="#fff8ef"
   pen-color="#7c3aed"
   :pen-width="5"
   :eraser-width="24"
   :pen-colors="['#7c3aed', '#0f766e', '#c2410c', '#111827']"
   :pen-widths="[3, 5, 8]"
></uvx-signature>
```

`pen-colors` 和 `pen-widths` 传入空数组时使用组件内置选项。

## 外部控制与导出

```vue
<template>
   <uvx-signature
      ref="signature"
      :show-toolbar="false"
      @export="handleExport"
   ></uvx-signature>
   <uvx-button text="撤销" @click="undo"></uvx-button>
   <uvx-button text="重做" @click="redo"></uvx-button>
   <uvx-button text="清空" @click="clear"></uvx-button>
   <uvx-button text="导出 PNG" @click="exportImage"></uvx-button>
   <image
      v-if="tempFilePath != ''"
      :src="tempFilePath"
      mode="widthFix"
   ></image>
</template>

<script lang="uts" setup>
// 签名板组件实例
const signature = ref<UvxSignatureComponentPublicInstance | null>(null);
// 导出的临时图片路径
const tempFilePath = ref("");

/**
 * 撤销最后一笔
 * @returns null
 */
const undo = (): void => {
   signature.value?.undo();
};

/**
 * 恢复最后一次撤销
 * @returns null
 */
const redo = (): void => {
   signature.value?.redo();
};

/**
 * 清空签名
 * @returns null
 */
const clear = (): void => {
   signature.value?.clear();
};

/**
 * 导出签名图片
 * @returns null
 */
const exportImage = (): void => {
   signature.value?.toTempFilePath();
};

/**
 * 保存导出结果
 * @param path 临时图片路径
 * @returns null
 */
const handleExport = (path: string): void => {
   tempFilePath.value = path;
};
</script>
```

## 禁用状态

```vue
<uvx-signature :disabled="true"></uvx-signature>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `width` | 签名板宽度，数字单位为 px | `string \| number` | `"100%"` | 全部 |
| `height` | 签名区域高度，数字单位为 px | `string \| number` | `240` | 全部 |
| `background-color` | 签名区域不透明背景色 | `string` | `#ffffff` | 全部 |
| `pen-color` | 初始画笔颜色 | `string` | `#303133` | 全部 |
| `pen-width` | 初始画笔宽度，单位 px | `number` | `4` | 全部 |
| `eraser-width` | 橡皮宽度，单位 px | `number` | `18` | 全部 |
| `pen-colors` | 工具栏预设颜色，空数组使用内置选项 | `string[]` | `[]` | 全部 |
| `pen-widths` | 工具栏预设宽度，空数组使用内置选项 | `number[]` | `[]` | 全部 |
| `show-toolbar` | 是否显示内置工具栏 | `boolean` | `true` | 全部 |
| `disabled` | 是否禁用绘制和工具栏操作 | `boolean` | `false` | 全部 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 根节点外部样式类 | `string` | `""` | 全部 |

内置画笔颜色为 `#303133`、`#3c9cff`、`#f56c6c`，内置画笔宽度为 `2`、`4`、`6`。

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `ready` | 画布初始化或重新初始化完成 | - | 全部 |
| `change` | 完成笔画、撤销、重做或清空后触发 | `SignatureChangeEvent` | 全部 |
| `export` | PNG 临时图片导出完成 | `string`，临时图片路径 | 全部 |
| `error` | 初始化或导出失败 | `string`，错误信息 | 全部 |

### SignatureChangeEvent

| 字段 | 说明 | 类型 |
| :---: | :---: | :---: |
| `action` | 本次变化类型 | `stroke \| undo \| redo \| clear` |
| `empty` | 当前是否没有画笔笔画 | `boolean` |
| `canUndo` | 当前是否可以撤销 | `boolean` |
| `canRedo` | 当前是否可以重做 | `boolean` |
| `strokeCount` | 当前笔画与橡皮操作总数 | `number` |

### Methods

| 方法 | 说明 | 返回值 |
| :---: | :---: | :---: |
| `init()` | 重新测量画布并重绘签名 | `void` |
| `undo()` | 撤销最后一笔 | `void` |
| `redo()` | 恢复最后一次撤销 | `void` |
| `clear()` | 清空签名和历史记录 | `void` |
| `isEmpty()` | 判断当前是否没有画笔笔画 | `boolean` |
| `toTempFilePath()` | 导出 PNG 临时图片 | `void`，结果通过 `export` / `error` 事件返回 |

### Slots

组件没有公开插槽。

## 参考

- [uni-app x Canvas 组件](https://doc.dcloud.net.cn/uni-app-x/component/canvas.html)
- [uni.createCanvasContextAsync](https://doc.dcloud.net.cn/uni-app-x/api/create-canvas-context-async.html)
- [UniElement.takeSnapshot](https://doc.dcloud.net.cn/uni-app-x/api/dom/unielement.html#takesnapshot)
