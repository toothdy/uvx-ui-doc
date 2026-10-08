<h5-demo src="pages/feedback/tooltip/tooltip" title="Tooltip 长按提示" />

# Tooltip 长按提示

`uvx-tooltip` 长按文本后显示操作气泡，支持复制、自定义按钮、上下方向、透明遮罩和复制结果提示。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 长按触发、上下方向和自动定位 | √ | √ | √ | √ | √ |
| 复制文本与复制结果提示 | √ | √ | √ | √ | √ |
| 扩展按钮和 `click` 事件 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. 组件通过 `longpress` 打开气泡；点击透明遮罩关闭，遮罩是否启用由 `overlay` 控制。
2. `copy-text` 为空时复制 `text`。复制按钮对应 `click` 参数 `0`，扩展按钮从 `1` 开始计数。
3. `direction` 只接受 `top` 或 `bottom`。气泡会根据窗口宽度修正横向位置，避免超出屏幕。
4. 小程序使用 `createSelectorQuery` 测量节点，App 和 H5 使用元素矩形测量；测量失败时组件会立即隐藏气泡。

:::

## 基础用法

```vue
<template>
   <uvx-tooltip text="长按复制这段文字"></uvx-tooltip>
</template>
```

## 自定义复制内容

显示文本与复制内容不同时，使用 `copy-text`。

```vue
<template>
   <uvx-tooltip
      text="订单号：UVX-2026"
      copy-text="UVX-2026"
   ></uvx-tooltip>
</template>
```

## 下方显示

```vue
<template>
   <uvx-tooltip
      text="气泡显示在文字下方"
      direction="bottom"
   ></uvx-tooltip>
</template>
```

## 扩展按钮

```vue
<template>
   <uvx-tooltip
      text="长按显示操作"
      :buttons="buttons"
      @click="handleClick"
   ></uvx-tooltip>
</template>

<script lang="uts" setup>
const buttons: string[] = ["删除", "修改"];

const handleClick = (index: number): void => {
   console.log("button index", index);
};
</script>
```

## 关闭复制和提示

```vue
<template>
   <uvx-tooltip
      text="仅显示扩展操作"
      :buttons="buttons"
      :show-copy="false"
      :show-toast="false"
      :overlay="false"
   ></uvx-tooltip>
</template>

<script lang="uts" setup>
// 扩展按钮文字
const buttons: string[] = ["收藏"];
</script>
```

## 自定义文字

```vue
<template>
   <uvx-tooltip
      text="自定义文字"
      :size="16"
      color="#3c9cff"
      bg-color="#ecf5ff"
      u-class="custom-tooltip"
      u-style="margin-top: 12px;"
   ></uvx-tooltip>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `text` | 触发区域显示文字；`copy-text` 为空时也是复制内容 | `string` | `""` | 全部 |
| `copy-text` | 自定义复制内容 | `string` | `""` | 全部 |
| `size` | 触发文字尺寸，数字按全局缩放换算 | `string \| number` | `14` | 全部 |
| `color` | 触发文字颜色，为空时跟随主题 | `string` | `""` | 全部 |
| `bg-color` | 气泡显示期间触发文字的背景色 | `string` | `""` | 全部 |
| `direction` | 气泡方向 | `top \| bottom` | `top` | 全部 |
| `z-index` | 气泡层级 | `string \| number` | 全局层级 + 71 | 全部 |
| `show-copy` | 是否显示复制按钮 | `boolean` | `true` | 全部 |
| `buttons` | 扩展按钮文字数组 | `string[]` | `[]` | 全部 |
| `overlay` | 显示气泡时是否显示透明遮罩 | `boolean` | `true` | 全部 |
| `show-toast` | 复制后是否显示结果 Toast | `boolean` | `true` | 全部 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到根节点的外部样式类 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `click` | 点击复制或扩展按钮时触发；复制为 `0`，扩展按钮从 `1` 开始 | `index: number` | 全部 |

## 参考

- [uni.setClipboardData 官方文档](https://doc.dcloud.net.cn/uni-app-x/api/set-clipboard-data.html)
- [uni.createSelectorQuery 官方文档](https://doc.dcloud.net.cn/uni-app-x/api/nodes-info.html)
