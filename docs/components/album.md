<h5-demo src="pages/layout/album/album" title="Album 相册" />

# Album 相册

`uvx-album` 以单图或网格形式展示图片，支持字符串和对象数据、完整图片预览、超量提示及宽度回调。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 单图、多图、对象数据和超量提示 | √ | √ | √ | √ | √ |
| 获取图片信息并按比例计算单图尺寸 | √ | √ | √ | √ | √ |
| 点击调用系统图片预览 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. `urls` 项可为字符串或 `UTSJSONObject`。对象数据优先读取 `key-name` 指定字段，未指定或字段不存在时回退读取 `src`。
2. 单图会调用 `uni.getImageInfo` 获取原始尺寸：横图宽度使用 `single-size`，竖图高度使用 `single-size`；失败时回退为容器宽度的 `60%` 或 `single-size`。
3. `max-count` 和 `row-count` 必须为正整数，无效值分别回退为 `9` 和 `3`。
4. 预览会过滤空图片地址，但 `current` 仍准确指向被点击的原始图片。

:::

## 基础用法

```vue
<template>
   <uvx-album :urls="images"></uvx-album>
</template>

<script lang="uts" setup>
const images: string[] = [
   "https://example.com/1.jpg",
   "https://example.com/2.jpg",
];
</script>
```

## 对象数据

```vue
<template>
   <uvx-album :urls="images" key-name="imageUrl"></uvx-album>
</template>

<script lang="uts" setup>
import type { Item } from "@/uni_modules/uvx-ui/components/uvx-album/types/index.uts";

const images: Item[] = [
   { imageUrl: "https://example.com/1.jpg" },
   { imageUrl: "https://example.com/2.jpg" },
];
</script>
```

对象项必须是 `UTSJSONObject`，并通过 `key-name` 指向图片地址字段；如果不设置 `key-name`，组件只会读取对象中的 `src` 字段。

## 单图模式

```vue
<uvx-album
   :urls="singleImage"
   :single-size="220"
   single-mode="aspectFill"
></uvx-album>
```

## 多图布局

```vue
<uvx-album
   :urls="images"
   :multiple-size="80"
   :space="8"
   :row-count="4"
   :radius="6"
   multiple-mode="aspectFill"
></uvx-album>
```

## 最大展示数量

当图片数量超过 `max-count` 且 `show-more=true` 时，最后一张可见图片显示剩余数量遮罩。

```vue
<uvx-album
   :urls="images"
   :max-count="6"
   :show-more="true"
></uvx-album>
```

## 禁止图片预览

```vue
<uvx-album
   :urls="images"
   :preview-full-image="false"
></uvx-album>
```

## 获取相册宽度

`album-width` 在宽度首次计算或变化时触发，可用于让相邻文字与相册宽度一致。

```vue
<uvx-album :urls="images" @album-width="handleAlbumWidth"></uvx-album>
```

```uts
const handleAlbumWidth = (width: number): void => {
   console.log("album width", width);
};
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `urls` | 图片地址或对象数据列表 | `(string \| UTSJSONObject)[]` | `[]` | 全部 |
| `key-name` | 对象数据的图片地址字段；为空时读取 `src` | `string` | `""` | 全部 |
| `single-size` | 单图长边尺寸；无效值回退为 `180` | `string \| number` | `180` | 全部 |
| `multiple-size` | 多图宽高；无效值回退为 `70` | `string \| number` | `70` | 全部 |
| `space` | 图片水平和垂直间距；无效值回退为 `6` | `string \| number` | `6` | 全部 |
| `radius` | 图片及超量遮罩圆角 | `string \| number` | `5` | 全部 |
| `single-mode` | 单图取得原始尺寸后的裁剪模式 | `Mode` | `scaleToFill` | 全部 |
| `multiple-mode` | 多图裁剪模式 | `Mode` | `aspectFill` | 全部 |
| `max-count` | 最大可见图片数；无效值回退为 `9` | `string \| number` | `9` | 全部 |
| `preview-full-image` | 点击是否调用 `uni.previewImage` | `boolean` | `true` | 全部 |
| `row-count` | 每行图片数；无效值回退为 `3` | `string \| number` | `3` | 全部 |
| `show-more` | 是否在最后一张可见图片上显示剩余数量 | `boolean` | `true` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `album-width` | 相册首行宽度首次计算或变化时触发 | `width: number` | 全部 |

## 参考

- [uni.getImageInfo 官方文档](https://doc.dcloud.net.cn/uni-app-x/api/get-image-info.html)
- [uni.previewImage 官方文档](https://doc.dcloud.net.cn/uni-app-x/api/preview-image.html)
