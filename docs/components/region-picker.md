<h5-demo src="pages/form/region-picker/region-picker" title="RegionPicker 地区选择" />

# RegionPicker 地区选择

`uvx-region-picker` 在底部弹层中逐级选择树形地区数据，支持任意层级、默认回显、禁用节点和自定义标题。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

小程序端仅支持微信。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 任意层级树形选择 | √ | √ | √ | √ | √ |
| 默认回显、路径切换和禁用节点 | √ | √ | √ | √ | √ |
| 空数据、遮罩控制和实例方法 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. 组件没有确认按钮。选择没有可用 `children` 的叶子节点后，会立即更新 `v-model`、触发 `confirm` 并关闭弹层。
2. `model-value` 保存每一级节点的 `value`。组件按值和数据类型严格匹配路径，例如字符串 `"1"` 与数字 `1` 不相等。
3. 打开组件或数据变化时，会按 `model-value` 恢复最长有效路径；找不到的后续值会被忽略，但不会主动改写外部绑定值。
4. 点击关闭按钮触发 `cancel` 后关闭；点击遮罩或调用 `close()` 只触发 `close`，不会触发 `cancel`。
5. `disabled=true` 的节点不可选择。空数据时显示空状态，不会触发确认事件。

:::

## 基础用法

```vue
<template>
   <uvx-button text="选择地区" @click="openPicker"></uvx-button>
   <uvx-region-picker
      ref="regionPicker"
      v-model="regionValue"
      :options="regionOptions"
      @confirm="handleConfirm"
   ></uvx-region-picker>
</template>

<script lang="uts" setup>
import type {
   ConfirmEvent,
   RegionNode,
   RegionValue,
} from "@/uni_modules/uvx-ui/components/uvx-region-picker/types/index.uts";

// 地区选择器实例
const regionPicker = ref<UvxRegionPickerComponentPublicInstance | null>(null);
// 当前地区值路径
const regionValue = ref<RegionValue[]>([]);
// 地区树数据
const regionOptions = ref<RegionNode[]>([
   {
      value: "guangdong",
      label: "广东省",
      children: [
         {
            value: "shenzhen",
            label: "深圳市",
            children: [
               { value: "nanshan", label: "南山区" },
               { value: "futian", label: "福田区" },
            ],
         },
      ],
   },
]);

/**
 * 打开地区选择器
 * @returns null
 */
const openPicker = (): void => {
   regionPicker.value?.open();
};

/**
 * 处理地区确认
 * @param event 地区确认结果
 * @returns null
 */
const handleConfirm = (event: ConfirmEvent): void => {
   const labels = event.selectedOptions
      .map((item: RegionNode): string => item.label)
      .join(" / ");
   console.log(labels, event.value);
};
</script>
```

## 默认回显

`v-model` 中的值需要与每一级节点的 `value` 依次对应。

```uts
import type { RegionValue } from "@/uni_modules/uvx-ui/components/uvx-region-picker/types/index.uts";

// 默认地区值路径
const regionValue = ref<RegionValue[]>([
   "guangdong",
   "shenzhen",
   "nanshan",
]);
```

调用 `open()` 时，组件会从根节点开始恢复所选路径。

## 禁用节点

```uts
import type { RegionNode } from "@/uni_modules/uvx-ui/components/uvx-region-picker/types/index.uts";

// 包含禁用项的地区数据
const regionOptions = ref<RegionNode[]>([
   { value: "guangzhou", label: "广州市", disabled: true },
   { value: "shenzhen", label: "深圳市" },
]);
```

## 自定义弹层

```vue
<uvx-region-picker
   ref="regionPicker"
   v-model="regionValue"
   :options="regionOptions"
   title="选择服务地区"
   placeholder="请选择下级地区"
   :round="16"
   :close-on-click-overlay="false"
></uvx-region-picker>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `model-value` / `v-model` | 当前已提交的地区值路径 | `RegionValue[]` | `[]` | 全部 |
| `options` | 树形地区数据 | `RegionNode[]` | `[]` | 全部 |
| `title` | 弹层标题，空值使用内置国际化文案 | `string` | `""` | 全部 |
| `placeholder` | 待选择层级的占位文字，空值使用内置国际化文案 | `string` | `""` | 全部 |
| `close-on-click-overlay` | 点击遮罩是否关闭弹层 | `boolean` | `true` | 全部 |
| `round` | 弹层顶部圆角，数字单位为 px | `string \| number` | `10` | 全部 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 根节点外部样式类 | `string` | `""` | 全部 |

### RegionNode

| 字段 | 说明 | 类型 | 必填 |
| :---: | :---: | :---: | :---: |
| `value` | 节点值，同一路径中应保持类型稳定 | `string \| number` | 是 |
| `label` | 节点显示文字 | `string` | 是 |
| `children` | 下一级节点；未设置或空数组表示叶子节点 | `RegionNode[]` | 否 |
| `disabled` | 是否禁止选择 | `boolean` | 否 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `update:modelValue` | 选择叶子节点后更新绑定值 | `RegionValue[]` | 全部 |
| `confirm` | 选择叶子节点并提交路径 | `ConfirmEvent` | 全部 |
| `cancel` | 点击右上角关闭按钮 | - | 全部 |
| `close` | 弹层关闭 | - | 全部 |

### ConfirmEvent

| 字段 | 说明 | 类型 |
| :---: | :---: | :---: |
| `value` | 已选节点值路径 | `RegionValue[]` |
| `selectedOptions` | 已选节点完整路径 | `RegionNode[]` |

### Methods

| 方法 | 说明 | 返回值 |
| :---: | :---: | :---: |
| `open()` | 按外部绑定值同步路径并打开弹层 | `void` |
| `close()` | 关闭弹层 | `void` |

### Slots

组件没有公开插槽。

## 参考

- [uvx-popup 弹出层](/components/popup)
- [uni-app x scroll-view 组件](https://doc.dcloud.net.cn/uni-app-x/component/scroll-view.html)
