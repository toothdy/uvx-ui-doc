<h5-demo src="pages/other/divider/divider" title="Divider 分割线" />

# Divider 分割线

`uvx-divider` 展示横向分割线，支持虚线、细线、圆点、文字位置和点击事件。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 分割线、文字、虚线、细线和圆点 | √ | √ | √ | √ | √ |
| 点击事件和自定义样式 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. `dot=true` 时显示圆点样式；`text` 非空时显示文字。
2. `hairline=true` 使用细边框；`dashed=true` 使用虚线。

:::

## 基础用法

```vue
<uvx-divider></uvx-divider>
<uvx-divider text="分割文字" text-position="center"></uvx-divider>
```

## 样式和点击

```vue
<uvx-divider dashed :hairline="true" line-color="#3c9cff" @click="handleClick"></uvx-divider>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `dashed` | 是否虚线 | `boolean` | `false` | 全部 |
| `hairline` | 是否细线 | `boolean` | `true` | 全部 |
| `dot` | 是否圆点样式 | `boolean` | `false` | 全部 |
| `text-position` | 文字位置 | `left \| center \| right` | `center` | 全部 |
| `text` | 分割文字 | `string \| number` | `""` | 全部 |
| `text-size` / `text-color` | 文字尺寸和颜色 | `string \| number` / `string` | `14` / `#909399` | 全部 |
| `line-color` | 线条颜色 | `string` | `#dcdfe6` | 全部 |
| `u-style` / `u-class` | 自定义样式和类名 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 |
| :---: | :---: | :---: |
| `click` | 点击分割线或文字 | - |

## 参考

- [uni-app x view 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/view.html)
