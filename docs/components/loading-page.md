<h5-demo src="pages/data/loading-page/loading-page" title="LoadingPage 加载页" />

# LoadingPage 加载页

`uvx-loading-page` 以固定定位全屏显示加载动画、自定义图片和提示内容，关闭时使用淡出过渡。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 全屏加载、淡入淡出和主题背景 | √ | √ | √ | √ | √ |
| 加载图标、自定义图片和提示插槽 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. 根节点固定覆盖整个窗口，源码层级固定为 `999`；页面中存在更高层级元素时需通过 `u-style` 覆盖。
2. `image` 非空时替换加载图标，图片宽高都使用 `icon-size`，裁剪模式固定为 `aspectFit`。
3. `loading-color` 为空时，加载图标使用 `placeholder` 语义色。
4. 默认插槽会替换提示文字节点，但不会替换加载图标或自定义图片。

:::

## 基础用法

```vue
<uvx-loading-page
   :loading="loading"
   loading-text="正在加载"
></uvx-loading-page>
```

## 加载动画模式

```vue
<uvx-loading-page
   :loading="true"
   loading-mode="spinner"
   :icon-size="32"
   loading-color="primary"
></uvx-loading-page>
```

`loading-mode` 与 `uvx-loading-icon` 一致，支持 `spinner`、`circle` 和 `semicircle`。

## 自定义图片

```vue
<uvx-loading-page
   :loading="true"
   image="/static/logo.jpeg"
   :icon-size="80"
   loading-text="加载中"
></uvx-loading-page>
```

## 自定义背景和文字

```vue
<uvx-loading-page
   :loading="true"
   bg-color="rgba(0, 0, 0, 0.3)"
   color="#eeeeee"
   :font-size="16"
   :duration="200"
></uvx-loading-page>
```

## 自定义提示内容

```vue
<uvx-loading-page :loading="true">
   <uvx-text text="正在初始化，请稍候" type="tips"></uvx-text>
</uvx-loading-page>
```

## 自定义层级

```vue
<uvx-loading-page
   :loading="true"
   u-style="z-index: 10080;"
></uvx-loading-page>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `loading` | 是否显示加载页 | `boolean` | `false` | 全部 |
| `loading-text` | 默认提示内容 | `string \| number` | `""` | 全部 |
| `image` | 替换加载图标的图片地址 | `string` | `""` | 全部 |
| `loading-mode` | 加载动画模式 | `spinner \| circle \| semicircle` | `circle` | 全部 |
| `bg-color` | 全屏背景色 | `string` | `""`（空时使用主题背景色） | 全部 |
| `color` | 默认提示文字颜色 | `string` | `""`（空时使用主题色） | 全部 |
| `font-size` | 默认提示文字大小 | `string \| number` | `18` | 全部 |
| `icon-size` | 加载图标或自定义图片尺寸 | `string \| number` | `28` | 全部 |
| `loading-color` | 加载图标颜色 | `string` | `""`（空时使用主题色） | 全部 |
| `duration` | 显示和隐藏的淡入淡出时长，单位 ms | `string \| number` | `300` | 全部 |
| `u-style` | 全屏根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |

### Slots

| 名称 | 说明 | 平台 |
| :---: | :---: | :---: |
| `default` | 自定义提示内容；使用后替换 `loading-text` 节点 | 全部 |

## 参考

- [uni-app x image 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/image.html)
