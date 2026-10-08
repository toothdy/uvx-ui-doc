<h5-demo src="pages/layout/vtabs/vtabs" title="Vtabs 垂直选项卡" />

# Vtabs 垂直选项卡

`uvx-vtabs` 通过左侧分类导航切换右侧内容，支持点击定位、内容滚动联动、徽标、禁用项和非联动内容切换。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

小程序端仅支持微信。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 左侧标签与右侧内容滚动 | √ | √ | √ | √ | √ |
| 点击定位与内容滚动联动 | √ | √ | √ | √ | √ |
| 非联动内容切换 | √ | √ | √ | √ | √ |
| 数字徽标、圆点徽标和禁用项 | √ | √ | √ | √ | √ |
| `change`、`scrolltolower` 事件 | √ | √ | √ | √ | √ |
| `init()` 动态重新测量 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. `uvx-vtabs-item` 必须放在 `uvx-vtabs` 内使用。联动模式下，每个内容项都应传入与 `list` 下标一致且不重复的 `index`。
2. `height="auto"` 的真实含义是使用当前窗口高度，并非由插槽内容撑开。组件内部已经包含两个纵向 `scroll-view`，页面应避免再套纵向滚动容器。
3. `current` 是外部输入值，不是双向绑定。点击标签或内容滚动后通过 `change(index)` 通知使用方；需要受控状态时由使用方更新 `current`。
4. `disabled: true` 会禁用左侧标签点击。联动模式下对应内容仍保留在滚动区域中，用户手动滚动到该内容时仍会同步当前下标。
5. `hd-height` 是联动定位偏移量。右侧滚动区域存在头部内容时传入其实际高度，否则保持默认值 `0`。
6. `bar-style`、`bar-item-style`、`bar-item-active-style`、`bar-item-active-line-style`、`bar-item-badge-style`、`content-style` 和 `u-style` 均接收 CSS 字符串，不接收对象。
7. 标签或内容异步更新、插槽高度发生变化后，调用公开的 `init()` 重新测量。组件不会向传入的 `list` 写入布局数据。
8. `bar-bg-color` 为空时跟随主题；显式传色后不再随暗色主题切换。其他默认颜色同样由组件主题类提供。

:::

## 基础联动

`list` 提供左侧标签，`uvx-vtabs-item` 按相同下标提供右侧内容。点击标签会滚动到对应内容，手动滚动内容也会更新左侧激活项。

```vue
<template>
   <uvx-vtabs
      :list="TABS"
      :height="600"
      @change="handleChange"
   >
      <uvx-vtabs-item
         v-for="(item, index) in TABS"
         :key="index"
         :index="index"
      >
         <view class="category-content">
            <text>{{ item.name }}</text>
         </view>
      </uvx-vtabs-item>
   </uvx-vtabs>
</template>

<script lang="uts" setup>
import type { Item } from "@/uni_modules/uvx-ui/components/uvx-vtabs/types/index.uts";

const TABS: Item[] = [
   { name: "项目简介" },
   { name: "核心特性" },
   { name: "更新日志" },
];

/**
 * 处理分类变化
 * @param index 激活分类下标
 * @returns null
 */
const handleChange = (index: number): void => {
   console.log("当前分类：" + index.toString());
};
</script>
```

## 非联动模式

设置 `chain="false"` 后，组件不测算内容滚动对应关系。页面在 `change` 事件中更新插槽内容，切换时右侧区域会回到顶部。

```vue
<template>
   <uvx-vtabs
      :list="TABS"
      :height="600"
      :chain="false"
      @change="handleChange"
   >
      <uvx-vtabs-item :index="current">
         <text>{{ currentText }}</text>
      </uvx-vtabs-item>
   </uvx-vtabs>
</template>

<script lang="uts" setup>
import type { Item } from "@/uni_modules/uvx-ui/components/uvx-vtabs/types/index.uts";

const TABS: Item[] = [
   { name: "推荐" },
   { name: "热门" },
];

const current = ref(0);

/**
 * 当前分类文字
 * @returns string
 */
const currentText = computed((): string => {
   const value = TABS[current.value].getString("name");
   return value == null ? "" : value;
});

/**
 * 切换当前内容
 * @param index 激活分类下标
 * @returns null
 */
const handleChange = (index: number): void => {
   current.value = index;
};
</script>
```

## 徽标与禁用项

标签对象可设置 `badge` 和 `disabled`。徽标字段与 `uvx-badge` 对应，下面同时展示数字徽标、圆点徽标和禁用项。

```vue
<script lang="uts" setup>
import type { Item } from "@/uni_modules/uvx-ui/components/uvx-vtabs/types/index.uts";

const TABS: Item[] = [
   {
      name: "消息",
      badge: { show: true, value: 8, max: 99 },
   },
   {
      name: "更新",
      badge: { isDot: true },
   },
   {
      name: "不可用",
      disabled: true,
   },
];
</script>
```

`badge` 支持以下字段：

| 字段 | 说明 | 类型 | 默认值 |
| :---: | :---: | :---: | :---: |
| `show` | 是否显示徽标 | `boolean` | `false` |
| `isDot` | 是否显示圆点 | `boolean` | `false` |
| `value` | 徽标内容 | `string \| number` | `""` |
| `max` | 最大显示数值 | `string \| number` | `999` |
| `type` | 主题类型 | `primary \| error \| success \| info \| warning` | `error` |
| `showZero` | 数值为 0 时是否显示 | `boolean` | `false` |
| `bgColor` | 显式背景颜色 | `string` | `""` |
| `color` | 显式文字颜色 | `string` | `""` |
| `shape` | 徽标形状 | `circle \| horn` | `circle` |
| `numberType` | 超限显示方式 | `overflow \| ellipsis \| limit` | `overflow` |
| `inverted` | 是否使用反转样式 | `boolean` | `false` |

## 自定义样式

各区域样式统一使用 CSS 字符串。颜色属性为空时由主题变量提供默认值。

```vue
<uvx-vtabs
   :list="TABS"
   bar-width="110px"
   bar-bg-color="#f5f7fa"
   bar-style="border-right-width: 1px; border-right-style: solid; border-right-color: #ebedf0;"
   bar-item-style="min-height: 60px;"
   bar-item-active-style="background-color: #ffffff; font-weight: bold;"
   bar-item-active-line-style="width: 4px;"
   bar-item-badge-style="top: 6px; right: 10px;"
   content-style="background-color: #ffffff;"
></uvx-vtabs>
```

## 动态内容重新测量

异步数据或插槽尺寸变化后，通过组件实例调用 `init()`。列表本身变化时组件会自动安排一次重新测量。

```vue
<template>
   <uvx-vtabs ref="uVtabs" :list="tabs">
      <uvx-vtabs-item v-for="(item, index) in tabs" :key="index" :index="index">
         <text>{{ item.name }}</text>
      </uvx-vtabs-item>
   </uvx-vtabs>
</template>

<script lang="uts" setup>
import type { Item } from "@/uni_modules/uvx-ui/components/uvx-vtabs/types/index.uts";

const tabs: Item[] = [
   { name: "项目简介" },
   { name: "核心特性" },
];

// 垂直选项卡实例
const uVtabs = ref<UvxVtabsComponentPublicInstance | null>(null);

/**
 * 内容加载完成后刷新布局
 * @returns null
 */
const handleContentLoaded = (): void => {
   uVtabs.value?.init();
};
</script>
```

## API

### Vtabs Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `list` | 标签对象数组，支持 `disabled` 和 `badge` 字段 | `UTSJSONObject[]` | `[]` | 全部 |
| `key-name` | 标签文字字段名 | `string` | `name` | 全部 |
| `current` | 当前标签下标；无效值限制到有效范围 | `string \| number` | `0` | 全部 |
| `hd-height` | 内容联动定位偏移量，数字按 px 处理 | `string \| number` | `0` | 全部 |
| `chain` | 是否启用点击定位和内容滚动联动 | `boolean` | `true` | 全部 |
| `height` | 组件高度；`auto` 使用当前窗口高度，数字按 px 处理 | `string \| number` | `auto` | 全部 |
| `bar-width` | 左侧导航宽度，数字按 px 处理 | `string \| number` | `180rpx` | 全部 |
| `bar-scrollable` | 左侧导航是否允许纵向滚动 | `boolean` | `true` | 全部 |
| `bar-bg-color` | 左侧导航背景色，为空时使用页面主题色 | `string` | `""` | 全部 |
| `bar-style` | 左侧导航自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `bar-item-style` | 普通标签项自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `bar-item-active-style` | 激活标签项自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `bar-item-active-line-style` | 激活线自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `bar-item-badge-style` | 徽标容器自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `content-style` | 右侧内容区域自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到根节点的外部样式类 | `string` | `""` | 全部 |

### Vtabs Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `change` | 点击可用标签或内容滚动引起激活项变化时触发 | `index: number` | 全部 |
| `scrolltolower` | 右侧内容滚动到底部时触发 | `index: number` | 全部 |

### Vtabs Methods

| 方法 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `init()` | 下一渲染周期重新测量标签栏、内容容器和内容项 | - | 全部 |

### Vtabs Slots

| 名称 | 说明 | 平台 |
| :---: | :---: | :---: |
| `default` | 放置一个或多个 `uvx-vtabs-item` 及可选头尾内容 | 全部 |

### Item Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `index` | 内容项下标；联动模式下应与 `list` 下标一致 | `string \| number` | `0` | 全部 |
| `u-style` | 内容项根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到内容项根节点的外部样式类 | `string` | `""` | 全部 |

### Item Slots

| 名称 | 说明 | 平台 |
| :---: | :---: | :---: |
| `default` | 分类内容 | 全部 |

## 参考

- [uni-app x scroll-view 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/scroll-view.html)
- [uni-app x UniElement 官方文档](https://doc.dcloud.net.cn/uni-app-x/api/dom/unielement.html)
- [uni-app x view 组件官方文档](https://doc.dcloud.net.cn/uni-app-x/component/view.html)
