<h5-demo src="pages/data/tags/tags" title="Tags 标签" />

# Tags 标签

`uvx-tags` 用于标记内容，支持主题、尺寸、形状、镂空、图标和关闭操作。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 主题、尺寸、形状和镂空 | √ | √ | √ | √ | √ |
| 图标、关闭按钮和显示控制 | √ | √ | √ | √ | √ |
| 点击与关闭事件 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. `disabled` 会阻止 `click` 和 `close` 事件，但仍保持标签显示。
2. `plain-fill` 仅在 `plain=true` 时生效，用于填充主题容器背景。
3. `name` 会原样作为 `click` 和 `close` 的参数返回，适合在列表中区分标签。
4. `closable=true` 时关闭按钮固定显示在标签右上角；组件已处理 App 端默认 `overflow: hidden` 的裁剪问题。

:::

## 基础用法

```vue
<template>
   <uvx-tags text="主要标签" type="primary"></uvx-tags>
   <uvx-tags text="成功标签" type="success"></uvx-tags>
</template>
```

## 尺寸和形状

```vue
<template>
   <uvx-tags text="迷你" size="mini"></uvx-tags>
   <uvx-tags text="普通" size="medium"></uvx-tags>
   <uvx-tags text="大号" size="large"></uvx-tags>
   <uvx-tags text="圆形" shape="circle"></uvx-tags>
</template>
```

## 镂空和填充

```vue
<template>
   <uvx-tags text="镂空标签" type="primary" :plain="true"></uvx-tags>
   <uvx-tags
      text="镂空填充"
      type="success"
      :plain="true"
      :plain-fill="true"
   ></uvx-tags>
</template>
```

## 图标和自定义颜色

```vue
<template>
   <uvx-tags text="收藏" icon="star" type="warning"></uvx-tags>
   <uvx-tags
      text="自定义"
      bg-color="#3c9cff"
      color="#ffffff"
      border-color="#3c9cff"
   ></uvx-tags>
</template>
```

## 关闭和事件

```vue
<template>
   <uvx-tags
      text="可关闭标签"
      name="tag-1"
      :closable="true"
      @click="handleClick"
      @close="handleClose"
   ></uvx-tags>
</template>

<script lang="uts" setup>
const handleClick = (name: string | number): void => {
   console.log("点击标签", name);
};

const handleClose = (name: string | number): void => {
   console.log("关闭标签", name);
};
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `type` | 主题类型 | `primary \| success \| warning \| error \| info` | `primary` | 全部 |
| `disabled` | 是否禁用点击和关闭 | `boolean` | `false` | 全部 |
| `size` | 标签尺寸 | `mini \| medium \| large` | `medium` | 全部 |
| `shape` | 标签形状 | `square \| circle` | `square` | 全部 |
| `text` | 标签文字 | `string \| number` | `""` | 全部 |
| `bg-color` | 自定义背景色 | `string` | `""` | 全部 |
| `color` | 自定义文字色 | `string` | `""` | 全部 |
| `border-color` | 自定义边框色 | `string` | `""` | 全部 |
| `name` | 事件返回的标识 | `string \| number` | `""` | 全部 |
| `plain` | 是否使用镂空样式 | `boolean` | `false` | 全部 |
| `plain-fill` | 镂空时是否填充容器背景 | `boolean` | `false` | 全部 |
| `closable` | 是否在右上角显示关闭按钮 | `boolean` | `false` | 全部 |
| `close-color` | 关闭按钮背景色；为空时使用危险色主题变量 | `string` | `""` | 全部 |
| `show` | 是否显示标签 | `boolean` | `true` | 全部 |
| `icon` | `uvx-icon` 图标名称 | `string` | `""` | 全部 |
| `icon-color` | 图标颜色 | `string` | `""` | 全部 |
| `cell-child` | 是否作为列表单元格子节点 | `boolean` | `false` | 全部 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到根节点的外部样式类 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `click` | 点击标签时触发 | `name: string \| number` | 全部 |
| `close` | 点击关闭按钮时触发 | `name: string \| number` | 全部 |

## 参考

- [uni-app x view 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/view.html)
- [uni-app x text 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/text.html)
