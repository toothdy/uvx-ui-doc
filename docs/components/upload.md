<h5-demo src="pages/form/upload/upload" title="Upload 上传" />

# Upload 上传

`uvx-upload` 提供图片、视频与文件的选择入口、列表预览和删除操作。文件上传由使用方在 `afterRead` 中执行，并通过 `fileList` 回传状态。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| √ | √ | √ | √ | √ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :--- | :-: | :-: | :-: | :-: | :-: |
| 图片选择、预览与删除 | √ | √ | √ | √ | √ |
| 视频选择与预览 | √ | √ | √ | √ | √ |
| `file`、`all` 文件选择 | × | × | × | √ | √ |
| `media` 图片与视频混选 | × | × | × | × | √ |

::: warning 使用须知

1. 组件只选择文件，不向服务器上传。`afterRead` 返回的文件对象以 `url` 保存临时路径，调用方必须维护 `fileList`。
2. `multiple=false` 时 `afterRead.file` 是单个文件；`multiple=true` 时是数组。视频选择器每次只返回一个视频。
3. `useBeforeRead=true` 时必须调用 `beforeRead` 事件的 `callback(true)` 才会继续读取。`beforeRead` 函数可返回 `false` 阻止读取，或返回文件替换选择结果；也可返回 Promise。
4. 任一文件超过 `maxSize` 时，整批文件只触发 `oversize`，不触发 `afterRead`。
5. `file/all` 仅 H5 与微信小程序可选，`media` 仅微信小程序可选；其他平台会触发 `error`。文件、媒体选择能力还取决于宿主和基础库版本。
6. 删除事件只通知调用方，不会直接修改 `fileList`。预览视频会打开组件内弹层；关闭弹层后停止播放。

:::

## 基础用法

```vue
<template>
   <uvx-upload
      :file-list="files"
      multiple
      :max-count="9"
      @afterRead="handleAfterRead"
      @delete="handleDelete"
   ></uvx-upload>
</template>

<script lang="uts" setup>
import type { UploadFile, UploadReadEvent, UploadDeleteEvent } from "@/uni_modules/uvx-ui/components/uvx-upload/types/index.uts";

const files = ref<UploadFile[]>([]);

const handleAfterRead = (event: UploadReadEvent): void => {
   const selected: UploadFile[] = Array.isArray(event.file) ? event.file : [event.file];
   files.value = files.value.concat(selected);
};

const handleDelete = (event: UploadDeleteEvent): void => {
   files.value = files.value.filter((item: UploadFile, index: number): boolean => index != event.index);
};
</script>
```

实际上传时，在 `handleAfterRead` 中读取 `file.url` 并调用业务接口；上传状态通过 `status`、`message` 回填列表。

## 视频选择

```vue
<uvx-upload
   :file-list="videos"
   accept="video"
   :max-duration="60"
   :preview-full-video="true"
   @afterRead="handleAfterRead"
></uvx-upload>
```

视频缩略块点击后显示弹层播放器。`preview-full-video=false` 时只触发 `clickPreview`。

## 数量与尺寸

```vue
<uvx-upload
   :file-list="files"
   :max-count="2"
   :max-size="2 * 1024 * 1024"
   :width="100"
   :height="100"
   @oversize="handleOversize"
></uvx-upload>
```

列表达到 `max-count` 后隐藏选择入口；超大文件通过 `oversize` 通知使用方。

## 读取前确认

```vue
<uvx-upload
   :file-list="files"
   :use-before-read="true"
   @beforeRead="handleBeforeRead"
   @afterRead="handleAfterRead"
></uvx-upload>
```

`beforeRead` 事件包含 `callback(accepted: boolean)`；异步检查完成后调用 `callback(true)` 放行，调用 `callback(false)` 拒绝。

## 自定义入口

```vue
<uvx-upload :file-list="files" :max-count="1" :width="120" :height="90">
   <image src="/static/upload-placeholder.png" class="upload-entry"></image>
</uvx-upload>
```

默认插槽替换选择按钮；插槽内容的尺寸由使用方设置。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :--- | :--- | :--- | :--- | :--- |
| `accept` | 选择类型：`image`、`video`、`file`、`all`、`media` | `string` | `"image"` | `file/all` 仅 H5、微信；`media` 仅微信 |
| `capture` | 图片、视频来源：`album`、`camera`；字符串按逗号分隔 | `string \| string[]` | `["album", "camera"]` | 图片、视频平台 |
| `compressed` | 视频选择是否压缩，取决于系统 API | `boolean` | `true` | 视频平台 |
| `camera` | 视频拍摄摄像头：`back`、`front` | `string` | `"back"` | 视频平台 |
| `max-duration` | 最长拍摄秒数 | `number` | `60` | 视频、微信媒体 |
| `upload-icon` | 默认入口图标 | `string` | `"camera-fill"` | 全部 |
| `upload-icon-color` | 入口图标颜色；空值跟随图标主题 | `string` | `""` | 全部 |
| `use-before-read` | 启用 `beforeRead` 事件异步确认 | `boolean` | `false` | 全部 |
| `before-read` | 读取前可选回调；可返回布尔值、替换文件或相应 Promise | `function` | 未设置 | 全部 |
| `after-read` | 文件通过校验后的可选回调 | `(file, detail) => void` | 未设置 | 全部 |
| `preview-full-image` | 点击时打开系统图片预览 | `boolean` | `true` | 全部 |
| `preview-full-video` | 点击时打开视频弹层 | `boolean` | `true` | 全部 |
| `max-count` | 文件总数上限；达到后隐藏入口 | `string \| number` | `52` | 全部 |
| `disabled` | 禁止选择文件 | `boolean` | `false` | 全部 |
| `image-mode` | 缩略图裁剪模式 | `Mode` | `"aspectFill"` | 全部 |
| `name` | 事件中的列表标识 | `string` | `""` | 全部 |
| `size-type` | 图片尺寸类型 | `string[]` | `["original", "compressed"]` | 图片平台 |
| `multiple` | 图片、文件、媒体是否多选 | `boolean` | `false` | 对应选择器 |
| `deletable` | 默认显示删除按钮；为 `false` 时单项可设为 `true` | `boolean` | `true` | 全部 |
| `max-size` | 单个文件大小上限，字节 | `string \| number` | `Number.MAX_VALUE` | 全部 |
| `file-list` | 受控文件列表 | `UploadFile[]` | `[]` | 全部 |
| `upload-text` | 默认入口文字 | `string` | `""` | 全部 |
| `width` | 缩略块与默认入口宽度 | `string \| number` | `80` | 全部 |
| `height` | 缩略块与默认入口高度 | `string \| number` | `80` | 全部 |
| `preview-image` | 是否显示已选文件缩略块 | `boolean` | `true` | 全部 |
| `u-style` | 根节点自定义样式字符串 | `string` | `""` | 全部 |
| `u-class` | 根节点外部类名 | `string` | `""` | 全部 |

### FileList Options

| 字段 | 说明 | 类型 | 默认值 | 平台 |
| :--- | :--- | :--- | :--- | :--- |
| `url` | 文件路径，必填 | `string` | 无 | 全部 |
| `thumb` | 缩略图路径；空值使用 `url` | `string` | 无 | 全部 |
| `size` | 文件大小，字节 | `number` | 无 | 全部 |
| `name` | 文件名 | `string` | 无 | 文件选择 |
| `type` | `image`、`video` 或 `file`，也可为系统返回类型 | `string` | 无 | 全部 |
| `status` | `uploading`、`failed`、`success` | `string` | 无 | 全部 |
| `message` | 状态文字 | `string` | 无 | 全部 |
| `deletable` | 组件关闭删除按钮时，单项设为 `true` 仍可显示 | `boolean` | 无 | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :--- | :--- | :--- | :--- |
| `error` | 选择失败或类型不受支持 | `message: string` | 全部 |
| `beforeRead` | 异步读取确认 | `{ file, name, index, callback }` | 全部 |
| `oversize` | 文件超过大小限制 | `{ file, name, index }` | 全部 |
| `afterRead` | 文件通过检查 | `{ file, name, index }` | 全部 |
| `delete` | 请求删除文件 | `{ file, name, index }` | 全部 |
| `clickPreview` | 点击缩略块 | `{ file, name, index }` | 全部 |

### Slots

| 插槽 | 说明 | 平台 |
| :--- | :--- | :--- |
| 默认插槽 | 替换默认选择入口内容 | 全部 |

## 参考

- [uni.chooseImage](https://doc.dcloud.net.cn/uni-app-x/api/choose-image.html)
- [uni.chooseVideo](https://doc.dcloud.net.cn/uni-app-x/api/choose-video.html)
- [uni.chooseFile](https://doc.dcloud.net.cn/uni-app-x/api/choose-file.html)
- [uni.chooseMedia](https://doc.dcloud.net.cn/uni-app-x/api/choose-media.html)
- [uni.previewImage](https://doc.dcloud.net.cn/uni-app-x/api/preview-image.html)
