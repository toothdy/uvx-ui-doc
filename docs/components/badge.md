<h5-demo src="pages/data/badge/badge" title="Badge 徽标数" />

# Badge 徽标数

`uvx-badge` 用于展示未读数量、状态圆点或简短状态，支持数字超限格式、主题、反色和绝对定位。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 数字、文字、圆点和显示控制 | √ | √ | √ | √ | √ |
| 超限格式、主题、形状、反色和定位 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. `value` 为数值 `0` 或可转换为数字的字符串 `"0"` 时默认隐藏，设置 `show-zero=true` 后显示；非数字文本不受此规则影响。
2. `is-dot=true` 时只显示圆点，不渲染 `value`，并且不受零值隐藏规则影响。
3. `number-type="limit"` 不使用 `max`：小于 `1000` 原样显示，`1000-9998` 使用 `k`，`9999` 及以上使用 `w`，最多保留两位且向下截取。
4. `absolute=true` 时组件使用绝对定位；`offset` 第一项为 `top`，第二项为 `right`，仅一项时两者共用。

:::

## 基础用法

```vue
<template>
   <uvx-badge :value="8"></uvx-badge>
   <uvx-badge value="NEW"></uvx-badge>
</template>
```

## 数字显示方式

```vue
<template>
   <uvx-badge :value="1011" :max="999" number-type="overflow"></uvx-badge>
   <uvx-badge :value="1011" :max="999" number-type="ellipsis"></uvx-badge>
   <uvx-badge :value="45187" number-type="limit"></uvx-badge>
</template>
```

以上依次显示 `999+`、`...` 和 `4.51w`。

## 圆点和零值

```vue
<template>
   <uvx-badge :is-dot="true"></uvx-badge>
   <uvx-badge :value="0" :show-zero="true"></uvx-badge>
</template>
```

## 主题和形状

```vue
<template>
   <uvx-badge :value="9" type="primary"></uvx-badge>
   <uvx-badge :value="9" type="success"></uvx-badge>
   <uvx-badge :value="9" type="warning" shape="horn"></uvx-badge>
</template>
```

## 反色样式

`inverted` 移除背景色，并使用主题色显示文字。

```vue
<template>
   <uvx-badge :value="12" type="success" :inverted="true"></uvx-badge>
</template>
```

## 绝对定位

父容器需要提供定位上下文。

```vue
<template>
   <view class="badge-wrapper">
      <uvx-icon name="bell" :size="28"></uvx-icon>
      <uvx-badge
         :value="3"
         :absolute="true"
         :offset="[-4, -6]"
      ></uvx-badge>
   </view>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `is-dot` | 是否只显示圆点 | `boolean` | `false` | 全部 |
| `value` | 徽标内容 | `string \| number` | `""` | 全部 |
| `show` | 是否显示徽标 | `boolean` | `true` | 全部 |
| `max` | `overflow` 和 `ellipsis` 模式的数字上限 | `string \| number` | `999` | 全部 |
| `type` | 主题类型 | `primary \| error \| success \| info \| warning` | `error` | 全部 |
| `show-zero` | 数值为 `0` 时是否显示 | `boolean` | `false` | 全部 |
| `bg-color` | 自定义背景色；反色模式不生效 | `string` | `""` | 全部 |
| `color` | 自定义文字颜色 | `string` | `""` | 全部 |
| `shape` | 徽标形状 | `circle \| horn` | `circle` | 全部 |
| `number-type` | 数字超限显示方式 | `overflow \| ellipsis \| limit` | `overflow` | 全部 |
| `offset` | 绝对定位的 `[top, right]` 偏移 | `(string \| number)[]` | `[]` | 全部 |
| `inverted` | 是否使用透明背景和主题色文字 | `boolean` | `false` | 全部 |
| `absolute` | 是否使用绝对定位 | `boolean` | `false` | 全部 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到根节点的外部样式类 | `string` | `""` | 全部 |

## 参考

- [uni-app x view 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/view.html)

