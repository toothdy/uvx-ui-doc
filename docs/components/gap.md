<h5-demo src="pages/other/gap/gap" title="Gap 间隔槽" />

# Gap 间隔槽

`uvx-gap` 用于在内容之间插入固定高度的间隔区域。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 高度、上下外边距和背景色 | √ | √ | √ | √ | √ |

## 基础用法

```vue
<uvx-gap height="16"></uvx-gap>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `bg-color` | 背景色 | `string` | `""` | 全部 |
| `height` | 间隔高度 | `string \| number` | `20` | 全部 |
| `margin-top` / `margin-bottom` | 上下外边距 | `string \| number` | `0` / `0` | 全部 |
| `u-style` | 自定义样式 | `string` | `""` | 全部 |

## 参考

- [CSS margin 官方文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin)
