<h5-demo src="pages/data/empty/empty" title="Empty 内容为空" />

# Empty 内容为空

`uvx-empty` 用于数据为空时展示预置图标、国际化提示文字和可选操作内容。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 预置状态、国际化提示和显示控制 | √ | √ | √ | √ | √ |
| 自定义字体图标、图片和附加内容 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. `text` 为空时根据 `mode` 使用组件国际化文案；`icon` 为空时根据 `mode` 使用预置图标。
2. `icon` 包含 `/`，或同时包含 `data:` 与 `base64` 时按图片渲染；否则按 `uvx-icon` 名称处理。
3. `width` 和 `height` 仅控制自定义图片；字体图标尺寸由 `icon-size` 控制。
4. `show=false` 时根节点不渲染。

:::

## 基础用法

```vue
<uvx-empty mode="data"></uvx-empty>
```

## 预置状态

`mode` 支持 `car`、`page`、`search`、`address`、`wifi-off`、`order`、`coupon`、`favor`、`permission`、`history`、`news`、`message`、`list`、`data` 和 `comment`。

```vue
<template>
   <uvx-empty mode="search"></uvx-empty>
   <uvx-empty mode="order"></uvx-empty>
   <uvx-empty mode="permission"></uvx-empty>
</template>
```

`message` 和 `comment` 使用 `chat` 图标，其余预置状态使用对应的 `empty-{mode}` 图标。

## 自定义图标和文字

```vue
<uvx-empty
   icon="search"
   text="没有匹配内容"
   icon-color="#909399"
   :icon-size="72"
   text-color="#606266"
   :text-size="15"
></uvx-empty>
```

## 自定义图片

```vue
<uvx-empty
   icon="/static/empty.png"
   text="暂无内容"
   :width="120"
   :height="120"
></uvx-empty>
```

## 附加操作

```vue
<uvx-empty mode="car">
   <uvx-button size="small" type="primary" text="查看更多商品"></uvx-button>
</uvx-empty>
```

## 显示和间距

```vue
<uvx-empty
   :show="isEmpty"
   :margin-top="40"
   u-style="padding-bottom: 20px;"
></uvx-empty>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `icon` | 字体图标名、图片路径或 base64 数据；为空时使用预置图标 | `string` | `""` | 全部 |
| `text` | 提示文字；为空时使用预置国际化文案 | `string` | `""` | 全部 |
| `text-color` | 提示文字颜色 | `string` | `#c0c4cc` | 全部 |
| `text-size` | 提示文字大小 | `string \| number` | `14` | 全部 |
| `icon-color` | 字体图标颜色 | `string` | `#c0c4cc` | 全部 |
| `icon-size` | 字体图标大小 | `string \| number` | `90` | 全部 |
| `mode` | 预置空状态 | `Mode` | `data` | 全部 |
| `width` | 自定义图片宽度 | `string \| number` | `160` | 全部 |
| `height` | 自定义图片高度 | `string \| number` | `160` | 全部 |
| `show` | 是否渲染组件 | `boolean` | `true` | 全部 |
| `margin-top` | 与上方内容的距离 | `string \| number` | `0` | 全部 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到根节点的外部样式类 | `string` | `""` | 全部 |

### Slots

| 名称 | 说明 | 平台 |
| :---: | :---: | :---: |
| `default` | 提示文字下方的附加操作内容 | 全部 |

## 参考

- [uni-app x image 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/image.html)
