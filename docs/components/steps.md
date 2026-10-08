<h5-demo src="pages/navigation/steps/steps" title="Steps 步骤条" />

# Steps 步骤条

`uvx-steps` 与 `uvx-steps-item` 用于展示任务进度，支持横向、竖向、圆点、图标及错误状态。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

小程序端仅支持微信。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 横向与竖向排列 | √ | √ | √ | √ | √ |
| 数字、圆点、自定义图标与错误状态 | √ | √ | √ | √ | √ |
| 自定义颜色与根节点样式 | √ | √ | √ | √ | √ |
| 步骤项 `icon`、`title`、`desc` 插槽 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. `uvx-steps-item` 必须放在 `uvx-steps` 内。`current` 从 `0` 开始计数，默认 `0`；非数字值按 `0` 处理。
2. `direction` 默认 `row`；设置为 `column` 时步骤项从上到下排列。组件不处理点击，也不自动改变 `current`。
3. `dot=true` 时优先显示圆点；传入图标名称时，图标替换默认数字圆圈。`icon` 插槽优先于上述两种标记。
4. `active-color`、`inactive-color` 默认跟随主题；显式指定后采用固定颜色。`error=true` 使用主题错误色。
5. `u-style` 接收 CSS 样式字符串，`u-class` 接收外部类名；两者默认空字符串。子项上的同名属性只作用于该子项。

:::

## 基础用法

将 `uvx-steps-item` 作为默认插槽内容，通过 `current` 标出当前步骤。

```vue
<template>
   <uvx-steps :current="1">
      <uvx-steps-item title="已下单" desc="10:30"></uvx-steps-item>
      <uvx-steps-item title="已出库" desc="10:35"></uvx-steps-item>
      <uvx-steps-item title="运输中" desc="11:40"></uvx-steps-item>
   </uvx-steps>
</template>
```

## 圆点样式

`dot` 将默认数字标记改为圆点，也可以与竖向排列组合使用。

```vue
<template>
   <uvx-steps :current="1" :dot="true" direction="column">
      <uvx-steps-item title="已下单" desc="10:30"></uvx-steps-item>
      <uvx-steps-item title="已出库" desc="10:35"></uvx-steps-item>
      <uvx-steps-item title="运输中" desc="11:40"></uvx-steps-item>
   </uvx-steps>
</template>
```

## 错误状态

在对应步骤项设置 `error`，该项的标记显示为错误色和关闭图标。

```vue
<template>
   <uvx-steps :current="1">
      <uvx-steps-item title="已下单"></uvx-steps-item>
      <uvx-steps-item title="处理失败" :error="true"></uvx-steps-item>
      <uvx-steps-item title="待完成"></uvx-steps-item>
   </uvx-steps>
</template>
```

## 自定义图标

`active-icon` 与 `inactive-icon` 接收 `uvx-icon` 的图标名称，`icon-size` 由各步骤项控制。

```vue
<template>
   <uvx-steps :current="1" active-icon="checkmark" inactive-icon="arrow-right">
      <uvx-steps-item title="已下单" :icon-size="17"></uvx-steps-item>
      <uvx-steps-item title="已出库"></uvx-steps-item>
      <uvx-steps-item title="运输中"></uvx-steps-item>
   </uvx-steps>
</template>
```

## 自定义插槽

步骤项提供 `icon`、`title`、`desc` 三个插槽，分别替换默认标记、标题和说明。

```vue
<template>
   <uvx-steps :current="1">
      <uvx-steps-item title="已下单"></uvx-steps-item>
      <uvx-steps-item title="已出库"></uvx-steps-item>
      <uvx-steps-item title="运输中">
         <template #icon><text>运</text></template>
         <template #title><text>运输中</text></template>
         <template #desc><text>预计今天送达</text></template>
      </uvx-steps-item>
   </uvx-steps>
</template>
```

## 自定义颜色

设置 `active-color` 和 `inactive-color` 后，标记与连接线采用对应颜色。

```vue
<template>
   <uvx-steps :current="1" active-color="#3c9cff" inactive-color="#969799">
      <uvx-steps-item title="已下单"></uvx-steps-item>
      <uvx-steps-item title="已出库"></uvx-steps-item>
      <uvx-steps-item title="运输中"></uvx-steps-item>
   </uvx-steps>
</template>
```

## API

### Steps Props

| 属性 | 说明 | 类型 | 默认值 | 平台与限制 |
| :- | :- | :- | :- | :- |
| `direction` | 排列方向 | `"row" \| "column"` | `"row"` | 全平台 |
| `current` | 当前步骤索引，从 0 开始 | `string \| number` | `0` | 全平台；非数字值按 0 处理 |
| `active-color` | 已激活标记与连接线颜色 | `string` | `""` | 全平台；空值跟随主题 |
| `inactive-color` | 未激活标记与连接线颜色 | `string` | `""` | 全平台；空值跟随主题 |
| `active-icon` | 已激活图标名称 | `string` | `""` | 全平台；使用 `uvx-icon` 图标 |
| `inactive-icon` | 未激活图标名称 | `string` | `""` | 全平台；使用 `uvx-icon` 图标 |
| `dot` | 使用圆点标记 | `boolean` | `false` | 全平台；优先于图标名称 |
| `u-style` | 根节点自定义样式 | `string` | `""` | 全平台；CSS 样式字符串 |
| `u-class` | 根节点自定义类名 | `string` | `""` | 全平台 |

### StepsItem Props

| 属性 | 说明 | 类型 | 默认值 | 平台与限制 |
| :- | :- | :- | :- | :- |
| `title` | 标题 | `string \| number` | `""` | 全平台 |
| `desc` | 说明 | `string \| number` | `""` | 全平台 |
| `icon-size` | 自定义图标大小 | `string \| number` | `17` | 全平台；单位 px |
| `error` | 错误状态 | `boolean` | `false` | 全平台；标记使用主题错误色 |
| `u-style` | 子项根节点自定义样式 | `string` | `""` | 全平台；CSS 样式字符串 |
| `u-class` | 子项根节点自定义类名 | `string` | `""` | 全平台 |

### Slots

| 组件 | 插槽 | 说明 | 平台与限制 |
| :- | :- | :- | :- |
| `uvx-steps` | default | 放置步骤项 | 全平台；使用 `uvx-steps-item` |
| `uvx-steps-item` | icon | 替换步骤标记 | 全平台；建议将内容限制在 20px 左右 |
| `uvx-steps-item` | title | 替换标题 | 全平台 |
| `uvx-steps-item` | desc | 替换说明 | 全平台 |

### Events

组件不派发事件，当前步骤由使用方通过 `current` 控制。

## 参考

- [uni-app x 组件与样式](https://doc.dcloud.net.cn/uni-app-x/component/)
- [uni-app x UTS 语法](https://doc.dcloud.net.cn/uni-app-x/uts/)
