<h5-demo src="pages/other/read-more/read-more" title="ReadMore 展开阅读更多" />

# ReadMore 展开阅读更多

`uvx-read-more` 折叠超出高度的内容，并提供展开和收起操作。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

## 基础用法

```vue
<template>
   <uvx-read-more :show-height="120" name="article-1" :toggle="true" @open="handleOpen" @close="handleClose">
      <text>较长的内容...</text>
   </uvx-read-more>
</template>

<script lang="uts" setup>
const handleOpen = (name: string | number): void => {
   console.log("open", name);
};

const handleClose = (name: string | number): void => {
   console.log("close", name);
};
</script>
```

`toggle` 默认为 `false`，展开后不会显示收起入口；需要支持再次收起时请显式设置为 `true`。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `show-height` | 折叠时显示高度，单位 px | `string \| number` | `400` | 全部 |
| `toggle` | 展开后是否保留收起入口 | `boolean` | `false` | 全部 |
| `close-text` / `open-text` | 收起和展开文字，为空时使用组件国际化文本 | `string` | `""` | 全部 |
| `color` | 提示文字和图标颜色 | `string` | `""` | 全部 |
| `font-size` | 提示文字大小，单位 px | `string \| number` | `14` | 全部 |
| `shadow-style` | 收起状态切换区域的自定义样式 | `string` | `""` | 全部 |
| `text-indent` | 内容首行缩进 | `string` | `2em` | 全部 |
| `name` | 事件返回标识 | `string \| number` | `""` | 全部 |
| `u-style` / `u-class` | 自定义样式和类名 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 |
| :---: | :---: | :---: |
| `open` / `close` | 展开或收起时触发 | `name: string \| number` |

### Slots

| 名称 | 说明 |
| :---: | :---: |
| `default` | 被折叠的内容 |
| `toggle` | 自定义展开/收起控制区域 |

## 参考

- [Element.getBoundingClientRect](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)
