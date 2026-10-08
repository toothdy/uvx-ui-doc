<h5-demo src="pages/basic/layout/layout" title="Layout 布局" />

# Layout 布局

`uvx-row` 与 `uvx-col` 组成 12 分栏的栅格布局系统：`uvx-row` 定义行，`uvx-col` 定义列，通过 `span`、`offset`、`gutter`、`justify`、`align` 快速搭建页面行列布局。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

两组件均为纯 view 布局实现，各平台能力一致，无平台专属差异；版本要求与内置 view 组件一致。

::: warning 使用须知

1. `uvx-col` 需放置在 `uvx-row` 内使用。`uvx-row` 通过 `provide` 向下注入行上下文，`uvx-col` 通过 `inject` 读取列间距；`uvx-col` 单独使用时按 12 分栏百分比照常布局，但没有列间距。
2. `gutter` 表示相邻列之间的总间距，单位 px。实现上 `uvx-col` 左右各留 `gutter / 2` 的内边距，`uvx-row` 左右各用 `-gutter / 2` 的外边距抵消首列与末列的多余间距。列在挂载时读取一次，运行期动态修改 `gutter` 不会更新已渲染的列。
3. `uvx-row` 固定 `flex-wrap: wrap`，一行内各列 `span`（含 `offset`）合计超过 12 时自动换行；`offset` 通过 `margin-left` 百分比实现，计算方式与 `span` 相同。
4. `uvx-col` 自身是纵向 flex 容器，其 `justify` 控制列内容的水平排列、`align` 控制列内容的垂直对齐（默认 `stretch` 拉伸），并非控制列在行中的位置；`text-align` 用于控制列内文字水平对齐（当前版本未生效）。微信小程序暂不支持 `uvx-row` 的 `justify` 效果。

:::

## 基础用法

通过 `span` 指定列占据的分栏数，总和为 12 即占满一行。示例中的 `demo-layout` 等类为页面自定义的演示样式。

```vue
<template>
   <view>
      <uvx-row u-style="margin-bottom: 10px;">
         <uvx-col :span="6">
            <view class="demo-layout bg-purple-light"></view>
         </uvx-col>
         <uvx-col :span="6">
            <view class="demo-layout bg-purple"></view>
         </uvx-col>
      </uvx-row>

      <uvx-row>
         <uvx-col :span="4"><view class="demo-layout bg-purple"></view></uvx-col>
         <uvx-col :span="4"><view class="demo-layout bg-purple-light"></view></uvx-col>
         <uvx-col :span="4"><view class="demo-layout bg-purple-dark"></view></uvx-col>
      </uvx-row>
   </view>
</template>
```

## 分栏间隔

通过 `gutter` 设置列间距，列与列之间产生空隙，首列左侧与末列右侧不产生额外间距。

```vue
<template>
   <uvx-row justify="space-between" :gutter="10">
      <uvx-col :span="3"><view class="demo-layout bg-purple"></view></uvx-col>
      <uvx-col :span="3"><view class="demo-layout bg-purple-light"></view></uvx-col>
      <uvx-col :span="3"><view class="demo-layout bg-purple"></view></uvx-col>
      <uvx-col :span="3"><view class="demo-layout bg-purple-light"></view></uvx-col>
   </uvx-row>
</template>
```

## 混合布局

不同 `span` 的列可以在同一行内自由组合，搭配 `gutter` 使用。

```vue
<template>
   <uvx-row justify="space-between" :gutter="10">
      <uvx-col :span="2"><view class="demo-layout bg-purple-light"></view></uvx-col>
      <uvx-col :span="4"><view class="demo-layout bg-purple"></view></uvx-col>
      <uvx-col :span="6"><view class="demo-layout bg-purple-dark"></view></uvx-col>
   </uvx-row>
</template>
```

## 分栏偏移

通过 `offset` 设置列左侧的偏移分栏数，偏移按 12 分栏计算。

```vue
<template>
   <view>
      <uvx-row justify="space-between" u-style="margin-bottom: 10px;">
         <uvx-col :span="3" :offset="3"><view class="demo-layout bg-purple-light"></view></uvx-col>
         <uvx-col :span="3" :offset="3"><view class="demo-layout bg-purple"></view></uvx-col>
      </uvx-row>
      <uvx-row>
         <uvx-col :span="3"><view class="demo-layout bg-purple-light"></view></uvx-col>
         <uvx-col :span="3" :offset="3"><view class="demo-layout bg-purple"></view></uvx-col>
      </uvx-row>
   </view>
</template>
```

## 对齐方式

通过 `justify` 调整行内列的水平分布：`space-between` 两端对齐、中间均分空隙，默认 `flex-start` 时列依次紧挨排列。列内容的垂直对齐通过 `align` 设置，行上支持 `top`、`center`、`bottom`，列上额外支持 `stretch`。

```vue
<template>
   <view>
      <uvx-row justify="space-between" u-style="margin-bottom: 10px;">
         <uvx-col :span="3"><view class="demo-layout bg-purple-light"></view></uvx-col>
         <uvx-col :span="3"><view class="demo-layout bg-purple"></view></uvx-col>
      </uvx-row>
      <uvx-row>
         <uvx-col :span="3"><view class="demo-layout bg-purple-light"></view></uvx-col>
         <uvx-col :span="3"><view class="demo-layout bg-purple"></view></uvx-col>
      </uvx-row>
   </view>
</template>
```

## API

### Row Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `gutter` | 栅格间隔，相邻列间距总宽度，左右各占一半，单位 px | `number` | `0` | 全部 |
| `justify` | 水平排列方式 | `flex-start \| flex-end \| center \| space-around \| space-between` | `flex-start` | 全部 |
| `align` | 垂直对齐方式 | `top \| center \| bottom` | `center` | 全部 |
| `u-style` | 自定义样式，CSS 字符串，优先级高于内置布局样式 | `string` | `""` | 全部 |
| `u-class` | 追加到组件根节点的外部样式类 | `string` | `""` | 全部 |

### Col Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `span` | 栅格占据的列数，总 12 等份 | `number` | `12` | 全部 |
| `offset` | 分栏左侧偏移的列数，计算方式与 `span` 相同 | `number` | `0` | 全部 |
| `justify` | 列内容的水平排列方式 | `flex-start \| flex-end \| center \| space-around \| space-between` | `flex-start` | 全部 |
| `align` | 列内容的垂直对齐方式 | `top \| center \| bottom \| stretch` | `stretch` | 全部 |
| `text-align` | 列内文字水平对齐（当前版本未生效） | `left \| center \| right` | `left` | 全部 |
| `u-style` | 自定义样式，CSS 字符串，优先级高于内置布局样式 | `string` | `""` | 全部 |
| `u-class` | 追加到组件根节点的外部样式类 | `string` | `""` | 全部 |

### Slots

| 组件 | 名称 | 说明 |
| :---: | :---: | :---: |
| `uvx-row` | `default` | 行内容，放置 `uvx-col` |
| `uvx-col` | `default` | 列内容，放置任意元素 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `click` | 点击 `uvx-row` 行时触发 | `event: Event` | 全部 |
| `click` | 点击 `uvx-col` 列时触发 | `event: Event` | 全部 |

## 参考

- [uni-app x view 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/view.html)
