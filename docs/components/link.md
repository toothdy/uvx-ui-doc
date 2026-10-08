<h5-demo src="pages/basic/link/link" title="Link 超链接" />

# Link 超链接

`uvx-link` 渲染为超链接文字：点击后 H5 端新窗口打开链接，App 与小程序端将链接复制到剪贴板并提示。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 4.71+ | 4.71+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 文字、下划线、自定义颜色与样式 | √ | √ | √ | √ | √ |
| `click` 点击事件 | √ | √ | √ | √ | √ |
| 新窗口打开链接 | × | × | × | √ | × |
| 复制链接到剪贴板 | √ | √ | √ | × | √ |

::: warning 使用须知

1. `href` 需携带 `http(s)://` 前缀；为空时点击不跳转也不复制，仅触发 `click` 事件。
2. H5 端通过 `window.open` 新窗口打开链接；App 与小程序端不做页面跳转，点击后将 `href` 复制到剪贴板，并由组件内置的 `uvx-toast` 弹出提示。
3. `mp-tips` 虽以 mp 命名，App 端复制成功后的提示同样由它控制；H5 端无复制提示。
4. `color` 为空时跟随主题主色（`--uvx-primary`）；下划线颜色跟随文字颜色，`line-color` 为预留属性，当前版本尚未生效。
5. `font-size` 纯数字自动追加 `px`，带单位字符串原样使用；行高自动设为字号加 2px（无法解析字号时为 17px）。

:::

## 基础用法

通过 `href` 设置链接地址，`text` 设置显示文字，默认为主题主色，点击后按平台打开或复制链接，同时触发 `click` 事件。

```vue
<template>
   <uvx-link href="https://www.uvxui.cn/" text="打开官网文档" @click="onLinkClick"></uvx-link>
</template>

<script lang="uts" setup>
/**
 * 链接点击回调示例
 */
const onLinkClick = (): void => {
   console.log("link clicked");
};
</script>
```

## 显示下划线

`:under-line="true"` 为文字添加下划线，默认不显示。

```vue
<template>
   <uvx-link href="https://www.uvxui.cn/" :under-line="true" text="打开官网文档"></uvx-link>
</template>
```

## 自定义颜色

`color` 覆盖文字颜色，未设置时跟随主题主色。`line-color` 用于自定义下划线颜色，当前版本尚未生效，下划线颜色跟随文字颜色。

```vue
<template>
   <uvx-link
      href="https://www.uvxui.cn/"
      color="#5ac725"
      line-color="#5ac725"
      text="打开官网文档"
   ></uvx-link>
</template>
```

## 复制链接

App 与小程序端点击后不跳转，而是把 `href` 复制到剪贴板并弹出提示，`mp-tips` 自定义提示文案。以下示例在小程序端展示复制链接，其他平台显示占位文字：

```vue
<template>
   <!-- #ifdef MP -->
   <uvx-link
      href="https://www.uvxui.cn/"
      text="点击复制链接"
      mp-tips="链接已复制，请在浏览器打开"
   ></uvx-link>
   <!-- #endif -->
   <!-- #ifndef MP -->
   <uvx-text type="main" text="请在小程序中体验" size="13px"></uvx-text>
   <!-- #endif -->
</template>
```

## 自定义样式

`u-style` 设置链接节点样式（CSS 字符串），`u-class` 追加外部样式类到组件根节点。

```vue
<template>
   <uvx-link
      href="https://www.uvxui.cn/"
      text="自定义样式链接"
      u-class="my-link"
      u-style="font-size: 18px; font-weight: bold;"
   ></uvx-link>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `color` | 文字颜色，为空时跟随主题主色 | `string` | `""` | 全部 |
| `font-size` | 字体大小；纯数字自动追加 `px`，带单位字符串原样使用 | `string \| number` | `15` | 全部 |
| `under-line` | 是否显示下划线 | `boolean` | `false` | 全部 |
| `href` | 跳转链接，需带 `http(s)://` 前缀 | `string` | `""` | 全部 |
| `mp-tips` | 复制成功后的提示文案，App 与小程序端生效 | `string` | `链接已复制，请在浏览器打开` | 全部 |
| `line-color` | 下划线颜色，预留属性，当前版本未生效 | `string` | `""` | 全部 |
| `text` | 超链接文字 | `string` | `""` | 全部 |
| `u-style` | 链接节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到组件根节点的外部样式类 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `click` | 点击超链接时触发；`href` 为空时同样触发 | - | 全部 |

## 参考

- [uni-app x text 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/text.html)
- [uni.setClipboardData 官方文档](https://doc.dcloud.net.cn/uni-app-x/api/clipboard.html)
