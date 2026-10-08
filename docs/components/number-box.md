<h5-demo src="pages/form/number-box/number-box" title="NumberBox 步进器" />

# NumberBox 步进器

`uvx-number-box` 用于数值加减和输入，支持范围、步长、整数、小数位、长按、异步变更和按钮插槽。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 加减、输入、范围、步长和小数格式 | √ | √ | √ | √ | √ |
| 长按连续操作、异步变更和边界事件 | √ | √ | √ | √ | √ |
| 加减按钮与输入框插槽 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. 所有值都会先过滤非数字字符，再限制到 `min-max`；`integer=true` 时移除小数部分。
2. `decimal-length` 非空时使用 `toFixed` 返回字符串，因此 `v-model` 可能从数字变为字符串。
3. `async-change=true` 时不会触发 `input` 和 `update:modelValue`，但仍触发包含目标值的 `change`。
4. 长按 `600ms` 后执行一次，此后每 `250ms` 连续加减；`long-press=false` 只关闭连续操作，不影响普通点击。
5. 达到边界、整体禁用或单独禁用按钮时触发 `overlimit`，不会触发 `plus`、`minus` 或数值变化事件。

:::

## 基础用法

```vue
<template>
   <uvx-number-box v-model="value" @change="handleChange"></uvx-number-box>
</template>

<script lang="uts" setup>
import type { ChangeDetail } from "@/uni_modules/uvx-ui/components/uvx-number-box/types/index.uts";

const value = ref<number>(1);

const handleChange = (detail: ChangeDetail): void => {
   console.log(detail.value);
};
</script>
```

## 范围和步长

```vue
<uvx-number-box
   :model-value="1"
   :min="1"
   :max="10"
   :step="2"
></uvx-number-box>
```

## 整数和小数位

```vue
<template>
   <uvx-number-box :model-value="2" :integer="true"></uvx-number-box>
   <uvx-number-box :model-value="2.5" :decimal-length="2"></uvx-number-box>
</template>
```

## 禁用控制

```vue
<template>
   <uvx-number-box :model-value="1" :disabled="true"></uvx-number-box>
   <uvx-number-box :model-value="1" :disabled-input="true"></uvx-number-box>
   <uvx-number-box :model-value="1" :disable-minus="true"></uvx-number-box>
</template>
```

## 异步变更

```vue
<uvx-number-box
   v-model="value"
   :async-change="true"
   @change="handleAsyncChange"
></uvx-number-box>
```

```uts
import type { ChangeDetail } from "@/uni_modules/uvx-ui/components/uvx-number-box/types/index.uts";

const value = ref<number>(1);

const handleAsyncChange = (detail: ChangeDetail): void => {
   // 请求完成后由业务更新绑定值。
   value.value = detail.value;
};
```

## 自定义外观

```vue
<uvx-number-box
   :model-value="1"
   :input-width="48"
   :button-size="36"
   color="#ffffff"
   bg-color="#2979ff"
   icon-style="font-size: 14px;"
></uvx-number-box>
```

## 自定义按钮

```vue
<uvx-number-box :model-value="1">
   <template #minus><uvx-icon name="minus" :size="12"></uvx-icon></template>
   <template #plus><uvx-icon name="plus" :size="12"></uvx-icon></template>
</uvx-number-box>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `model-value` | 双向绑定值 | `string \| number` | `0` | 全部 |
| `name` | 事件数据中的步进器标识 | `string \| number` | `""` | 全部 |
| `min` | 最小值 | `string \| number` | `1` | 全部 |
| `max` | 最大值 | `string \| number` | `Number.MAX_SAFE_INTEGER` | 全部 |
| `step` | 每次加减步长 | `string \| number` | `1` | 全部 |
| `integer` | 是否只允许整数 | `boolean` | `false` | 全部 |
| `disabled` | 是否禁用整个步进器 | `boolean` | `false` | 全部 |
| `disabled-input` | 是否只禁用输入框 | `boolean` | `false` | 全部 |
| `async-change` | 是否由外部异步更新绑定值 | `boolean` | `false` | 全部 |
| `input-width` | 输入框宽度 | `string \| number` | `35` | 全部 |
| `show-minus` / `show-plus` | 是否显示减少/增加按钮 | `boolean` | `true` | 全部 |
| `decimal-length` | 固定小数位数；`null` 不固定 | `string \| number \| null` | `null` | 全部 |
| `long-press` | 是否启用长按连续加减 | `boolean` | `true` | 全部 |
| `color` | 输入文字和按钮图标颜色 | `string` | `""` | 全部 |
| `button-size` | 按钮宽高及输入框高度 | `string \| number` | `30` | 全部 |
| `bg-color` | 可用按钮和输入框背景色 | `string` | `""` | 全部 |
| `cursor-spacing` | 输入框光标与键盘的距离 | `string \| number` | `100` | 全部 |
| `disable-plus` / `disable-minus` | 是否单独禁用增加/减少按钮 | `boolean` | `false` | 全部 |
| `icon-style` | 默认加减图标样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到根节点的外部样式类 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `update:modelValue` | 非异步模式数值变化时更新绑定值 | `Value` | 全部 |
| `input` | 非异步模式数值变化时触发 | `Value` | 全部 |
| `change` | 数值变化时触发 | `ChangeDetail` | 全部 |
| `focus` | 输入框聚焦时触发 | `FocusDetail` | 全部 |
| `blur` | 输入框失焦时触发，`value` 为失焦前原始文字 | `BlurDetail` | 全部 |
| `overlimit` | 达到边界或按钮不可用时触发 | `plus \| minus` | 全部 |
| `plus` / `minus` | 有效增加/减少后触发 | - | 全部 |

### Slots

| 名称 | 说明 | 平台 |
| :---: | :---: | :---: |
| `minus` | 自定义减少按钮内容 | 全部 |
| `input` | 替换原生数值输入框 | 全部 |
| `plus` | 自定义增加按钮内容 | 全部 |

### ChangeDetail

| 字段 | 说明 | 类型 |
| :---: | :---: | :---: |
| `value` | 格式化后的目标值 | `string \| number` |
| `name` | 组件标识 | `string \| number` |

## 参考

- [uni-app x input 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/input.html)
