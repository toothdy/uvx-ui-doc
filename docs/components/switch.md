<h5-demo src="pages/form/switch/switch" title="Switch 开关选择器" />

# Switch 开关选择器

`uvx-switch` 用于在两个互斥状态间切换，支持加载、禁用、自定义值和异步变更。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 双向绑定、加载、禁用和自定义值 | √ | √ | √ | √ | √ |
| 自定义尺寸、颜色、间距和异步变更 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. `model-value` 与 `active-value`、`inactive-value` 的比较同时检查类型和值；例如字符串 `"1"` 与数字 `1` 不相等。
2. `disabled` 或 `loading` 时点击不会触发任何事件。
3. `async-change=false` 时点击依次触发 `input`、`update:modelValue`，下一帧触发 `change`。
4. `async-change=true` 时只触发 `change`，由业务确认后自行更新绑定值。
5. `size` 必须大于 `0`，否则回退为 `25`；`space` 必须大于等于 `0` 且小于尺寸，否则回退为 `0`。

:::

## 基础用法

```vue
<template>
   <uvx-switch v-model="checked" @change="handleChange"></uvx-switch>
</template>

<script lang="uts" setup>
import type { Value } from "@/uni_modules/uvx-ui/components/uvx-switch/types/index.uts";

const checked = ref<boolean>(false);

const handleChange = (value: Value): void => {
   console.log(value);
};
</script>
```

## 加载和禁用

```vue
<template>
   <uvx-switch v-model="checked" :loading="true"></uvx-switch>
   <uvx-switch v-model="checked" :disabled="true"></uvx-switch>
</template>
```

## 自定义值

```vue
<uvx-switch
   v-model="status"
   active-value="enabled"
   inactive-value="disabled"
></uvx-switch>
```

## 异步变更

```vue
<uvx-switch
   v-model="checked"
   :async-change="true"
   @change="handleAsyncChange"
></uvx-switch>
```

```uts
import type { Value } from "@/uni_modules/uvx-ui/components/uvx-switch/types/index.uts";

const checked = ref<boolean>(false);

const handleAsyncChange = (value: Value): void => {
   // 异步确认完成后由业务更新绑定值；自定义 active-value 时请使用对应类型。
   checked.value = value == true;
};
```

## 自定义外观

```vue
<uvx-switch
   v-model="checked"
   :size="28"
   :space="2"
   active-color="#5ac725"
   inactive-color="#c8c9cc"
   u-style="border-color: transparent;"
></uvx-switch>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `model-value` | 双向绑定值 | `string \| number \| boolean` | `false` | 全部 |
| `loading` | 是否显示加载状态并阻止点击 | `boolean` | `false` | 全部 |
| `disabled` | 是否禁用并阻止点击 | `boolean` | `false` | 全部 |
| `size` | 圆点基准尺寸；开关宽度为其两倍加 `2` | `string \| number` | `25` | 全部 |
| `active-color` | 打开状态背景色，为空时使用主色 | `string` | `""` | 全部 |
| `inactive-color` | 关闭状态背景色，为空时使用容器色 | `string` | `""` | 全部 |
| `active-value` | 打开状态对应值 | `string \| number \| boolean` | `true` | 全部 |
| `inactive-value` | 关闭状态对应值 | `string \| number \| boolean` | `false` | 全部 |
| `async-change` | 是否仅通知目标值而不自动更新绑定值 | `boolean` | `false` | 全部 |
| `space` | 圆点与边框的距离 | `string \| number` | `0` | 全部 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到根节点的外部样式类 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `update:modelValue` | 非异步模式点击后更新绑定值 | `Value` | 全部 |
| `input` | 非异步模式点击后触发 | `Value` | 全部 |
| `change` | 点击可用开关后触发，异步模式也会触发 | `Value` | 全部 |

## 参考

- [Vue 双向绑定官方文档](https://cn.vuejs.org/guide/components/v-model.html)
