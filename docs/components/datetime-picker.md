<h5-demo src="pages/form/datetime-picker/datetime-picker" title="DatetimePicker 时间选择器" />

# DatetimePicker 时间选择器

`uvx-datetime-picker` 基于 `uvx-picker` 提供日期、时间、年月、日期时间和年份选择，支持范围、过滤和格式化。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 五种模式、日期范围和时间范围 | √ | √ | √ | √ | √ |
| 选项过滤、格式化和实例控制 | √ | √ | √ | √ | √ |
| 加载、工具栏、遮罩和圆角 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. `date`、`year-month`、`datetime`、`year` 模式使用时间戳；`time` 模式使用 `HH:mm` 字符串。
2. 滚轮变化只触发 `change` 并更新内部值；点击确认才触发 `confirm`、`input` 和 `update:modelValue`。
3. `clear-date=true` 时确认不会触发 `input` 或更新 `v-model`，但仍触发 `confirm`。
4. `filter` 用于增删每列候选值，`formatter` 只转换显示文字；回传值仍使用未格式化数据。
5. `cancel()` 和 `confirm()` 方法只触发对应处理，不负责关闭；是否关闭由内部 Picker 的交互配置决定。

:::

## 日期时间

```vue
<template>
   <uvx-datetime-picker
      ref="picker"
      v-model="value"
      mode="datetime"
      @confirm="handleConfirm"
   ></uvx-datetime-picker>
</template>

<script lang="uts" setup>
import type { ConfirmEvent } from "@/uni_modules/uvx-ui/components/uvx-datetime-picker/types/index.uts";

// 选择器实例
const picker = ref<UvxDatetimePickerComponentPublicInstance | null>(null);
// 绑定值，日期类模式为时间戳
const value = ref<number>(Date.now());

/**
 * 处理确认结果
 * @param event 确认事件
 * @returns null
 */
const handleConfirm = (event: ConfirmEvent): void => {
   console.log(event.value, event.mode);
};
</script>
```

## 日期、年月和年份

```vue
<template>
   <uvx-datetime-picker ref="datePicker" v-model="value" mode="date"></uvx-datetime-picker>
   <uvx-datetime-picker ref="monthPicker" v-model="value" mode="year-month"></uvx-datetime-picker>
   <uvx-datetime-picker ref="yearPicker" v-model="value" mode="year"></uvx-datetime-picker>
</template>
```

## 时间模式

```vue
<uvx-datetime-picker
   ref="timePicker"
   v-model="time"
   mode="time"
   :min-hour="8"
   :max-hour="20"
   :min-minute="0"
   :max-minute="59"
></uvx-datetime-picker>
```

## 日期范围

```vue
<uvx-datetime-picker
   ref="picker"
   v-model="value"
   mode="date"
   :min-date="minDate"
   :max-date="maxDate"
></uvx-datetime-picker>
```

## 过滤和格式化

```uts
import type { ColumnType } from "@/uni_modules/uvx-ui/components/uvx-datetime-picker/types/index.uts";

const filter = (type: ColumnType, values: string[]): string[] => {
   if (type != "year") return values;
   return values.filter((value: string): boolean => parseInt(value) % 2 == 0);
};

const formatter = (type: ColumnType, value: string): string => {
   if (type == "year") return `${value}年`;
   if (type == "month") return `${value}月`;
   return value;
};
```

## 实例控制

```uts
picker.value?.open();
picker.value?.setFormatter(formatter);
picker.value?.confirm();
picker.value?.close();
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `value` | 兼容绑定值 | `string \| number` | `""` | 全部 |
| `model-value` | 双向绑定值 | `string \| number` | `""` | 全部 |
| `show-toolbar` | 是否显示顶部工具栏 | `boolean` | `true` | 全部 |
| `title` | 工具栏标题 | `string` | `""` | 全部 |
| `mode` | 选择模式 | `date \| time \| year-month \| datetime \| year` | `datetime` | 全部 |
| `max-date` | 最大日期时间戳 | `number` | 当前年份后十年的 1 月 1 日 | 全部 |
| `min-date` | 最小日期时间戳 | `number` | 当前年份前十年的 1 月 1 日 | 全部 |
| `min-hour` / `max-hour` | 时间模式小时范围 | `number` | `0` / `23` | 全部 |
| `min-minute` / `max-minute` | 时间模式分钟范围 | `number` | `0` / `59` | 全部 |
| `filter` | 各列候选值过滤函数 | `Filter` | `null`（不过滤） | 全部 |
| `formatter` | 各列显示值格式化函数 | `Formatter` | `null`（不格式化） | 全部 |
| `loading` | 是否显示加载状态 | `boolean` | `false` | 全部 |
| `item-height` | 单个选项高度 | `number` | `44` | 全部 |
| `cancel-text` / `confirm-text` | 工具栏国际化按钮文字 | `string` | `取消` / `确定` | 全部 |
| `cancel-color` / `confirm-color` | 取消/确认文字颜色 | `string` | `""` | 全部 |
| `visible-item-count` | 每列可见选项数量 | `number` | `5` | 全部 |
| `close-on-click-overlay` | 点击遮罩是否关闭 | `boolean` | `true` | 全部 |
| `close-on-click-confirm` | 点击确认后是否关闭 | `boolean` | `true` | 全部 |
| `clear-date` | 确认时是否禁止回写绑定值 | `boolean` | `false` | 全部 |
| `round` | 底部弹层圆角 | `string \| number` | `0` | 全部 |
| `u-style` | 选择器内容样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 选择器内容追加类名 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `update:modelValue` / `input` | 确认且 `clear-date=false` 时触发 | `PickerValue` | 全部 |
| `change` | 滚轮值变化时触发 | `ChangeEvent` | 全部 |
| `confirm` | 确认当前内部值时触发 | `ConfirmEvent` | 全部 |
| `cancel` | 取消时触发 | - | 全部 |
| `close` | 内部 Picker 关闭时触发 | - | 全部 |

### Methods

| 方法 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `open()` / `close()` | 打开或关闭选择器 | - | 全部 |
| `cancel()` | 触发取消处理，不自动关闭 | - | 全部 |
| `confirm()` | 确认当前值，不自动关闭 | - | 全部 |
| `setFormatter(formatter)` | 设置本地格式化函数并同步选择器 | `Formatter` | 全部 |

### ChangeEvent / ConfirmEvent

| 字段 | 说明 | 类型 |
| :---: | :---: | :---: |
| `value` | 当前值；日期类模式为时间戳，时间模式为字符串 | `string \| number` |
| `mode` | 当前选择模式 | `Mode` |

## 参考

- [JavaScript Date](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)
