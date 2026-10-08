<h5-demo src="pages/feedback/overlay/overlay" title="Overlay 遮罩层" />

# Overlay 遮罩层

`uvx-overlay` 在页面内容上方显示半透明遮罩，适合配合弹出层、加载状态或自定义浮层使用。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 显示状态、透明度、动画、层级和自定义样式 | √ | √ | √ | √ | √ |
| `click` 点击事件 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. `show` 是受控属性，点击遮罩不会自动关闭；请在 `click` 事件中更新绑定值。
2. 源码默认 `opacity` 为 `0.5`、`duration` 为 `300ms`、`show` 为 `false`。
3. 与浮层组合时，遮罩的 `z-index` 必须低于浮层本身。

:::

## 基础用法

通过 `show` 控制遮罩显示。

```vue
<template>
   <uvx-overlay :show="show"></uvx-overlay>
</template>

<script lang="uts" setup>
const show = ref(true);
</script>
```

## 点击关闭

监听 `click` 事件并将 `show` 设为 `false`，即可实现点击遮罩关闭。

```vue
<template>
   <uvx-overlay :show="show" @click="handleClose"></uvx-overlay>
</template>

<script lang="uts" setup>
const show = ref(true);

const handleClose = (): void => {
   show.value = false;
};
</script>
```

## 自定义透明度与动画

`opacity` 设置遮罩透明度，`duration` 设置显示和隐藏的过渡时长，单位为毫秒。

```vue
<template>
   <uvx-overlay
      :show="show"
      :opacity="0.7"
      :duration="200"
      :z-index="1000"
   ></uvx-overlay>
</template>
```

## 自定义样式

`u-style` 设置遮罩根节点 CSS 字符串，`u-class` 追加外部类名。

```vue
<template>
   <uvx-overlay
      :show="show"
      u-class="custom-overlay"
      u-style="background-color: #000000;"
   ></uvx-overlay>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `show` | 是否显示遮罩 | `boolean` | `false` | 全部 |
| `z-index` | 遮罩层级 | `string \| number` | 全局层级 | 全部 |
| `duration` | 显示和隐藏动画时长，单位 ms | `number` | `300` | 全部 |
| `opacity` | 遮罩透明度 | `string \| number` | `0.5` | 全部 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到根节点的外部样式类 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `click` | 点击遮罩时触发 | - | 全部 |

## 参考

- [uni-app x view 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/view.html)
