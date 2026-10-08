<h5-demo src="pages/other/line/line" title="Line 线条" />

# Line 线条

`uvx-line` 绘制横向或纵向线条，支持长度、颜色、虚线和细线。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

## 基础用法

```vue
<uvx-line length="100%"></uvx-line>
<uvx-line direction="col" length="48"></uvx-line>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `color` | 线条颜色 | `string` | `#d6d7d9` | 全部 |
| `length` | 线条长度 | `string \| number` | `100%` | 全部 |
| `direction` | 方向 | `row \| col` | `row` | 全部 |
| `hairline` | 是否细线 | `boolean` | `true` | 全部 |
| `margin` | 外边距 | `string \| number` | `0` | 全部 |
| `dashed` | 是否虚线 | `boolean` | `false` | 全部 |
| `u-style` | 自定义样式 | `string` | `""` | 全部 |

## 参考

- [CSS border 官方文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border)
