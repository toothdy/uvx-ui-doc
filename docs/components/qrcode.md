<h5-demo src="pages/data/qrcode/qrcode" title="QRCode 二维码" />

# QRCode 二维码

`uvx-qrcode` 根据文本内容生成二维码，支持纠错等级、边距、颜色、圆角/圆点风格、中心图片以及组件实例导出和保存。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 4.25+ | 4.25+ | 4.61+ | 4.25+ | 4.41+ |

小程序端仅支持微信。App 端使用原生视图绘制和 `takeSnapshot` 导出，不使用 `canvasToTempFilePath`。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 二维码矩阵、纠错等级、颜色和边距 | √ | √ | √ | √ | √ |
| `make`、`remake`、生成结果事件 | √ | √ | √ | √ | √ |
| `toTempFilePath` | `takeSnapshot` | `takeSnapshot` | `takeSnapshot` | 受运行容器限制 | Canvas 导出 |
| `save` 保存到系统相册 | √ | √ | √ | × | √ |

::: warning 使用须知

1. `value` 为空或生成、导出、保存失败时触发 `error` 事件，参数为错误信息；失败时不会触发对应的成功事件。
2. `hide` 只隐藏视觉内容并保留节点尺寸，适合导出；不要通过父级 `v-if`、`display:none` 或销毁组件隐藏。
3. `auto` 默认为 `true`，监听 `value`、`size` 和 `options` 变化自动重绘；关闭后需调用 `make` 或 `remake`。
4. App 端导出使用 `UniElement.takeSnapshot`，必须在组件已完成生成且节点仍挂载时调用。
5. H5 不支持直接保存到系统相册。调用 `save` 后会生成临时图片，并根据 `h5-save-tip` 显示长按保存提示；图片准备完成时触发 `save` 事件。

:::

## 基础用法

```vue
<template>
   <uvx-qrcode value="https://www.uvxui.cn"></uvx-qrcode>
</template>
```

## 自定义样式

```vue
<template>
   <uvx-qrcode
      value="https://www.uvxui.cn"
      :size="240"
      :options="options"
   ></uvx-qrcode>
</template>

<script lang="uts" setup>
import type { Options } from "@/uni_modules/uvx-ui/components/uvx-qrcode/types/index.uts";

// 二维码高级配置
const options = ref<Options>({
   margin: 8,
   errorCorrectLevel: "Q",
   style: "round",
   foregroundColor: "#3c9cff",
   backgroundColor: "#ffffff",
});
</script>
```

## 手动生成

```vue
<template>
   <uvx-qrcode
      ref="uQrcode"
      value="手动生成二维码"
      :auto="false"
      @complete="handleComplete"
      @error="handleError"
   ></uvx-qrcode>
   <uvx-button text="生成二维码" @click="makeQRCode"></uvx-button>
</template>

<script lang="uts" setup>
// 二维码组件实例
const uQrcode = ref<UvxQrcodeComponentPublicInstance | null>(null);

const makeQRCode = (): void => {
   uQrcode.value?.make();
};

const handleComplete = (): void => {
   uni.showToast({ title: "生成成功", icon: "success" });
};

const handleError = (message: string): void => {
   console.error(message);
   uni.showToast({ title: "生成失败", icon: "none" });
};
</script>
```

## 导出与保存

```vue
<template>
   <uvx-qrcode
      ref="uQrcode"
      value="https://www.uvxui.cn"
      @error="handleError"
      @export="handleExport"
      @save="handleSave"
   ></uvx-qrcode>
   <uvx-button text="导出二维码" @click="exportQRCode"></uvx-button>
   <uvx-button text="保存二维码" @click="saveQRCode"></uvx-button>
</template>

<script lang="uts" setup>
// 二维码组件实例
const uQrcode = ref<UvxQrcodeComponentPublicInstance | null>(null);

const exportQRCode = (): void => {
   uQrcode.value?.toTempFilePath();
};

const saveQRCode = (): void => {
   uQrcode.value?.save();
};

const handleExport = (tempFilePath: string): void => {
   console.log("导出路径", tempFilePath);
};

const handleSave = (_tempFilePath: string): void => {
   uni.showToast({ title: "保存成功", icon: "success" });
};

const handleError = (message: string): void => {
   console.error(message);
   uni.showToast({ title: "操作失败", icon: "none" });
};
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `value` | 二维码内容 | `string \| number` | `""` | 全部 |
| `options` | 二维码高级配置 | `Options` | `{}` | 全部 |
| `size` | 组件尺寸，数字单位为 px | `string \| number` | `200` | 全部 |
| `file-type` | 导出格式 | `"jpg" \| "png"` | `"png"` | Web/微信 |
| `start` | 挂载后自动生成 | `boolean` | `true` | 全部 |
| `auto` | 内容变化后自动重绘 | `boolean` | `true` | 全部 |
| `hide` | 隐藏视觉内容但保留导出节点 | `boolean` | `false` | 全部 |
| `loading` | 是否显示加载状态 | `boolean` | `false` | 全部 |
| `h5-save-tip` | 是否显示保存提示 | `boolean` | `true` | H5 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 根节点外部样式类 | `string` | `""` | 全部 |

### Options

以下字段会参与当前版本的矩阵生成或 Canvas 绘制。`data` 优先于 `text`，二者未提供有效内容时使用组件的 `value`。

| 字段 | 说明 | 类型 | 默认值 |
| :---: | :---: | :---: | :---: |
| `data` | 二维码内容，优先级最高 | `string` | - |
| `text` | `data` 未设置时使用的二维码内容 | `string` | - |
| `typeNumber` | 二维码版本，范围 `1-40`；小于 `1` 时自动选择 | `number` | `0` |
| `errorCorrectLevel` | 纠错等级 | `L \| M \| Q \| H` | `H` |
| `margin` | 二维码内容边距，单位 px | `number` | `0` |
| `areaColor` | 整个画布的底色；设置后内容区域使用 `backgroundColor` | `string` | - |
| `backgroundColor` | 二维码背景色 | `string` | `#ffffff` |
| `foregroundColor` | 二维码前景色 | `string` | `#000000` |
| `style` | 码点样式 | `square \| round \| dot` | `square` |
| `foregroundImageSrc` | 中心图片地址 | `string` | - |
| `foregroundImageWidth` | 中心图片宽度，单位 px | `number` | 内容区域宽度的 `1/4` |
| `foregroundImageHeight` | 中心图片高度，单位 px | `number` | 内容区域高度的 `1/4` |
| `foregroundImageX` | 中心图片横坐标，单位 px | `number` | 水平居中 |
| `foregroundImageY` | 中心图片纵坐标，单位 px | `number` | 垂直居中 |
| `foregroundImagePadding` | 中心图片背景内边距，单位 px | `number` | `0` |
| `foregroundImageBackgroundColor` | 中心图片背景色 | `string` | `#FFFFFF` |
| `foregroundImageBorderRadius` | 中心图片圆角，单位 px | `number` | `0` |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `click` | 点击二维码画布 | `UniEvent` | 全部 |
| `change` | `remake` 调用前触发 | - | 全部 |
| `complete` | 二维码绘制成功 | - | 全部 |
| `error` | 生成、导出或保存失败 | `string`，错误信息 | 全部 |
| `export` | 临时图片导出成功 | `string`，临时文件路径 | 全部 |
| `save` | 保存成功；H5 为临时图片准备完成 | `string`，临时文件路径 | 全部 |

### Slots

| 插槽 | 说明 | 参数 |
| :---: | :---: | :---: |
| `loading` | 生成中内容 | - |
| `h5save` | H5 保存提示内容 | `tempFilePath` |

### Methods

| 方法 | 说明 | 结果事件 |
| :---: | :---: | :---: |
| `make()` | 生成二维码 | `complete` / `error` |
| `remake()` | 触发 `change` 后重新生成 | `change`、`complete` / `error` |
| `toTempFilePath()` | 导出临时图片 | `export` / `error` |
| `save()` | 保存到系统相册；H5 显示长按保存提示 | `save` / `error` |
| `getInstance()` | 获取当前矩阵和配置快照 | 返回 `Instance` |

## 参考

- [uni-app x Canvas 组件](https://doc.dcloud.net.cn/uni-app-x/component/canvas.html)
- [uni.createCanvasContextAsync](https://doc.dcloud.net.cn/uni-app-x/api/create-canvas-context-async.html)
- [UniElement.takeSnapshot](https://doc.dcloud.net.cn/uni-app-x/api/dom/unielement.html#takesnapshot)
- [uni.saveImageToPhotosAlbum](https://doc.dcloud.net.cn/uni-app-x/api/save-image-to-photos-album.html)
