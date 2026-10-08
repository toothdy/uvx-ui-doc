<h5-demo src="pages/layout/cell/cell" title="Cell 单元格" />

# Cell 单元格

`uvx-cell` 提供列表行布局，支持标题、描述、图标、右侧值、跳转和点击；`uvx-cell-group` 用于组织多个单元格并显示分组标题。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 标题、描述、图标、链接和点击事件 | √ | √ | √ | √ | √ |
| 单元格分组、分组标题和顶部边线 | √ | √ | √ | √ | √ |

## 基础用法

```vue
<template>
   <uvx-cell
      title="设置"
      label="系统设置"
      :is-link="true"
      @click="handleClick"
   ></uvx-cell>
</template>

<script lang="uts" setup>
/**
 * 处理单元格点击
 * @param item 单元格属性数据
 * @returns null
 */
const handleClick = (item: UTSJSONObject): void => {
   console.log("点击单元格", item);
};
</script>
```

## 单元格组

`uvx-cell-group` 的默认插槽放置多个 `uvx-cell`。组件不代理子项点击事件，需要交互时仍在对应的 `uvx-cell` 上监听 `click`。

```vue
<template>
   <uvx-cell-group title="账户设置">
      <uvx-cell title="个人资料" :is-link="true"></uvx-cell>
      <uvx-cell title="隐私设置" :is-link="true"></uvx-cell>
   </uvx-cell-group>
</template>
```

## API

### Cell Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `title` / `label` / `value` | 标题、描述和右侧值 | `string \| number` | `""` / `""` / `""` | 全部 |
| `icon` | 左侧图标 | `string` | `""` | 全部 |
| `disabled` / `clickable` | 禁用和是否可点击 | `boolean` | `false` / `false` | 全部 |
| `border` / `center` / `required` | 边框、垂直居中和必填标记 | `boolean` | `true` / `true` / `false` | 全部 |
| `url` / `link-type` | 跳转地址和方式 | `string` / `LinkType` | `""` / `navigateTo` | 全部 |
| `is-link` | 是否显示右侧箭头 | `boolean` | `false` | 全部 |
| `right-icon` / `arrow-direction` | 右侧图标和箭头方向 | `string` / `ArrowDirection` | `arrow-right` / `right` | 全部 |
| `icon-style` / `right-icon-style` / `title-style` | 左图标、右图标和标题样式，CSS 字符串 | `string` | `""` | 全部 |
| `size` | 尺寸 | `large \| normal` | `normal` | 全部 |
| `stop` | 是否阻止点击事件冒泡 | `boolean` | `true` | 全部 |
| `cell-style` | 单元格内容样式，CSS 字符串 | `string` | `""` | 全部 |
| `name` | 点击数据标识，会随 `click` 事件返回 | `string` | `""` | 全部 |
| `u-style` / `u-class` | 自定义样式和类名 | `string` | `""` / `""` | 全部 |

### Cell Events

| 事件 | 说明 | 参数 |
| :---: | :---: | :---: |
| `click` | 点击单元格；禁用时不触发 | `UTSJSONObject` |

### Cell Slots

| 名称 | 说明 |
| :---: | :---: |
| `icon` / `title` / `label` / `value` / `right-icon` | 自定义对应区域 |

### CellGroup Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `title` | 分组标题，空字符串时不显示标题区域 | `string` | `""` | 全部 |
| `border` | 是否显示内容区顶部边线 | `boolean` | `true` | 全部 |
| `title-style` | 分组标题文字样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-style` | 分组根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到分组根节点的外部样式类 | `string` | `""` | 全部 |

### CellGroup Slots

| 名称 | 说明 | 平台 |
| :---: | :---: | :---: |
| `default` | 放置 `uvx-cell` | 全部 |
| `title` | 自定义分组标题；仅在 `title` 非空时渲染 | 全部 |

## 参考

- [uni-app x navigator 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/navigator.html)
