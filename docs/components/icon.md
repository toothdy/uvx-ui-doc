<h5-demo src="pages/basic/icon/icon" title="Icon 图标" />

# Icon 图标

`uvx-icon` 提供字体图标集，内置 156 个常见场景图标，支持主题配色、图片图标、文字标签与自定义图标库扩展。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

小程序端仅支持微信。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 字体图标、主题色、自定义颜色、标签文字 | √ | √ | √ | √ | √ |
| 图片图标（`name` 传路径或 base64） | √ | √ | √ | √ | √ |
| `click` 点击事件与 `stop` 冒泡控制 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. 图标通过 `name` 传入图标名称（取值见下方图标清单），以字体形式渲染；`name` 含 `/` 或 `data:` base64 图片数据时自动切换为图片渲染，此时 `size` 作为宽高兜底，`width`、`height` 可单独指定。
2. `color` 不传时使用主题文字辅助色（CSS 变量，随暗色模式联动）；传 `primary`、`error` 等主题色名称同样通过类名联动，传任意色值则以内联样式写入，不随暗色模式联动。
3. `size`、`space` 等尺寸传数字时自动补 `px`，传带单位字符串（如 `20px`）原样使用。
4. 点击事件使用 `@click`，回调参数为组件的 `props` 对象；`stop` 为 `true` 时点击会阻止事件冒泡。

:::

## 基础用法

通过 `name` 设置图标，`size` 控制图标大小。

```vue
<template>
   <uvx-icon name="photo" size="30"></uvx-icon>
</template>
```

## 图标颜色

`color` 支持主题色名称与任意颜色值，不传时使用主题默认色。

```vue
<template>
   <view class="icon-list">
      <uvx-icon name="star-fill" color="primary" size="24"></uvx-icon>
      <uvx-icon name="checkmark-circle-fill" color="success" size="24"></uvx-icon>
      <uvx-icon name="heart-fill" color="error" size="24"></uvx-icon>
      <uvx-icon name="photo" color="#2979ff" size="24"></uvx-icon>
   </view>
</template>
```

## 标签文字

`label` 在图标旁追加文字，`label-pos` 控制标签位于 `right`、`bottom`、`top`、`left`，`space` 设置标签与图标的间距。

```vue
<template>
   <view class="icon-list">
      <uvx-icon name="chat" label="消息"></uvx-icon>
      <uvx-icon name="home" label="首页" label-pos="bottom" :space="6"></uvx-icon>
   </view>
</template>
```

## 图片图标

`name` 传入图片路径或 base64 图片数据时按图片渲染，`img-mode` 设置裁剪缩放模式，`width`、`height` 控制尺寸（不传时取 `size`）。

```vue
<template>
   <uvx-icon name="/static/logo.png" width="24" height="24"></uvx-icon>
</template>
```

## 点击事件

通过 `@click` 监听点击，`stop` 为 `true` 时阻止事件冒泡。

```vue
<template>
   <uvx-icon name="setting" size="24" @click="onIconClick"></uvx-icon>
</template>

<script lang="uts" setup>
/**
 * 点击图标回调
 * @param props 组件 props 对象
 */
const onIconClick = (props: UTSJSONObject): void => {
   console.log("点击图标", props);
};
</script>
```

## 加粗与位置微调

`bold` 设置图标粗体，`top` 在垂直方向上偏移图标，用于对齐微调。

```vue
<template>
   <view class="icon-list">
      <uvx-icon name="star" :bold="true" size="24"></uvx-icon>
      <uvx-icon name="level" size="24" :top="4"></uvx-icon>
   </view>
</template>
```

## 自定义样式

`u-style` 传入样式字符串覆盖图标样式，`u-class` 追加自定义类名。

```vue
<template>
   <uvx-icon name="search" size="24" u-style="color: #f90;"></uvx-icon>
</template>
```

## 扩展自定义图标库

把在 iconfont 制作的字体文件改名 `custom-icon.ttf` 放入项目 `static` 目录，然后 `u-prefix` 取一个自定义名字、`name` 传 4 位十六进制码点即可，全端用法一致；`name` 传内置图标名时仍渲染内置图标。详见：[扩展自定义图标库](/guide/custom-icon)。

```vue
<template>
   <uvx-icon u-prefix="myicon" name="e641"></uvx-icon>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `name` | 图标名称，取值见图标清单；含 `/` 或 base64 图片数据时按图片渲染 | `string` | `""` | 全部 |
| `color` | 图标颜色，支持 `primary \| success \| warning \| error \| info \| main \| disabled` 主题色或任意颜色值，空时使用主题默认色 | `string` | `""` | 全部 |
| `size` | 图标大小；数字自动补 `px`，带单位字符串原样使用 | `string \| number` | `16px` | 全部 |
| `bold` | 是否显示粗体 | `boolean` | `false` | 全部 |
| `hover-class` | 图标按下去的样式类，作用在内置 `text` 图标节点上，用法同 view 的 `hover-class` | `string` | `""` | 全部 |
| `u-prefix` | 自定义图标前缀，配合 `static/custom-icon.ttf` 字体扩展图标库，详见 [扩展自定义图标库](/guide/custom-icon) | `string` | `uicon` | 全部 |
| `label` | 图标旁的标签文字 | `string` | `""` | 全部 |
| `label-pos` | 标签相对图标的位置 | `right \| bottom \| top \| left` | `right` | 全部 |
| `label-size` | 标签字体大小；数字自动补 `px` | `string \| number` | `15px` | 全部 |
| `label-color` | 标签文字颜色，空时使用主题默认色 | `string` | `""` | 全部 |
| `space` | 标签与图标的间距 | `string \| number` | `3px` | 全部 |
| `img-mode` | 图片图标的裁剪缩放模式 | `scaleToFill \| aspectFit \| aspectFill \| widthFix \| heightFix` | `aspectFit` | 全部 |
| `width` | 图片图标宽度，`auto` 时取 `size` | `string \| number` | `auto` | 全部 |
| `height` | 图片图标高度，`auto` 时取 `size` | `string \| number` | `auto` | 全部 |
| `top` | 图标垂直方向偏移，用于对齐微调 | `number` | `0` | 全部 |
| `stop` | 点击时是否阻止事件冒泡 | `boolean` | `false` | 全部 |
| `u-style` | 自定义样式，样式字符串，会覆盖组件内同名样式 | `string` | `""` | 全部 |
| `u-class` | 自定义类名 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `click` | 点击图标时触发 | 组件 `props` 对象（`UTSJSONObject`） | 全部 |

## 图标清单

<IconList />

## 参考

- [uni-app x text 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/text.html)
- [uni-app x image 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/image.html)
