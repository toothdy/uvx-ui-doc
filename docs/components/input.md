<h5-demo src="pages/form/input/input" title="Input 输入框" />

# Input 输入框

`uvx-input` 提供双向绑定、输入类型、可清空、密码、前后图标与插槽、输入格式化和多种边框形状。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

小程序端仅支持微信。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 输入、双向绑定、可清空、禁用、只读、格式化 | √ | √ | √ | √ | √ |
| 边框、形状、前后图标与插槽 | √ | √ | √ | √ | √ |
| `safe-password`、`nickname` 输入类型 | × | × | × | × | √ |
| `cursor-spacing` 光标与键盘的距离 | √ | √ | × | × | √ |
| `adjust-position` 键盘弹出时上推页面 | √ | √ | √ | × | √ |
| `hold-keyboard` 点击页面时保持键盘 | √ | √ | √ | × | √ |
| `keyboardheightchange` 键盘高度变化事件 | √ | √ | √ | × | √ |

::: warning 使用须知

1. 通过 `v-model` 绑定输入内容，事件回传值统一为字符串，一次输入会同时触发 `update:modelValue`、`input`、`change`。`value` 作为兼容属性，仅在 `v-model` 为空时生效。
2. `type` 支持 `text`、`number`、`idcard`、`digit`、`tel`、`email`、`url`、`none`、`password`；`safe-password` 与 `nickname` 仅微信小程序有效，其他平台按 `text` 处理。`password` 属性或 `type="password"` 均进入密码模式。
3. `clearable` 在聚焦且内容非空时显示清除按钮，`disabled`、`readonly` 状态下不显示。失焦后清除按钮延迟隐藏，保证先失焦再点击清除的操作可以完成。
4. `readonly` 只禁止编辑，不改变背景色；`disabled` 使用禁用背景色，可通过 `disabled-color` 覆盖。
5. 输入格式化通过 `formatter` 属性传入，或通过组件实例调用 `setFormatter` 方法设置，实例方法优先。格式化值与原值不同时，输入框先展示原值，再在下一帧替换为格式化值。
6. 鸿蒙端 Vapor 模式下 `hold-keyboard` 不生效。

:::

## 基础用法

通过 `v-model` 绑定输入内容，`placeholder` 设置占位文字，`@change` 监听内容变化。

```vue
<template>
   <uvx-input v-model="value" placeholder="请输入内容" @change="handleChange"></uvx-input>
</template>

<script lang="uts" setup>
// 双向绑定的输入内容
const value = ref("内容");

/**
 * 监听输入内容变化
 * @param value 当前输入内容
 */
const handleChange = (value: string): void => {
   console.log("输入内容：", value);
};
</script>
```

## 可清空

`clearable` 开启后，聚焦且有内容时显示清除按钮，点击后清空输入内容。

```vue
<template>
   <uvx-input placeholder="请输入内容" clearable></uvx-input>
</template>
```

## 输入类型

`type` 设置输入类型，`type="number"` 唤起数字键盘；`password` 隐藏输入内容。

```vue
<template>
   <uvx-input placeholder="请输入内容" type="number" clearable></uvx-input>
   <uvx-input placeholder="请输入内容" password></uvx-input>
</template>
```

## 边框与形状

`border="bottom"` 使用下划线边框；`shape="circle"` 使用胶囊圆角。

```vue
<template>
   <uvx-input placeholder="请输入内容" border="bottom" clearable></uvx-input>
   <uvx-input placeholder="请输入内容" shape="circle"></uvx-input>
</template>
```

## 禁用状态

`disabled` 使用禁用背景色并阻止输入。

```vue
<template>
   <uvx-input placeholder="禁用状态" disabled></uvx-input>
</template>
```

## 前后图标

`prefix-icon`、`suffix-icon` 设置前后图标，取值为 `uvx-icon` 图标名称；`prefix-icon-style`、`suffix-icon-style` 设置图标样式。

```vue
<template>
   <uvx-input
      placeholder="前置图标"
      prefix-icon="search"
      prefix-icon-style="color: #909399"
   ></uvx-input>
   <uvx-input
      placeholder="后置图标"
      suffix-icon="map-fill"
      suffix-icon-style="color: #909399"
   ></uvx-input>
</template>
```

## 前后插槽

`prefix` 插槽插入在前置图标之后，`suffix` 插槽插入在后置图标之前，用于放置文字、按钮等内容。

```vue
<template>
   <uvx-input placeholder="前置插槽">
      <template #prefix>
         <uvx-text
            type="main"
            text="http://"
            margin="0 3px 0 0"
            u-style="flex: none; width: auto;"
         ></uvx-text>
      </template>
   </uvx-input>
   <uvx-input placeholder="后置插槽">
      <template #suffix>
         <uvx-button text="获取验证码" type="success" size="mini"></uvx-button>
      </template>
   </uvx-input>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `v-model` | 绑定的输入内容，优先级高于 `value` | `string \| number` | `""` | 全部 |
| `value` | 输入框内容，`v-model` 为空时生效 | `string \| number` | `""` | 全部 |
| `type` | 输入类型 | `text \| number \| idcard \| digit \| tel \| email \| url \| none \| safe-password \| nickname \| password` | `text` | 全部 |
| `disabled` | 是否禁用 | `boolean` | `false` | 全部 |
| `disabled-color` | 禁用时的背景色 | `string` | `""` | 全部 |
| `clearable` | 聚焦且有内容时显示清除按钮 | `boolean` | `false` | 全部 |
| `password` | 是否使用密码模式 | `boolean` | `false` | 全部 |
| `maxlength` | 最大输入长度，`-1` 表示不限制 | `number` | `-1` | 全部 |
| `placeholder` | 占位文字 | `string` | `""` | 全部 |
| `placeholder-class` | 占位文字样式类 | `string` | `uvx-input-placeholder` | 全部 |
| `placeholder-style` | 占位文字内联样式 | `string` | `""` | 全部 |
| `confirm-type` | 键盘确认按钮类型 | `send \| search \| next \| go \| done` | `done` | 全部 |
| `confirm-hold` | 点击键盘确认按钮后是否保持键盘 | `boolean` | `false` | 全部 |
| `hold-keyboard` | 点击页面时是否保持键盘 | `boolean` | `false` | App、微信 |
| `focus` | 是否自动聚焦 | `boolean` | `false` | 全部 |
| `cursor` | 指定光标位置，`-1` 表示不指定 | `number` | `-1` | 全部 |
| `cursor-spacing` | 光标与键盘的距离，单位 px | `number` | `30` | Android、iOS、微信 |
| `selection-start` | 光标起始位置 | `number` | `-1` | 全部 |
| `selection-end` | 光标结束位置 | `number` | `-1` | 全部 |
| `adjust-position` | 键盘弹出时是否上推页面 | `boolean` | `true` | App、微信 |
| `input-align` | 输入框内容对齐方式 | `left \| center \| right` | `left` | 全部 |
| `font-size` | 字体大小，数字自动补 `px` | `string \| number` | `14` | 全部 |
| `color` | 文字颜色，空时随暗色模式取默认色 | `string` | `""` | 全部 |
| `prefix-icon` | 前置图标名称，取值见 `uvx-icon` | `string` | `""` | 全部 |
| `prefix-icon-style` | 前置图标样式，CSS 字符串 | `string` | `""` | 全部 |
| `suffix-icon` | 后置图标名称，取值见 `uvx-icon` | `string` | `""` | 全部 |
| `suffix-icon-style` | 后置图标样式，CSS 字符串 | `string` | `""` | 全部 |
| `border` | 边框样式 | `surround \| bottom \| none` | `surround` | 全部 |
| `readonly` | 是否只读，禁止编辑但不改变背景色 | `boolean` | `false` | 全部 |
| `shape` | 输入框形状 | `square \| circle` | `square` | 全部 |
| `formatter` | 输入格式化函数 | `(value: string) => string` | `-` | 全部 |
| `u-style` | 输入框根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到输入框根节点的外部样式类 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `update:modelValue` | 输入内容变化时更新绑定值 | `value: string` | 全部 |
| `input` | 输入内容变化时触发 | `value: string` | 全部 |
| `change` | 输入内容变化时触发 | `value: string` | 全部 |
| `focus` | 输入框聚焦时触发 | - | 全部 |
| `blur` | 输入框失焦时触发 | `value: string` | 全部 |
| `confirm` | 点击键盘确认按钮时触发 | `value: string` | 全部 |
| `clear` | 点击清除按钮后触发 | - | 全部 |
| `keyboardheightchange` | 键盘高度变化时触发 | `event: UniInputKeyboardHeightChangeEvent` | App、微信 |

### Slots

| 名称 | 说明 | 平台 |
| :---: | :---: | :---: |
| `prefix` | 输入框前置内容，插入在前置图标之后 | 全部 |
| `suffix` | 输入框后置内容，插入在后置图标之前 | 全部 |

## 参考

- [uni-app x input 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/input.html)
