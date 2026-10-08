<h5-demo src="pages/navigation/tabbar/tabbar" title="Tabbar 底部导航栏" />

# Tabbar 底部导航栏

`uvx-tabbar` 与 `uvx-tabbar-item` 配合实现底部导航栏，支持固定定位、安全区和激活颜色。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

## 基础用法

```vue
<template>
   <uvx-tabbar :value="active" @change="handleChange">
      <uvx-tabbar-item name="home" text="首页" icon="home"></uvx-tabbar-item>
      <uvx-tabbar-item name="mine" text="我的" icon="account"></uvx-tabbar-item>
   </uvx-tabbar>
</template>

<script lang="uts" setup>
const active = ref<string | number>("home");

/**
 * 处理当前项变化
 * @param value 激活项的 name
 * @returns null
 */
const handleChange = (value: string | number): void => {
   active.value = value;
};
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| :---: | :---: | :---: | :---: |
| `value` | 当前激活项的 `name` | `string \| number \| null` | `null` |
| `safe-area-inset-bottom` | 是否适配底部安全区 | `boolean` | `true` |
| `border` | 是否显示边框 | `boolean` | `true` |
| `z-index` | 层级 | `string \| number` | 全局层级配置 |
| `active-color` / `inactive-color` | 激活和未激活颜色 | `string` | `#1989fa` / `#7d7e80` |
| `fixed` / `placeholder` | 是否固定及占位 | `boolean` | `true` / `true` |
| `icon-size` | 子项图标尺寸 | `string \| number` | `20` |
| `u-style` / `u-class` | 自定义样式和类名 | `string` | `""` / `""` |

### Events

| 事件 | 说明 | 参数 |
| :---: | :---: | :---: |
| `change` | 当前项变化 | `string \| number` |

### TabbarItem Props

| 属性 | 说明 | 类型 | 默认值 |
| :---: | :---: | :---: | :---: |
| `name` | 与父组件 `value` 匹配的标识 | `string \| number \| null` | `null` |
| `icon` | 内置图标名或图片路径 | `string` | `""` |
| `icon-size` | 图标尺寸；为空时继承父级 `icon-size` | `string \| number` | `""` |
| `badge` | 右上角徽标内容 | `string \| number \| null` | `null` |
| `dot` | 是否显示圆点徽标 | `boolean` | `false` |
| `text` | 标签文本 | `string` | `""` |
| `badge-style` / `custom-style` | 徽标和子项自定义样式 | `object \| string` | `top: 6px;right:2px;` / `{}` |

## 参考

- [uni-app x tabBar 官方文档](https://doc.dcloud.net.cn/uni-app-x/collocation/pages.html#tabbar)
