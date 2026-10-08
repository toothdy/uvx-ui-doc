<h5-demo src="pages/form/checkbox/checkbox" title="Checkbox 复选框" />

# Checkbox 复选框

`uvx-checkbox` 复选框，配合 `uvx-checkbox-group` 管理多选值，支持圆、方、卡片三种形状、禁用、自定义颜色、图标位置与插槽自定义。

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

1. `uvx-checkbox` 必须在 `uvx-checkbox-group` 内使用，单独使用会抛出运行时错误。
2. 选中值通过组的 `v-model` 绑定数组；`v-model` 与 `value` 同时传递时，非空的 `v-model` 优先。
3. 单项的 `disabled`、`label-disabled` 只有传布尔值才生效，传空字符串等非布尔值时会回退组配置；组上的 `label-disabled`、`border-bottom` 支持布尔简写。
4. `checked` 为 `true` 的复选框始终显示选中：组同步选中状态时会与 `checked` 取“或”，点击无法取消其选中显示。
5. 点击图标或标签切换选中；`shape="card"` 时点击整块卡片均可切换；禁用项的所有点击无效。
6. `name` 是写入组选中值的唯一标识，支持字符串、数字与布尔类型。

:::

## 基础用法

`uvx-checkbox-group` 通过 `v-model` 绑定选中值数组，`placement="column"` 设置纵向排列。

```vue
<template>
   <uvx-checkbox-group v-model="checkboxValue" placement="column" @change="handleChange">
      <uvx-checkbox
         v-for="(item, index) in checkboxList"
         :key="index"
         :label="item.name"
         :name="item.name"
      ></uvx-checkbox>
   </uvx-checkbox-group>
</template>

<script lang="uts" setup>
type CheckboxValue = string | number | boolean;

type CheckboxItem = {
   name: string;
};

const checkboxValue = ref<CheckboxValue[]>(["苹果", "橙子"]);
const checkboxList: CheckboxItem[] = [
   { name: "苹果" },
   { name: "香蕉" },
   { name: "橙子" },
];

/**
 * 输出当前组的选中值
 * @param values 选中值
 * @returns null
 */
const handleChange = (values: CheckboxValue[]): void => {
   console.log("复选框选中值：", values);
};
</script>
```

## 自定义形状

`shape` 支持 `square`（默认）、`circle`、`card`，设置在组上对全部复选框生效。

```vue
<template>
   <uvx-checkbox-group v-model="checkboxValue" placement="column" shape="circle">
      <uvx-checkbox
         v-for="(item, index) in checkboxList"
         :key="index"
         :label="item.name"
         :name="item.name"
      ></uvx-checkbox>
   </uvx-checkbox-group>
</template>
```

## 禁用状态

组的 `disabled` 禁用全部复选框，单项设置 `disabled` 只禁用当前项。

```vue
<template>
   <uvx-checkbox-group v-model="checkboxValue" placement="column">
      <uvx-checkbox
         v-for="(item, index) in checkboxList"
         :key="index"
         :label="item.name"
         :name="item.name"
         :disabled="index == 0"
      ></uvx-checkbox>
   </uvx-checkbox-group>
</template>
```

## 禁止点击标签

组的 `label-disabled` 为 `true` 时，点击标签文字不再切换状态，只能点击图标切换。

```vue
<template>
   <uvx-checkbox-group v-model="checkboxValue" placement="column" label-disabled>
      <uvx-checkbox
         v-for="(item, index) in checkboxList"
         :key="index"
         :label="item.name"
         :name="item.name"
      ></uvx-checkbox>
   </uvx-checkbox-group>
</template>
```

## 卡片与自定义颜色

`shape="card"` 时选中项以卡片形式高亮，单项通过 `active-color` 覆盖选中边框与勾选图标底色。

```vue
<template>
   <uvx-checkbox-group v-model="checkboxValue" placement="column" shape="card">
      <uvx-checkbox
         v-for="(item, index) in checkboxList"
         :key="index"
         :active-color="item.color"
         :label="item.name"
         :name="item.name"
         :disabled="item.disabled"
      ></uvx-checkbox>
   </uvx-checkbox-group>
</template>
```

## 横向排列

`placement` 默认为 `row`，复选框横向换行排列，适用于选项较多的场景。

```vue
<template>
   <uvx-checkbox-group v-model="checkboxValue">
      <uvx-checkbox
         v-for="(item, index) in checkboxList"
         :key="index"
         :label="item.name"
         :name="item.name"
      ></uvx-checkbox>
   </uvx-checkbox-group>
</template>
```

## 图标右置与下边框

`icon-placement="right"` 将勾选图标放到标签右侧并与标签两端对齐，配合 `placement="column"` 和 `border-bottom` 显示下边框。

```vue
<template>
   <uvx-checkbox-group
      v-model="checkboxValue"
      placement="column"
      icon-placement="right"
      border-bottom
   >
      <uvx-checkbox
         v-for="(item, index) in checkboxList"
         :key="index"
         :label="item.name"
         :name="item.name"
      ></uvx-checkbox>
   </uvx-checkbox-group>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `name` | 复选框标识符，选中后写入组选中值 | `string \| number \| boolean` | `""` | 全部 |
| `shape` | 形状，空值继承组配置 | `circle \| square \| card` | `""` | 全部 |
| `size` | 复选框尺寸，空值继承组配置 | `string \| number` | `""` | 全部 |
| `checked` | 是否默认选中；为 `true` 时保持选中显示 | `boolean` | `false` | 全部 |
| `disabled` | 是否禁用，仅布尔值生效，非布尔值继承组配置 | `string \| boolean` | `""` | 全部 |
| `active-color` | 选中颜色，空值继承组配置 | `string` | `""` | 全部 |
| `inactive-color` | 未选中颜色，空值继承组配置 | `string` | `""` | 全部 |
| `icon-size` | 勾选图标尺寸，空值继承组配置 | `string \| number` | `""` | 全部 |
| `icon-color` | 勾选图标颜色，空值继承组配置 | `string` | `""` | 全部 |
| `label` | 标签文字 | `string \| number \| boolean` | `""` | 全部 |
| `label-size` | 标签字号，空值继承组配置 | `string \| number` | `""` | 全部 |
| `label-color` | 标签颜色，禁用时使用未选中色，空值继承组配置 | `string` | `""` | 全部 |
| `label-disabled` | 是否禁止点击标签切换状态，仅布尔值生效，非布尔值继承组配置 | `string \| boolean` | `""` | 全部 |
| `u-style` | 自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 自定义类名 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `change` | 复选框状态变化时触发 | `checked: boolean`（切换后的选中状态） | 全部 |

### Slots

| 名称 | 说明 | 平台 |
| :---: | :---: | :---: |
| `default` | 自定义标签内容，使用后替换 `label` | 全部 |
| `icon` | 自定义勾选图标 | 全部 |

### CheckboxGroup Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `value` | 选中值数组，受控模式 | `(string \| number \| boolean)[]` | `[]` | 全部 |
| `model-value` | `v-model` 选中值数组，非空时优先于 `value` | `(string \| number \| boolean)[]` | `[]` | 全部 |
| `name` | 表单标识符（当前版本未生效） | `string` | `""` | 全部 |
| `shape` | 组内复选框形状 | `circle \| square \| card` | `square` | 全部 |
| `disabled` | 是否禁用全部复选框 | `boolean` | `false` | 全部 |
| `active-color` | 选中颜色，空值跟随主题主色 | `string` | `""` | 全部 |
| `inactive-color` | 未选中颜色，空值跟随主题占位色 | `string` | `""` | 全部 |
| `size` | 复选框尺寸 | `string \| number` | `18` | 全部 |
| `placement` | 排列方式 | `row \| column` | `row` | 全部 |
| `label-size` | 标签字号 | `string \| number` | `14` | 全部 |
| `label-color` | 标签颜色，空值跟随主题 | `string` | `""` | 全部 |
| `label-disabled` | 是否禁止点击标签切换状态 | `boolean` | `false` | 全部 |
| `icon-color` | 勾选图标颜色 | `string` | `#ffffff` | 全部 |
| `icon-size` | 勾选图标尺寸 | `string \| number` | `12` | 全部 |
| `icon-placement` | 勾选图标位置 | `left \| right` | `left` | 全部 |
| `border-bottom` | 纵向排列时是否显示下边框 | `boolean` | `false` | 全部 |
| `u-style` | 自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 自定义类名 | `string` | `""` | 全部 |

### CheckboxGroup Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `update:modelValue` | 更新双向绑定值 | `values: (string \| number \| boolean)[]`（选中值数组） | 全部 |
| `input` | 选中值变化时触发 | `values: (string \| number \| boolean)[]`（选中值数组） | 全部 |
| `change` | 选中值变化时触发 | `values: (string \| number \| boolean)[]`（选中值数组） | 全部 |

## 参考

- [uni-app x checkbox 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/checkbox.html)
