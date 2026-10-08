<h5-demo src="pages/form/code-input/code-input" title="CodeInput 验证码输入" />

# CodeInput 验证码输入

`uvx-code-input` 用于短信验证码等定长数字输入，支持方框、横线、圆点、原生键盘和外部自定义键盘。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 方框、横线、圆点和定长输入 | √ | √ | √ | √ | √ |
| 原生数字键盘和输入事件 | √ | √ | √ | √ | √ |
| `adjust-position` 页面上推 | √ | √ | √ | × | √ |
| 禁用原生键盘并由外部值驱动 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. 内部原生输入框固定为 `type="number"`；`disabled-dot=true` 时会移除所有小数点。
2. `model-value` 非空时优先于 `value`，否则回退到 `value`；推荐统一使用 `v-model`。
3. `finish` 在输入长度达到或超过 `maxlength` 时触发；输入值会先截断到最大长度。
4. `disabled-keyboard=true` 时原生输入框被禁用，外部更新绑定值会触发 `change` 和可能的 `finish`，但不会触发 `input` 或 `update:modelValue`。
5. `adjust-position` 仅在源码的 `APP` 与 `MP-WEIXIN` 条件编译中传给原生输入框。

:::

## 基础用法

```vue
<template>
   <uvx-code-input v-model="code"></uvx-code-input>
</template>

<script lang="uts" setup>
// 验证码输入内容
const code = ref("");
</script>
```

## 横线模式

```vue
<uvx-code-input
   v-model="code"
   mode="line"
   :maxlength="4"
   :hairline="true"
></uvx-code-input>
```

## 圆点模式

```vue
<uvx-code-input
   v-model="code"
   :dot="true"
   :maxlength="4"
   :space="0"
></uvx-code-input>
```

## 预置内容和自动聚焦

```vue
<uvx-code-input
   v-model="code"
   :focus="true"
   :maxlength="6"
></uvx-code-input>
```

## 自定义样式

```vue
<uvx-code-input
   v-model="code"
   :size="42"
   :font-size="20"
   :bold="true"
   color="#3c9cff"
   border-color="#3c9cff"
   :space="8"
></uvx-code-input>
```

## 输入完成事件

```vue
<template>
   <uvx-code-input
      v-model="code"
      :maxlength="6"
      @change="handleChange"
      @finish="handleFinish"
   ></uvx-code-input>
</template>

<script lang="uts" setup>
// 验证码输入内容
const code = ref("");

/**
 * 监听输入变化
 * @param value 当前输入值
 * @returns null
 */
const handleChange = (value: string): void => {
   console.log("change", value);
};

/**
 * 监听输入完成
 * @param value 当前输入值
 * @returns null
 */
const handleFinish = (value: string): void => {
   console.log("finish", value);
};
</script>
```

## 自定义键盘模式

```vue
<uvx-code-input
   v-model="code"
   :disabled-keyboard="true"
></uvx-code-input>
```

此模式下由外部键盘修改 `code`，组件只负责显示和完成判断。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `value` | 兼容预置值，`model-value` 为空时生效 | `string \| number` | `""` | 全部 |
| `model-value` | 双向绑定值 | `string \| number` | `""` | 全部 |
| `adjust-position` | 键盘弹起时是否自动上推页面 | `boolean` | `true` | App、微信 |
| `maxlength` | 最大输入长度；无效值回退 `6`，负值按 `0` | `string \| number` | `6` | 全部 |
| `dot` | 是否用圆点替代已输入字符 | `boolean` | `false` | 全部 |
| `mode` | 显示模式 | `box \| line` | `box` | 全部 |
| `hairline` | 方框是否使用 `0.5px` 边框；横线模式使用 `1px` | `boolean` | `false` | 全部 |
| `space` | 输入格间距 | `string \| number` | `10` | 全部 |
| `focus` | 是否请求自动聚焦 | `boolean` | `false` | 全部 |
| `bold` | 字符是否加粗 | `boolean` | `false` | 全部 |
| `color` | 字符、圆点和光标颜色 | `string` | `""` | 全部 |
| `font-size` | 字符字号 | `string \| number` | `18` | 全部 |
| `size` | 每个输入格的宽高 | `string \| number` | `35` | 全部 |
| `disabled-keyboard` | 是否禁用原生输入层 | `boolean` | `false` | 全部 |
| `border-color` | 方框边框或横线颜色 | `string` | `""` | 全部 |
| `disabled-dot` | 是否过滤小数点 | `boolean` | `true` | 全部 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到根节点的外部样式类 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `update:modelValue` | 原生键盘输入时更新绑定值 | `value: string` | 全部 |
| `input` | 原生键盘输入时触发 | `value: string` | 全部 |
| `change` | 规范化后的内容变化时触发 | `value: string` | 全部 |
| `finish` | 内容长度达到 `maxlength` 时触发 | `value: string` | 全部 |

## 参考

- [uni-app x input 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/input.html)

