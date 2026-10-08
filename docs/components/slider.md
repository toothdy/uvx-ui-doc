<h5-demo src="pages/form/slider/slider" title="Slider 滑动选择器" />

# Slider 滑动选择器

`uvx-slider` 基于 uni-app x 原生 `slider` 选择范围内数值，支持范围、步长、颜色、数值显示和拖动事件。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 范围、步长、禁用和双向绑定 | √ | √ | √ | √ | √ |
| 轨道、滑块颜色和尺寸 | √ | √ | √ | √ | √ |
| 拖动中与拖动结束事件 | √ | √ | √ | √ | √ |
| `show-value` 文字颜色适配 | × | × | × | √ | √ |

::: warning 使用须知

1. `value` 转为数字后不等于 `0` 时优先于 `model-value`；推荐使用 `v-model`，不要同时传非零 `value`。
2. `max` 小于等于 `min` 时按 `min` 处理；`step` 小于等于 `0` 时回退为 `1`。
3. `block-size` 被限制在 `12-28`。
4. 拖动过程中触发 `input`、`changing` 和 `update:modelValue`；拖动结束触发 `input`、`change` 和 `update:modelValue`。
5. 源码注明 `show-value` 的文字颜色在 App 端无效。

:::

## 基础用法

```vue
<template>
   <uvx-slider v-model="value"></uvx-slider>
</template>

<script lang="uts" setup>
const value = ref<number>(50);
</script>
```

## 自定义范围

```vue
<uvx-slider :model-value="25" :min="0" :max="50"></uvx-slider>
```

## 指定步长

```vue
<uvx-slider :model-value="50" :step="5" :show-value="true"></uvx-slider>
```

## 自定义样式

```vue
<uvx-slider
   v-model="value"
   active-color="#5ac725"
   background-color="#c8c9cc"
   block-color="#ffffff"
   :block-size="24"
></uvx-slider>
```

```vue
<script lang="uts" setup>
const value = ref<number>(50);

const handleChanging = (nextValue: number): void => {
   value.value = nextValue;
};

const handleChange = (nextValue: number): void => {
   value.value = nextValue;
};
</script>
```

## 监听拖动

```vue
<uvx-slider
   v-model="value"
   @changing="handleChanging"
   @change="handleChange"
></uvx-slider>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `value` | 兼容当前值，非零时优先于 `model-value` | `string \| number` | `0` | 全部 |
| `model-value` | 双向绑定值 | `string \| number` | `0` | 全部 |
| `min` | 最小值 | `string \| number` | `0` | 全部 |
| `max` | 最大值，不得小于等于最小值 | `string \| number` | `100` | 全部 |
| `step` | 步长，必须大于 `0` | `string \| number` | `1` | 全部 |
| `active-color` | 已选择轨道颜色 | `string` | `""` | 全部 |
| `background-color` | 未选择轨道颜色 | `string` | `""` | 全部 |
| `block-size` | 滑块尺寸，限制在 `12-28` | `string \| number` | `18` | 全部 |
| `block-color` | 滑块颜色 | `string` | `""` | 全部 |
| `show-value` | 是否显示当前值 | `boolean` | `false` | 全部 |
| `disabled` | 是否禁用 | `boolean` | `false` | 全部 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到根节点的外部样式类 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `update:modelValue` | 拖动中和拖动结束时更新绑定值 | `value: number` | 全部 |
| `input` | 拖动中和拖动结束时触发 | `value: number` | 全部 |
| `changing` | 拖动过程中触发 | `value: number` | 全部 |
| `change` | 拖动结束时触发 | `value: number` | 全部 |

## 参考

- [uni-app x slider 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/slider.html)
