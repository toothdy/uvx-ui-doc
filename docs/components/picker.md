<h5-demo src="pages/form/picker/picker" title="Picker 选择器" />

# Picker 选择器

`uvx-picker` 在底部弹层中提供单列、多列和联动滚轮选择，支持字符串、数字及对象选项和完整的实例方法。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 单列、多列、对象选项和默认索引 | √ | √ | √ | √ | √ |
| 加载状态、工具栏、遮罩和圆角 | √ | √ | √ | √ | √ |
| 动态列数据与查询方法 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. `columns` 必须是二维数组，每个内层数组对应一列；对象选项使用 `key-name` 读取显示文本。
2. `default-index`、列数据和方法返回值都会由组件复制，业务侧不应依赖引用相等。
3. `change` 的 `columnIndex` 是本次变化列，`index` 是该列新索引；`value` 是所有列当前选中项。
4. `confirm` 的 `innerIndex` 名称来自当前类型定义，但实际值是当前选中项数组，不是索引数组；索引使用 `indexs`。
5. `setColumnValues` 更新指定列后，会把其后各列索引重置为 `0`，适合联动选择。

:::

## 基础用法

```vue
<uvx-picker
   ref="picker"
   :columns="columns"
   @confirm="handleConfirm"
></uvx-picker>
```

```uts
import type { Column, Columns, ConfirmEvent } from "@/uni_modules/uvx-ui/components/uvx-picker/types/index.uts";

const picker = ref<UvxPickerComponentPublicInstance | null>(null);

const columns = ref<Columns>([["中国", "美国", "日本"] as Column]);

const handleConfirm = (event: ConfirmEvent): void => {
   console.log("确认选择：", event.innerIndex);
};
```

## 多列选择

```uts
import type { Column, Columns } from "@/uni_modules/uvx-ui/components/uvx-picker/types/index.uts";

const columns = ref<Columns>([
   ["上午", "下午"] as Column,
   ["1:00", "2:00", "3:00"] as Column,
]);
```

## 对象选项

```vue
<uvx-picker
   ref="picker"
   :columns="regionColumns"
   key-name="name"
></uvx-picker>
```

## 联动选择

```uts
import type { ChangeEvent, Column, Columns } from "@/uni_modules/uvx-ui/components/uvx-picker/types/index.uts";

const picker = ref<UvxPickerComponentPublicInstance | null>(null);

// 联动第二列数据
const CHILD_COLUMNS: Columns = [
   ["深圳", "厦门", "上海", "拉萨"] as Column,
   ["得州", "华盛顿", "纽约", "阿拉斯加"] as Column,
];

const handleChange = (event: ChangeEvent): void => {
   if (event.columnIndex == 0) {
      picker.value?.setColumnValues(1, CHILD_COLUMNS[event.index]);
   }
};
```

## 加载和样式

```vue
<uvx-picker
   ref="picker"
   title="选择地区"
   :columns="columns"
   :loading="loading"
   :round="12"
   active-color="#3c9cff"
></uvx-picker>
```

## 实例控制

```uts
const picker = ref<UvxPickerComponentPublicInstance | null>(null);

picker.value?.open();
picker.value?.setIndexs([1, 0], true);
const values = picker.value?.getValues();
const indexs = picker.value?.getIndexs();
picker.value?.close();
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `show-toolbar` | 是否显示顶部工具栏 | `boolean` | `true` | 全部 |
| `title` | 工具栏标题 | `string` | `""` | 全部 |
| `round` | 底部弹层圆角 | `string \| number` | `0` | 全部 |
| `columns` | 选择器列数据 | `Columns` | `[]` | 全部 |
| `loading` | 是否显示加载遮罩并阻止滚轮交互 | `boolean` | `false` | 全部 |
| `item-height` | 单个选项高度，单位 px | `number` | `44` | 全部 |
| `cancel-text` / `confirm-text` | 工具栏国际化按钮文字 | `string` | `取消` / `确定` | 全部 |
| `cancel-color` / `confirm-color` | 取消/确认文字颜色 | `string` | `""` | 全部 |
| `color` / `active-color` | 普通/选中项文字颜色 | `string` | `""` | 全部 |
| `visible-item-count` | 每列可见选项数量 | `number` | `5` | 全部 |
| `key-name` | 对象选项显示字段 | `string` | `text` | 全部 |
| `close-on-click-overlay` | 点击遮罩是否关闭 | `boolean` | `true` | 全部 |
| `close-on-click-confirm` | 点击确认后是否关闭 | `boolean` | `true` | 全部 |
| `default-index` | 各列默认索引 | `number[]` | `[]` | 全部 |
| `u-style` | 选择器内容样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 选择器内容追加类名 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `confirm` | 点击确认时触发 | `ConfirmEvent` | 全部 |
| `cancel` | 点击取消时触发 | - | 全部 |
| `close` | 内部弹层关闭后触发 | - | 全部 |
| `change` | 滚轮选项变化时触发 | `ChangeEvent` | 全部 |

### Methods

| 方法 | 说明 | 参数 | 返回值 |
| :---: | :---: | :---: | :---: |
| `open()` / `close()` | 打开或关闭选择器 | - | `void` |
| `setIndexs(indexs, shouldSetLastIndex?)` | 设置各列索引 | `number[]`, `boolean` | `void` |
| `setLastIndex(indexs)` | 设置变化比较基准索引 | `number[]` | `void` |
| `setColumnValues(columnIndex, values)` | 更新指定列并重置后续列索引 | `number`, `Column` | `void` |
| `getColumnValues(columnIndex)` | 获取指定列数据副本 | `number` | `Column` |
| `getValues()` | 获取当前选中项副本 | - | `Item[]` |
| `getIndexs()` | 获取当前索引副本 | - | `number[]` |

### ChangeEvent

| 字段 | 说明 | 类型 |
| :---: | :---: | :---: |
| `value` | 所有列当前选中项 | `Item[]` |
| `index` | 本次变化列的新索引 | `number` |
| `indexs` | 所有列当前索引 | `number[]` |
| `values` | 当前完整列数据 | `Columns` |
| `columnIndex` | 本次变化的列索引 | `number` |

## 参考

- [uni-app x picker-view 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/picker-view.html)

