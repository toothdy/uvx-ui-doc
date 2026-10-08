<h5-demo src="pages/basic/image/image" title="Image 图片" />

# Image 图片

`uvx-image` 提供图片常用增强能力：加载与失败占位、形状圆角、宽高自适应、原生懒加载与微信端观察器懒加载。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

小程序端仅支持微信。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 基础显示、形状、圆角、裁剪模式 | √ | √ | √ | √ | √ |
| 加载与失败占位、`loading`/`error` 插槽 | √ | √ | √ | √ | √ |
| `fade` 入场淡入 | √ | √ | √ | √ | √ |
| `lazy-load` 原生懒加载 | 3.9+（默认开启且不可关闭） | 4.11+ | × | √ | √ |
| `observe-lazy-load` 观察器懒加载 | × | × | × | × | √ |
| `show-menu-by-longpress` 长按识别小程序码 | × | × | × | × | √ |
| `webp` 网络图片 WebP 解码 | × | × | × | × | √ |

::: warning 使用须知

1. `width`、`height` 数值默认单位 px。`mode="widthFix"` 时高度由图片比例决定，`mode="heightFix"` 时宽度由图片比例决定；自适应加载完成前，传入的对应边尺寸作为占位最小尺寸，避免布局塌陷。
2. 加载与失败占位默认显示 `loading-icon`、`error-icon` 图标，取值见 `uvx-icon`，也支持图片地址；可通过 `loading`、`error` 插槽完全自定义，`bg-color` 设置占位背景色，默认跟随主题容器色。
3. `observe-lazy-load` 仅微信小程序生效，基于 `uni.createIntersectionObserver`，图片接近视口（底部预留 50px）才开始加载；Web、App 端开启后直接进入原生加载流程。原生 `lazy-load` 只在 page 与 scroll-view 内有效。
4. `show-menu-by-longpress`、`webp` 仅微信小程序有效；Android 平台原生懒加载默认开启且不支持关闭。

:::

## 基础用法

通过 `src` 设置图片地址，加载期间显示占位图标，点击图片区域触发 `click` 事件。

```vue
<template>
   <uvx-image
      :show-loading="true"
      :src="src"
      width="80px"
      height="80px"
      @click="handleClick"
   ></uvx-image>
</template>

<script lang="uts" setup>
const src: string = "https://example.com/image.jpg";

/**
 * 图片点击
 * @returns null
 */
const handleClick = (): void => {
   console.log("点击了图片");
};
</script>
```

## 自定义形状

`shape` 设置图片形状，默认 `square` 方形，`circle` 渲染为圆形。

```vue
<template>
   <uvx-image shape="circle" src="https://example.com/image.jpg" width="80px" height="80px"></uvx-image>
</template>
```

## 自定义圆角

`radius` 设置圆角大小，数值默认单位 px，设置后占位与图片同步裁剪出圆角。

```vue
<template>
<uvx-image radius="4" src="https://example.com/image.jpg" width="80px" height="80px"></uvx-image>
</template>
```

## 图片模式

`mode` 为原生图片裁剪模式，默认 `aspectFill`；`widthFix` 宽度不变、高度随图片比例自适应。

```vue
<template>
   <uvx-image src="https://example.com/image.jpg" width="80px" height="80px" mode="widthFix"></uvx-image>
</template>
```

## 自定义加载插槽

`loading` 插槽在图片加载期间渲染自定义占位内容，示例中将默认图标替换为红色加载图标。

```vue
<template>
   <uvx-image src="https://example.com/image.jpg" width="80px" height="80px" mode="widthFix">
      <template v-slot:loading>
         <uvx-loading-icon color="red"></uvx-loading-icon>
      </template>
   </uvx-image>
</template>
```

## 观察器懒加载

开启 `observe-lazy-load` 后（仅微信小程序），图片滑动到可视范围才发起加载，加载前显示占位内容。

```vue
<template>
   <uvx-image
      src="https://images.xxapi.cn/images/jk/image_448_7033a4a8.jpg"
      width="80px"
      height="80px"
      mode="widthFix"
      :observe-lazy-load="true"
   >
      <template v-slot:loading>
         <uvx-loading-icon color="red"></uvx-loading-icon>
      </template>
   </uvx-image>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `src` | 图片地址 | `string` | `""` | 全部 |
| `mode` | 原生图片裁剪模式，位置模式使用 `top left` 等带空格值 | `scaleToFill \| aspectFit \| aspectFill \| widthFix \| heightFix \| top \| bottom \| center \| left \| right \| top left \| top right \| bottom left \| bottom right` | `aspectFill` | 全部 |
| `width` | 图片宽度，数值默认单位 px；`heightFix` 时由图片比例决定 | `string \| number` | `300` | 全部 |
| `height` | 图片高度，数值默认单位 px；`widthFix` 时由图片比例决定 | `string \| number` | `225` | 全部 |
| `shape` | 图片形状 | `square \| circle` | `square` | 全部 |
| `radius` | 圆角，数值默认单位 px | `string \| number` | `0` | 全部 |
| `lazy-load` | 原生图片懒加载，支持范围随平台变化 | `boolean` | `true` | 全部 |
| `observe-lazy-load` | 观察器懒加载 | `boolean` | `false` | 微信 |
| `show-menu-by-longpress` | 长按图片显示识别小程序码菜单 | `boolean` | `true` | 微信 |
| `loading-icon` | 加载占位图标名称或图片地址，取值见 `uvx-icon` | `string` | `photo` | 全部 |
| `error-icon` | 失败占位图标名称或图片地址，取值见 `uvx-icon` | `string` | `error-circle` | 全部 |
| `show-loading` | 是否显示加载占位 | `boolean` | `true` | 全部 |
| `show-error` | 是否显示失败占位 | `boolean` | `true` | 全部 |
| `fade` | 是否启用组件入场淡入效果 | `boolean` | `true` | 全部 |
| `duration` | 入场淡入时长，单位 ms，`fade` 为 `false` 时不生效 | `number` | `500` | 全部 |
| `bg-color` | 加载与失败占位背景色，默认跟随主题容器色 | `string` | `""` | 全部 |
| `webp` | 微信小程序网络图片是否默认解析 WebP | `boolean` | `false` | 微信 |
| `u-style` | 外层动画容器自定义样式，CSS 字符串 | `string` | `""` | 全部 |

### Slots

| 名称 | 说明 | 平台 |
| :---: | :---: | :---: |
| `loading` | 自定义加载占位内容，由 `show-loading` 控制 | 全部 |
| `error` | 自定义失败占位内容，由 `show-error` 控制 | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `click` | 点击图片区域时触发 | - | 全部 |
| `load` | 图片加载成功时触发 | `UniImageLoadEvent`，detail 包含原图 `width`、`height` | 全部 |
| `error` | 图片加载失败时触发 | `UniImageErrorEvent`，detail.`errMsg` 为错误信息 | 全部 |

## 参考

- [uni-app x image 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/image.html)
- [uni.createIntersectionObserver 官方文档](https://doc.dcloud.net.cn/uni-app-x/api/create-intersection-observer.html)
