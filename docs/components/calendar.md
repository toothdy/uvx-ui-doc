<h5-demo src="pages/form/calendar/calendar" title="Calendar 日历" />

# Calendar 日历

`uvx-calendar` 用于查看和选择日期，支持左右滑动切换月份、单选、多选、日期范围、日期限制、打点、农历、插入模式和底部弹窗模式。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

小程序端仅支持微信。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 单选、多选和日期范围 | √ | √ | √ | √ | √ |
| 插入模式和底部弹窗模式 | √ | √ | √ | √ | √ |
| 日期限制、打点和自定义文案 | √ | √ | √ | √ | √ |
| 农历显示（1900 至 2100 年） | √ | √ | √ | √ | √ |
| 左右滑动切换月份 | √ | √ | √ | √ | √ |
| `open`、`close` 实例方法 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. `date` 使用 `YYYY-MM-DD` 字符串。单选模式传字符串，多选和范围模式传字符串数组；空值或无效值会回退到今天。
2. `insert=false` 为弹窗模式，通过 `open()` 打开并监听 `confirm`；`insert=true` 直接显示日历，点击日期时触发 `change`。
3. `mode="range"` 需要选择完整起止日期才能确认；`mode="multiple"` 至少需要一个日期。`readonly=true` 时不能点击日期或确认，但仍可滑动浏览月份或打开年月选择器。
4. `clear-date=true` 时每次打开弹窗都会按当前 `date` 重置选择；设为 `false` 会保留上一次未关闭前的内部选择状态。
5. `start-date`、`end-date` 和 `selected[].disable` 都会禁用对应日期。日期必须使用本地日历格式，不要传 `Date` 对象或时间戳。
6. 农历换算仅覆盖 1900 至 2100 年，超出范围时农历文字为空；日期选择本身仍可正常工作。
7. 弹窗的滚动穿透行为由 `uvx-popup` 决定；页面存在独立滚动容器时，应在弹窗打开期间自行控制其滚动状态。

:::

## 基础用法

弹窗模式通过组件实例的 `open()` 方法打开，确认后从 `confirm` 事件获取结果。

```vue
<template>
   <uvx-button text="选择日期" @click="handleOpen"></uvx-button>
   <uvx-calendar
      ref="uCalendar"
      @confirm="handleConfirm"
   ></uvx-calendar>
</template>

<script lang="uts" setup>
import type { ChangeEvent } from "@/uni_modules/uvx-ui/components/uvx-calendar/types/index.uts";

// 日历实例
const uCalendar = ref<UvxCalendarComponentPublicInstance | null>(null);

/**
 * 打开日历
 * @returns null
 */
const handleOpen = (): void => {
   uCalendar.value?.open();
};

/**
 * 处理确认结果
 * @param event 日历选择结果
 * @returns null
 */
const handleConfirm = (event: ChangeEvent): void => {
   console.log(event.fulldate);
};
</script>
```

## 插入模式

设置 `insert` 后日历直接显示在页面中，日期变化通过 `change` 事件返回。

```vue
<template>
   <uvx-calendar
      :insert="true"
      @change="handleChange"
   ></uvx-calendar>
</template>
```

## 滑动切换月份

在六行日期网格上向左滑动进入下个月，向右滑动进入上个月。月份栏和星期栏保持固定；滑动距离不足时，日期网格会自动回弹到当前月份。

成功切换月份后触发 `monthSwitch`。点击月份标题可打开年月选择器，点击“今天”可回到并选中当前日期。

## 多选日期

`mode="multiple"` 开启多选，`date` 数组设置默认日期；结果位于 `event.multiple.data`。

```vue
<template>
   <uvx-calendar
      ref="uCalendar"
      mode="multiple"
      :date="DEFAULT_DATES"
      @confirm="handleConfirm"
   ></uvx-calendar>
</template>

<script lang="uts" setup>
const DEFAULT_DATES: string[] = ["2026-10-02", "2026-10-08", "2026-10-16"];
</script>
```

## 日期范围

`mode="range"` 开启范围选择。`allow-same-day` 决定起止日期能否为同一天，结果位于 `event.range`。

```vue
<template>
   <uvx-calendar
      ref="uCalendar"
      mode="range"
      :date="DEFAULT_RANGE"
      :allow-same-day="true"
      start-text="住店"
      end-text="离店"
      @confirm="handleConfirm"
   ></uvx-calendar>
</template>

<script lang="uts" setup>
const DEFAULT_RANGE: string[] = ["2026-10-02", "2026-10-08"];
</script>
```

## 日期限制

`start-date` 和 `end-date` 限制可选范围，边界日期自身仍然可以选择。

```vue
<template>
   <uvx-calendar
      ref="uCalendar"
      start-date="2026-10-02"
      end-date="2026-10-20"
      @confirm="handleConfirm"
   ></uvx-calendar>
</template>
```

## 打点和自定义文案

`selected` 为指定日期添加顶部文案、底部文案、徽标或禁用状态。组件不会修改传入的打点对象，`data` 会随选择结果透传。

```vue
<template>
   <uvx-calendar
      ref="uCalendar"
      :selected="SELECTED_DATES"
      @confirm="handleConfirm"
   ></uvx-calendar>
</template>

<script lang="uts" setup>
import type { SelectedItem } from "@/uni_modules/uvx-ui/components/uvx-calendar/types/index.uts";

const SELECTED_DATES: SelectedItem[] = [
   {
      date: "2026-10-02",
      info: "签到",
      infoColor: "#ff0000",
      badge: true,
   },
   {
      date: "2026-10-06",
      topinfo: "￥100",
      topinfoColor: "#19be6b",
      info: "余10",
   },
   {
      date: "2026-10-12",
      disable: true,
   },
];
</script>
```

## 农历和月份背景

`lunar` 显示农历日期，`show-month` 控制日期网格中的月份背景数字。

```vue
<template>
   <uvx-calendar
      :insert="true"
      :lunar="true"
      :show-month="true"
   ></uvx-calendar>
</template>
```

## 自定义颜色和弹窗

颜色属性为空时跟随 uvx-ui 主题。显式设置 `color`、`confirm-color` 或 `cancel-color` 后使用指定颜色；`round` 和 `close-on-click-overlay` 控制弹窗外观与遮罩行为。

```vue
<template>
   <uvx-calendar
      ref="uCalendar"
      mode="range"
      color="#f56c6c"
      confirm-color="#f56c6c"
      cancel-color="#606266"
      :round="12"
      :close-on-click-overlay="false"
      @confirm="handleConfirm"
   ></uvx-calendar>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `cancel-color` | 取消按钮颜色；空值时使用主题次级文字色 | `string` | `""` | 全部 |
| `confirm-color` | 可确认状态的确认按钮颜色；空值时使用主题主色 | `string` | `""` | 全部 |
| `title` | 弹窗标题 | `string` | `""` | 全部 |
| `color` | 选中态、今天和范围状态的主题颜色；空值时跟随主题 | `string` | `""` | 全部 |
| `date` | 默认日期；单选传字符串，多选和范围传字符串数组 | `string \| string[]` | 今天 | 全部 |
| `selected` | 日期打点、文案和禁用配置 | `SelectedItem[]` | `[]` | 全部 |
| `lunar` | 是否显示农历 | `boolean` | `false` | 全部 |
| `start-date` | 可选开始日期，格式为 `YYYY-MM-DD` | `string` | `""` | 全部 |
| `end-date` | 可选结束日期，格式为 `YYYY-MM-DD` | `string` | `""` | 全部 |
| `mode` | 选择模式：空字符串为单选，另有 `multiple`、`range` | `"" \| multiple \| range` | `""` | 全部 |
| `insert` | 是否直接插入页面；`false` 时使用弹窗 | `boolean` | `false` | 全部 |
| `show-month` | 是否显示日期网格中的月份背景 | `boolean` | `true` | 全部 |
| `clear-date` | 每次打开弹窗时是否按 `date` 重置选择 | `boolean` | `true` | 全部 |
| `round` | 底部弹窗顶部圆角，数字单位为 px | `string \| number` | `8` | 全部 |
| `close-on-click-overlay` | 点击遮罩时是否关闭弹窗 | `boolean` | `true` | 全部 |
| `start-text` | 范围开始日期底部文案 | `string` | `开始`（国际化） | 全部 |
| `end-text` | 范围结束日期底部文案 | `string` | `结束`（国际化） | 全部 |
| `allow-same-day` | 范围起止日期是否允许为同一天，仅 `range` 生效 | `boolean` | `false` | 全部 |
| `readonly` | 是否禁止日期选择和确认，不影响月份浏览 | `boolean` | `false` | 全部 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到根节点的外部样式类 | `string` | `""` | 全部 |

### Selected Options

| 属性 | 说明 | 类型 | 必填 |
| :---: | :---: | :---: | :---: |
| `date` | 日期，格式为 `YYYY-MM-DD`；无效日期会被忽略 | `string` | 是 |
| `info` | 日期底部文案 | `string` | 否 |
| `infoColor` | 底部文案颜色，选中或禁用状态下由状态样式覆盖 | `string` | 否 |
| `topinfo` | 日期顶部文案 | `string` | 否 |
| `topinfoColor` | 顶部文案颜色，选中或禁用状态下由状态样式覆盖 | `string` | 否 |
| `badge` | 是否显示右上角徽标 | `boolean` | 否 |
| `disable` | 是否禁止选择该日期 | `boolean` | 否 |
| `data` | 随 `extraInfo` 透传的业务数据，组件不读取其字段 | `UTSJSONObject \| null` | 否 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `change` | 插入模式点击有效日期或回到今天后触发 | `ChangeEvent` | 全部 |
| `confirm` | 弹窗模式点击可用的确认按钮后触发 | `ChangeEvent` | 全部 |
| `close` | 弹窗关闭后触发 | - | 全部 |
| `monthSwitch` | 左右滑动切月、回到今天跨月或月份选择确认后触发 | `{ year: number, month: number }` | 全部 |

### ChangeEvent

| 字段 | 说明 | 类型 |
| :---: | :---: | :---: |
| `range` | 范围状态，包含 `before`、`after` 和自然日数组 `data` | `RangeStatus` |
| `multiple` | 多选状态，包含日期数组 `data` | `MultipleStatus` |
| `year` | 最近操作日期的年份 | `number` |
| `month` | 最近操作日期的月份，范围为 1 至 12 | `number` |
| `date` | 最近操作日期的日 | `number` |
| `fulldate` | 最近操作日期，格式为 `YYYY-MM-DD` | `string` |
| `lunar` | 最近操作日期的农历信息 | `LunarInfo` |
| `extraInfo` | 最近操作日期匹配的打点项，无匹配时为 `null` | `SelectedItem \| null` |

### LunarInfo

| 字段 | 说明 | 类型 |
| :---: | :---: | :---: |
| `lYear` | 农历年份，超出支持范围时为 `0` | `number` |
| `lMonth` | 农历月份，超出支持范围时为 `0` | `number` |
| `lDay` | 农历日期，超出支持范围时为 `0` | `number` |
| `IMonthCn` | 中文农历月份 | `string` |
| `IDayCn` | 中文农历日期 | `string` |
| `isLeap` | 是否为闰月 | `boolean` |

### Methods

| 方法 | 说明 | 参数 | 返回值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `open` | 打开弹窗日历；插入模式调用无效 | - | `void` | 全部 |
| `close` | 关闭弹窗日历；插入模式调用无效 | - | `void` | 全部 |

## 参考

- [uni-app x 组件](https://doc.dcloud.net.cn/uni-app-x/vue/component.html)
- [uni-app x view](https://doc.dcloud.net.cn/uni-app-x/component/view.html)
- [uni-app x text](https://doc.dcloud.net.cn/uni-app-x/component/text.html)
- [uni-app x swiper](https://doc.dcloud.net.cn/uni-app-x/component/swiper.html)
- [UTS 数据类型与 Date](https://doc.dcloud.net.cn/uni-app-x/uts/data-type.html)
