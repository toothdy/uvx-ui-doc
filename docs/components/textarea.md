<h5-demo src="pages/form/textarea/textarea" title="Textarea 文本域" />

# Textarea 文本域

`uvx-textarea` 提供双向绑定、自动增高、字数统计、输入格式化和多种边框样式。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

小程序端仅支持微信。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 输入、双向绑定、禁用、自动增高、字数统计 | √ | √ | √ | √ | √ |
| 边框样式、格式化、占位样式、固定高度 | √ | √ | √ | √ | √ |
| `confirm-type` 键盘确认按钮类型 | × | √ | √ | √ | √ |
| `fixed`、`show-confirm-bar`、`disable-default-padding` | × | × | × | × | √ |
| `cursor-spacing` 光标与键盘的距离 | √ | √ | × | × | √ |
| `adjust-position` 键盘弹出时上推页面 | √ | √ | √ | × | √ |
| `hold-keyboard` 点击页面时保持键盘 | √ | √ | √ | × | √ |
| `linechange` 行数变化事件 | √ | √ | √ | √ | √ |
| `keyboardheightchange` 键盘高度变化事件 | √ | √ | √ | × | √ |

::: warning 使用须知

1. 通过 `v-model` 绑定输入内容，事件回传值统一为字符串，一次输入会同时触发 `update:modelValue`、`input`、`change`。`value` 作为兼容属性，仅在 `v-model` 为空时生效。
2. `count` 在右下角显示字数统计，需 `maxlength` 不为 `-1`；`maxlength` 默认 `140`，传 `-1` 表示不限制长度且不显示统计。
3. `auto-height` 为 `true` 时高度随内容增长，`height` 失效；否则按 `height` 固定高度。
4. `confirm-type` 在 Android 端不生效，键盘确认按钮固定为换行。
5. `fixed`、`show-confirm-bar`、`disable-default-padding` 仅微信小程序支持；`cursor-spacing` 不支持 H5 与鸿蒙；`adjust-position` 不支持 H5；`hold-keyboard` 不支持 H5 与鸿蒙 Vapor 模式。
6. 输入格式化通过 `formatter` 属性传入，或通过组件实例调用 `setFormatter` 方法设置，实例方法优先。

:::

## 基础用法

通过 `v-model` 绑定输入内容，`placeholder` 设置占位文字。

```vue
<template>
   <uvx-textarea v-model="basicValue" placeholder="请输入内容"></uvx-textarea>
</template>

<script lang="uts" setup>
// 基础示例内容
const basicValue = ref("");
</script>
```

## 字数统计

`count` 显示右下角字数统计，`maxlength` 限制最大输入长度。

```vue
<template>
   <uvx-textarea
      v-model="countValue"
      placeholder="请输入内容"
      :maxlength="200"
      count
   ></uvx-textarea>
</template>
```

## 自动增高

`auto-height` 开启后高度随内容增长。

```vue
<template>
   <uvx-textarea v-model="autoHeightValue" placeholder="请输入内容" auto-height></uvx-textarea>
</template>
```

## 禁用状态

`disabled` 使用禁用背景色并阻止输入，字数统计可同时开启。

```vue
<template>
   <uvx-textarea
      v-model="disabledValue"
      placeholder="文本域已被禁用"
      disabled
      count
   ></uvx-textarea>
</template>
```

## 下划线模式

`border="bottom"` 使用下划线边框。

```vue
<template>
   <uvx-textarea
      v-model="bottomValue"
      placeholder="请输入内容"
      border="bottom"
   ></uvx-textarea>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `v-model` | 绑定的输入内容，优先级高于 `value` | `string \| number` | `""` | 全部 |
| `value` | 文本域内容，`v-model` 为空时生效 | `string \| number` | `""` | 全部 |
| `placeholder` | 占位文字 | `string` | `""` | 全部 |
| `placeholder-class` | 占位文字样式类 | `string` | `uvx-textarea-placeholder` | 全部 |
| `placeholder-style` | 占位文字内联样式 | `string` | `""` | 全部 |
| `height` | 文本域高度，数字自动补 `px`，`auto-height` 时失效 | `string \| number` | `70` | 全部 |
| `confirm-type` | 键盘确认按钮类型，Android 端固定为换行 | `return \| send \| search \| next \| go \| done` | `done` | H5、iOS、鸿蒙、微信 |
| `confirm-hold` | 点击键盘确认按钮后是否保持键盘 | `boolean` | `false` | 全部 |
| `disabled` | 是否禁用 | `boolean` | `false` | 全部 |
| `count` | 是否显示字数统计，需 `maxlength` 不为 `-1` | `boolean` | `false` | 全部 |
| `focus` | 是否自动聚焦 | `boolean` | `false` | 全部 |
| `auto-height` | 是否自动增高 | `boolean` | `false` | 全部 |
| `fixed` | 是否位于 `fixed` 定位区域 | `boolean` | `false` | 微信 |
| `cursor-spacing` | 光标与键盘的距离，单位 px | `number` | `0` | Android、iOS、微信 |
| `cursor` | 聚焦时的光标位置，`-1` 表示不指定 | `number` | `-1` | 全部 |
| `show-confirm-bar` | 是否显示键盘上方完成栏 | `boolean` | `true` | 微信 |
| `selection-start` | 光标起始位置 | `number` | `-1` | 全部 |
| `selection-end` | 光标结束位置 | `number` | `-1` | 全部 |
| `adjust-position` | 键盘弹出时是否上推页面 | `boolean` | `true` | App、微信 |
| `disable-default-padding` | 是否移除 iOS 默认内边距 | `boolean` | `false` | 微信 |
| `hold-keyboard` | 点击页面时是否保持键盘 | `boolean` | `false` | App、微信 |
| `maxlength` | 最大输入长度，`-1` 表示不限制 | `number` | `140` | 全部 |
| `border` | 边框样式 | `surround \| bottom \| none` | `surround` | 全部 |
| `formatter` | 输入格式化函数 | `(value: string) => string` | `null` | 全部 |
| `text-style` | 文本域文字样式，CSS 字符串 | `string` | `""` | 全部 |
| `count-style` | 字数统计样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-style` | 容器自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到容器节点的外部样式类 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `update:modelValue` | 输入内容变化时更新绑定值 | `value: string` | 全部 |
| `input` | 输入内容变化时触发，参数为格式化后的值 | `value: string` | 全部 |
| `change` | 输入内容变化时触发，参数为格式化后的值 | `value: string` | 全部 |
| `focus` | 文本域聚焦时触发 | `event: UniTextareaFocusEvent` | 全部 |
| `blur` | 文本域失焦时触发 | `event: UniTextareaBlurEvent` | 全部 |
| `linechange` | 行数变化时触发 | `event: UniTextareaLineChangeEvent` | 全部 |
| `confirm` | 点击键盘确认按钮时触发 | `event: UniInputConfirmEvent` | 全部 |
| `keyboardheightchange` | 键盘高度变化时触发 | `event: UniInputKeyboardHeightChangeEvent` | App、微信 |

## 参考

- [uni-app x textarea 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/textarea.html)
