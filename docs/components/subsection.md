<h5-demo src="pages/navigation/subsection/subsection" title="Subsection 分段器" />

# Subsection 分段器

`uvx-subsection` 用于在少量互斥选项中切换，提供按钮和描边分段两种外观。选项等宽排列，适合状态筛选和视图切换。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

小程序端仅支持微信。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 等宽选项、两种模式、主题颜色 | √ | √ | √ | √ | √ |
| 字符串或对象列表、受控选中索引 | √ | √ | √ | √ | √ |
| `change` 选项事件 | √ | √ | √ | √ | √ |
| 自定义样式与外部类名 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. `current` 默认为 `0`，组件不会自行修改它。收到 `change(index)` 后，请在父组件更新 `current`；重复点击当前项也会触发事件。
2. `list` 默认为 `[]`。对象列表从 `key-name` 指定的字符串字段读取文字，默认字段名为 `name`；缺少字段时该项显示为空。
3. `mode` 默认为 `button`；`subsection` 为描边分段模式。按钮模式高度为 `32px`，分段模式为 `30px`。
4. `active-color`、`inactive-color`、`bg-color` 默认为空字符串，空值时跟随当前主题。显式颜色为固定 CSS 颜色，不随主题切换。
5. `u-item-style` 仅作用于当前选中项，传 CSS 字符串；`u-style` 作用于组件根节点。组件无需在弹层打开后调用刷新方法。

:::

## 基础用法

分段模式使用 `mode="subsection"`。点击后将事件索引写回 `current`。

```vue
<template>
   <uvx-subsection
      :list="items"
      mode="subsection"
      :current="current"
      @change="handleChange"
   ></uvx-subsection>
</template>

<script lang="uts" setup>
import type { Item } from "@/uni_modules/uvx-ui/components/uvx-subsection/types/index.uts";

const items: Item[] = ["未付款", "已付款", "待评价"];
const current = ref(0);

/**
 * 更新当前选项
 * @param index 选项索引
 * @returns null
 */
const handleChange = (index: number): void => {
   current.value = index;
};
</script>
```

## 按钮模式

`mode="button"` 为默认外观，使用主题容器色作为背景，当前项以主题页面色突出。

```vue
<template>
   <uvx-subsection
      :list="items"
      mode="button"
      :current="current"
      @change="handleChange"
   ></uvx-subsection>
</template>
```

## 自定义颜色

`active-color` 设置当前项颜色；分段模式同时作用于外边框和分隔线。`inactive-color` 设置未选中文字色，`bg-color` 仅作用于按钮模式背景。

```vue
<template>
   <uvx-subsection
      :list="items"
      mode="subsection"
      active-color="#f56c6c"
      inactive-color="#606266"
      :current="current"
      @change="handleChange"
   ></uvx-subsection>
</template>
```

## 默认选中项

将 `current` 初值设为对应索引；数字和数字字符串均可使用。

```vue
<template>
   <uvx-subsection :list="items" :current="1"></uvx-subsection>
</template>
```

## 对象选项

`list` 也可传对象数组，`key-name` 指定展示文字的字段。

```vue
<template>
   <uvx-subsection :list="items" key-name="label"></uvx-subsection>
</template>

<script lang="uts" setup>
import type { Item } from "@/uni_modules/uvx-ui/components/uvx-subsection/types/index.uts";

const items: Item[] = [{ label: "日" }, { label: "周" }, { label: "月" }];
</script>
```

## 自定义样式

`u-item-style` 覆盖当前选中项样式，`u-style` 设置整体样式，`u-class` 追加根节点外部类名。`font-size` 数字按 px 处理，`bold` 控制激活文字加粗。

```vue
<template>
   <uvx-subsection
      :list="items"
      :font-size="14"
      :bold="false"
      u-item-style="border-radius: 19px;"
      u-style="border-radius: 22px;"
      u-class="my-subsection"
   ></uvx-subsection>
</template>
```

## 弹层中使用

组件随父容器宽度自动等分，弹层打开后无需调用 `refresh`。

```vue
<template>
   <uvx-popup ref="uPopup" mode="bottom" bg-color="page" :round="10">
      <view class="popup-content">
         <uvx-subsection :list="items" :current="current" @change="handleChange"></uvx-subsection>
      </view>
   </uvx-popup>
</template>

<script lang="uts" setup>
import type { Item } from "@/uni_modules/uvx-ui/components/uvx-subsection/types/index.uts";

const items: Item[] = ["未付款", "已付款", "待评价"];
const current = ref(0);
// 弹层实例
const uPopup = ref<UvxPopupComponentPublicInstance | null>(null);

/**
 * 更新当前选项
 * @param index 选项索引
 * @returns null
 */
const handleChange = (index: number): void => {
   current.value = index;
};
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `list` | 字符串或对象选项数组 | `(string \| UTSJSONObject)[]` | `[]` | 全部 |
| `current` | 当前选项索引，非整数或越界时无选中项 | `string \| number` | `0` | 全部 |
| `active-color` | 激活颜色；空值时使用主题主色 | `string` | `""` | 全部 |
| `inactive-color` | 未激活文字颜色；空值时使用主题主文本色 | `string` | `""` | 全部 |
| `mode` | 外观模式 | `button \| subsection` | `button` | 全部 |
| `font-size` | 文字大小，数字按 px 处理 | `string \| number` | `12` | 全部 |
| `bold` | 激活文字是否加粗 | `boolean` | `true` | 全部 |
| `bg-color` | 按钮模式背景色；空值时使用主题容器色 | `string` | `""` | 全部 |
| `key-name` | 对象选项的文字字段 | `string` | `name` | 全部 |
| `u-item-style` | 选中项样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-style` | 根节点样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 根节点外部类名 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `change` | 点击任一选项时触发，包括当前项 | `index: number`，从 `0` 开始 | 全部 |

## 参考

- [uni-app x view 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/view.html)
- [uni-app x text 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/text.html)
- [UTS 数据类型官方文档](https://doc.dcloud.net.cn/uni-app-x/uts/data-type.html)
