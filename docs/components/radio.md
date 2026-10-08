<h5-demo src="pages/form/radio/radio" title="Radio 单选框" />

# Radio 单选框

`uvx-radio` 单选框，配合 `uvx-radio-group` 管理单选值，支持圆、方、卡片三种形状、禁用、自定义颜色、图标位置与插槽自定义。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

小程序端仅支持微信。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 选择、禁用、形状（circle、square、card） | √ | √ | √ | √ | √ |
| `v-model` 双向绑定与 `value` 受控 | √ | √ | √ | √ | √ |
| 自定义颜色、图标位置、排列方式与下边框 | √ | √ | √ | √ | √ |
| 默认插槽与图标插槽自定义 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. `uvx-radio` 必须在 `uvx-radio-group` 内使用，单独使用会抛出运行时错误。
2. 初始选中值与受控值通过组的 `v-model` 或 `value` 设置，单项没有 `checked` 属性。
3. 组内值比较同时区分类型与值：数字 `1` 与字符串 `"1"` 视为两个不同选项。
4. 已选中的单选框再次点击不会触发任何事件。
5. 单项的 `disabled`、`label-disabled` 只有传布尔值才生效，传空字符串等非布尔值时会回退组配置；组上的 `label-disabled`、`border-bottom` 支持布尔简写。
6. `shape="card"` 或 `icon-placement="right"` 时点击整行区域即可选中，普通布局点击图标或标签选中。

:::

## 基础用法

`uvx-radio-group` 通过 `v-model` 绑定选中值，`placement="column"` 设置纵向排列。组的 `@change` 返回当前选中值，单项的 `@change` 在该项被选中时触发，参数为该项的 `name`。

```vue
<template>
   <uvx-radio-group v-model="radioValue" placement="column" @change="handleGroupChange">
      <uvx-radio
         v-for="(item, index) in radioList"
         :key="index"
         :label="item.name"
         :name="item.name"
         @change="handleRadioChange"
      ></uvx-radio>
   </uvx-radio-group>
</template>

<script lang="uts" setup>
import type { Value } from "@/uni_modules/uvx-ui/components/uvx-radio/types/index.uts";

type RadioItem = {
   name: string;
   color: string;
};

const radioValue = ref<Value>("苹果");
const radioList: RadioItem[] = [
   { name: "苹果", color: "#f56c6c" },
   { name: "香蕉", color: "#f9ae3d" },
   { name: "橙子", color: "#5ac725" },
   { name: "榴莲", color: "#3c9cff" },
];

/**
 * 输出单选框组选中值
 * @param value 选中值
 * @returns null
 */
const handleGroupChange = (value: Value): void => {
   console.log("单选框组选中值：", value);
};

/**
 * 输出单个单选框选中值
 * @param value 选中值
 * @returns null
 */
const handleRadioChange = (value: Value): void => {
   console.log("单选框选中值：", value);
};
</script>
```

## 自定义形状

`shape` 支持 `square`（默认）、`circle`、`card`，设置在组上对全部单选框生效。

```vue
<template>
   <uvx-radio-group v-model="radioValue" placement="column" shape="circle">
      <uvx-radio
         v-for="(item, index) in radioList"
         :key="index"
         :label="item.name"
         :name="item.name"
      ></uvx-radio>
   </uvx-radio-group>
</template>
```

## 禁用状态

组的 `disabled` 禁用全部单选框，单项设置 `disabled` 只禁用当前项。

```vue
<template>
   <uvx-radio-group v-model="radioValue" placement="column">
      <uvx-radio
         v-for="(item, index) in radioList"
         :key="index"
         :label="item.name"
         :name="item.name"
         :disabled="index == 0"
      ></uvx-radio>
   </uvx-radio-group>
</template>
```

## 禁止点击标签

组的 `label-disabled` 为 `true` 时，点击标签文字不再选中，只能点击图标选中。

```vue
<template>
   <uvx-radio-group v-model="radioValue" placement="column" label-disabled>
      <uvx-radio
         v-for="(item, index) in radioList"
         :key="index"
         :label="item.name"
         :name="item.name"
      ></uvx-radio>
   </uvx-radio-group>
</template>
```

## 卡片与自定义颜色

`shape="card"` 时选中项以卡片形式高亮，单项通过 `active-color` 覆盖选中边框与勾选图标底色。

```vue
<template>
   <uvx-radio-group v-model="radioValue" placement="column" shape="card">
      <uvx-radio
         v-for="(item, index) in radioList"
         :key="index"
         :active-color="item.color"
         :label="item.name"
         :name="item.name"
      ></uvx-radio>
   </uvx-radio-group>
</template>
```

## 横向排列

`placement` 默认为 `row`，单选框横向换行排列，适用于选项较多的场景。

```vue
<template>
   <uvx-radio-group v-model="radioValue">
      <uvx-radio
         v-for="(item, index) in radioList"
         :key="index"
         :label="item.name"
         :name="item.name"
      ></uvx-radio>
   </uvx-radio-group>
</template>
```

## 图标右置与下边框

`icon-placement="right"` 将勾选图标放到标签右侧并与标签两端对齐，配合 `placement="column"` 和 `border-bottom` 显示下边框。

```vue
<template>
   <uvx-radio-group
      v-model="radioValue"
      placement="column"
      icon-placement="right"
      border-bottom
   >
      <uvx-radio
         v-for="(item, index) in radioList"
         :key="index"
         :label="item.name"
         :name="item.name"
      ></uvx-radio>
   </uvx-radio-group>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `name` | 单选框标识符，选中后作为组选中值 | `string \| number \| boolean` | `""` | 全部 |
| `shape` | 形状，空值继承组配置 | `circle \| square \| card` | `""` | 全部 |
| `disabled` | 是否禁用，仅布尔值生效，非布尔值继承组配置 | `string \| boolean` | `""` | 全部 |
| `label-disabled` | 是否禁止点击标签选中，仅布尔值生效，非布尔值继承组配置 | `string \| boolean` | `""` | 全部 |
| `active-color` | 选中颜色，空值继承组配置 | `string` | `""` | 全部 |
| `inactive-color` | 未选中颜色，空值继承组配置 | `string` | `""` | 全部 |
| `icon-size` | 勾选图标尺寸，空值继承组配置 | `string \| number` | `""` | 全部 |
| `label` | 标签文字 | `string \| number \| boolean` | `""` | 全部 |
| `label-size` | 标签字号，空值继承组配置 | `string \| number` | `""` | 全部 |
| `label-color` | 标签颜色，禁用时使用未选中色，空值继承组配置 | `string` | `""` | 全部 |
| `size` | 单选框尺寸，空值继承组配置 | `string \| number` | `""` | 全部 |
| `icon-color` | 勾选图标颜色，空值继承组配置 | `string` | `""` | 全部 |
| `u-style` | 自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 自定义类名 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `change` | 当前单选框被选中时触发 | `value: string \| number \| boolean`（该单选框的 `name`） | 全部 |

### Slots

| 名称 | 说明 | 平台 |
| :---: | :---: | :---: |
| `default` | 自定义标签内容，使用后替换 `label` | 全部 |
| `icon` | 自定义勾选图标 | 全部 |

### RadioGroup Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `value` | 选中值，受控模式 | `string \| number \| boolean` | `""` | 全部 |
| `model-value` | `v-model` 选中值，空值时回退 `value` | `string \| number \| boolean` | `""` | 全部 |
| `name` | 表单标识符（当前版本未生效） | `string` | `""` | 全部 |
| `shape` | 组内单选框形状 | `circle \| square \| card` | `square` | 全部 |
| `disabled` | 是否禁用全部单选框 | `boolean` | `false` | 全部 |
| `active-color` | 选中颜色，空值跟随主题主色 | `string` | `""` | 全部 |
| `inactive-color` | 未选中颜色，空值跟随主题占位色 | `string` | `""` | 全部 |
| `size` | 单选框尺寸 | `string \| number` | `18` | 全部 |
| `placement` | 排列方式 | `row \| column` | `row` | 全部 |
| `label-size` | 标签字号 | `string \| number` | `14` | 全部 |
| `label-color` | 标签颜色，空值跟随主题 | `string` | `""` | 全部 |
| `label-disabled` | 是否禁止点击标签选中 | `boolean` | `false` | 全部 |
| `icon-color` | 勾选图标颜色 | `string` | `#ffffff` | 全部 |
| `icon-size` | 勾选图标尺寸 | `string \| number` | `12` | 全部 |
| `icon-placement` | 勾选图标位置 | `left \| right` | `left` | 全部 |
| `border-bottom` | 纵向排列时是否显示下边框 | `boolean` | `false` | 全部 |
| `u-style` | 自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 自定义类名 | `string` | `""` | 全部 |

### RadioGroup Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `update:modelValue` | 更新双向绑定值 | `value: string \| number \| boolean`（选中值） | 全部 |
| `input` | 选中值变化时触发 | `value: string \| number \| boolean`（选中值） | 全部 |
| `change` | 选中值变化时触发 | `value: string \| number \| boolean`（选中值） | 全部 |

## 参考

- [uni-app x radio 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/radio.html)
