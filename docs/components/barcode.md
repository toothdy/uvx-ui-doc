<h5-demo src="pages/data/barcode/barcode" title="Barcode 条形码" />

# Barcode 条形码

`uvx-barcode` 根据文本内容生成 CODE128 或 GS1-128 条形码，支持自动选择编码集合、自定义文字与颜色、导出临时图片及保存到相册。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 4.25+ | 4.25+ | 4.61+ | 4.25+ | 4.41+ |

小程序端仅支持微信。App 端使用原生视图快照导出，微信小程序使用 Canvas 导出。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| CODE128、GS1-128 和自动编码集合 | √ | √ | √ | √ | √ |
| 自定义尺寸、颜色和显示文字 | √ | √ | √ | √ | √ |
| `toTempFilePath` 导出 PNG | √ | √ | √ | √ | √ |
| `save` 保存到系统相册 | √ | √ | √ | 长按保存 | √ |

::: warning 使用须知

1. `value` 不能为空，仅支持 ASCII `0-127`。组件会在 Code Set A、B、C 之间自动选择和切换，不支持中文等非 ASCII 字符。
2. `gs1=true` 会在数据开头编码 FNC1；数据段之间可使用 `{FNC1}`，但不能放在开头、结尾或连续使用。FNC2、FNC3、FNC4 暂不支持。
3. 条形码宽度不足以容纳数据、边距和静区时会触发 `error`。内容较长时应增大 `width`，不要减小 `quietZone` 到 `10` 以下。
4. `auto` 默认为 `true`，监听内容、尺寸和配置变化自动重绘；关闭后需调用 `make()` 或 `remake()`。
5. H5 调用 `save()` 后显示长按保存提示，并触发 `export`；H5 不会触发 `save` 事件。
6. `hide` 会将组件移出可视区域但保留导出节点。不要通过父级 `v-if` 或 `display:none` 隐藏待导出的条形码。

:::

## 基础用法

```vue
<template>
   <uvx-barcode value="UVX-2026-001"></uvx-barcode>
</template>
```

## GS1-128

启用 `gs1` 后会自动添加起始 FNC1。可在业务数据中使用 `{FNC1}` 分隔可变长度字段。

```vue
<template>
   <uvx-barcode
      value="01069512345678921726123110ABC123{FNC1}211234"
      :gs1="true"
      :options="options"
   ></uvx-barcode>
</template>

<script lang="uts" setup>
import type { Options } from "@/uni_modules/uvx-ui/components/uvx-barcode/types/index.uts";

// GS1 显示配置
const options = ref<Options>({
   displayText: "(01)06951234567892 (17)261231 (10)ABC123 (21)1234",
   fontSize: 12,
});
</script>
```

## 自定义样式

```vue
<template>
   <uvx-barcode
      value="CUSTOM-128"
      :width="360"
      :height="120"
      :options="options"
   ></uvx-barcode>
</template>

<script lang="uts" setup>
import type { Options } from "@/uni_modules/uvx-ui/components/uvx-barcode/types/index.uts";

// 条形码样式配置
const options = ref<Options>({
   margin: 12,
   quietZone: 12,
   foregroundColor: "#2979ff",
   backgroundColor: "#ffffff",
   textColor: "#303133",
   displayText: "UVX CUSTOM BARCODE",
});
</script>
```

## 手动生成与保存

```vue
<template>
   <uvx-barcode
      ref="barcode"
      :value="value"
      :auto="false"
      @complete="handleComplete"
      @export="handleExport"
      @save="handleSave"
      @error="handleError"
   ></uvx-barcode>
   <uvx-button text="重新生成" @click="remakeBarcode"></uvx-button>
   <uvx-button text="保存条形码" @click="saveBarcode"></uvx-button>
</template>

<script lang="uts" setup>
// 条形码组件实例
const barcode = ref<UvxBarcodeComponentPublicInstance | null>(null);
// 条形码内容
const value = ref("MANUAL-2026-001");

/**
 * 重新生成条形码
 * @returns null
 */
const remakeBarcode = (): void => {
   barcode.value?.remake();
};

/**
 * 保存条形码
 * @returns null
 */
const saveBarcode = (): void => {
   barcode.value?.save();
};

/**
 * 处理生成完成
 * @returns null
 */
const handleComplete = (): void => {
   console.log("条形码生成完成");
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
 * 处理保存完成
 * @param tempFilePath 临时图片路径
 * @returns null
 */
const handleSave = (tempFilePath: string): void => {
   console.log("保存路径", tempFilePath);
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

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `value` | 条形码内容，仅支持 ASCII `0-127` | `string \| number` | `""` | 全部 |
| `gs1` | 是否按 GS1-128 编码起始 FNC1 | `boolean` | `false` | 全部 |
| `options` | 条形码绘制配置 | `Options` | `{}` | 全部 |
| `width` | 组件宽度，数字单位为 px | `string \| number` | `320` | 全部 |
| `height` | 组件高度，数字单位为 px | `string \| number` | `120` | 全部 |
| `start` | 挂载后是否自动生成 | `boolean` | `true` | 全部 |
| `auto` | 内容、尺寸或配置变化后是否自动重绘 | `boolean` | `true` | 全部 |
| `hide` | 是否移出可视区域并保留导出节点 | `boolean` | `false` | 全部 |
| `loading` | 是否显示加载状态 | `boolean` | `false` | 全部 |
| `h5-save-tip` | H5 保存时是否显示长按提示 | `boolean` | `true` | H5 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 根节点外部样式类 | `string` | `""` | 全部 |

### Options

| 字段 | 说明 | 类型 | 默认值 |
| :---: | :---: | :---: | :---: |
| `margin` | 画布内容外边距，单位 px | `number` | `10` |
| `quietZone` | 条形码左右静区，单位为模块数，最小值 `10` | `number` | `10` |
| `showText` | 是否显示底部文字 | `boolean` | `true` |
| `displayText` | 自定义底部文字，空值使用编码内容 | `string` | `""` |
| `fontSize` | 底部文字字号，单位 px | `number` | `16` |
| `textMargin` | 条码与文字间距，单位 px | `number` | `4` |
| `foregroundColor` | 条码颜色 | `string` | `#000000` |
| `backgroundColor` | 画布背景色 | `string` | `#ffffff` |
| `textColor` | 底部文字颜色 | `string` | `#000000` |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `click` | 点击条形码画布 | `UniEvent` | 全部 |
| `change` | 调用 `remake()` 前触发 | - | 全部 |
| `complete` | 条形码绘制完成 | - | 全部 |
| `error` | 生成、导出或保存失败 | `string`，错误信息 | 全部 |
| `export` | 临时图片导出完成 | `string`，临时图片路径 | 全部 |
| `save` | 图片保存到系统相册 | `string`，临时图片路径 | Android、iOS、鸿蒙、微信 |

### Slots

| 插槽 | 说明 | 参数 |
| :---: | :---: | :---: |
| `loading` | 自定义加载内容 | - |
| `h5save` | 自定义 H5 长按保存提示 | `tempFilePath` |

### Methods

| 方法 | 说明 | 返回值 |
| :---: | :---: | :---: |
| `make()` | 生成条形码 | `void` |
| `remake()` | 触发 `change` 后重新生成 | `void` |
| `toTempFilePath()` | 导出 PNG 临时图片 | `void`，结果通过 `export` / `error` 事件返回 |
| `save()` | 保存到系统相册；H5 显示长按保存提示 | `void`，结果通过事件返回 |
| `getInstance()` | 获取当前编码结果、绘制配置与画布指标快照 | `Instance` |

## 参考

- [CODE 128 条形码规范（ISO/IEC 15417）](https://www.iso.org/standard/43896.html)
- [uni-app x Canvas 组件](https://doc.dcloud.net.cn/uni-app-x/component/canvas.html)
- [UniElement.takeSnapshot](https://doc.dcloud.net.cn/uni-app-x/api/dom/unielement.html#takesnapshot)
- [uni.saveImageToPhotosAlbum](https://doc.dcloud.net.cn/uni-app-x/api/save-image-to-photos-album.html)
