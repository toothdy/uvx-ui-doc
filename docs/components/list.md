<h5-demo src="pages/data/list/list" title="List 列表" />

# List 列表

`uvx-list` 和 `uvx-list-item` 基于 uni-app x 原生 `list-view`、`list-item` 实现可回收列表，支持常见信息行、缩略图、图标、徽标、开关、跳转、插槽和滚动到底部事件。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 原生长列表与列表项回收 | √ | √ | √ | √ | √ |
| `scroll` / `scrolltolower` | √ | √ | √ | √ | × |
| 标题、描述、缩略图、图标和徽标 | √ | √ | √ | √ | √ |
| 跳转与点击反馈 | √ | √ | √ | √ | √ |
| 开关列表项 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. `uvx-list` 的直接内容应使用 `uvx-list-item`，这样才能保持原生 `list-view` 的列表项结构和回收能力。
2. `uvx-list-item.direction` 为空字符串时继承父列表的 `direction`；显式传值时覆盖父级配置。
3. `border-color` 为空字符串时使用主题变量 `var(--uvx-border)`，显式传色后才使用自定义颜色。
4. `link` 支持布尔值或 `navigateTo`、`redirectTo`、`reLaunch`、`switchTab`；`to` 非空时才会执行跳转。
5. `disabled` 时不会触发 `click`、跳转或开关交互；显示开关时，点击反馈由开关自身处理。
:::

## 基础用法

通过 `title` 和 `note` 设置列表项的标题与描述，通过 `border` 显示项间分隔线。

```vue
<template>
   <uvx-list>
      <uvx-list-item
         title="列表文字"
         note="列表描述信息"
         :border="true"
      ></uvx-list-item>
      <uvx-list-item
         title="禁用列表项"
         :disabled="true"
         :border="true"
      ></uvx-list-item>
   </uvx-list>
</template>
```

## 缩略图与扩展图标

`thumb` 有值时显示缩略图，`show-extra-icon` 配合 `extra-icon` 显示左侧扩展图标。`thumb-size` 支持 `lg`、`base`、`sm`。

```vue
<template>
   <uvx-list>
      <uvx-list-item
         title="列表左侧带缩略图"
         note="列表描述信息"
         thumb="https://cdn.uviewui.com/uview/album/1.jpg"
         thumb-size="lg"
      ></uvx-list-item>
      <uvx-list-item
         title="列表左侧带扩展图标"
         :show-extra-icon="true"
         :extra-icon="EXTRA_ICON"
      ></uvx-list-item>
   </uvx-list>
</template>

<script lang="uts" setup>
import type { ExtraIcon } from "@/uni_modules/uvx-ui/components/uvx-list-item/types/index.uts";

const EXTRA_ICON: ExtraIcon = {
   icon: "photo",
   color: "primary",
   size: 20,
   customPrefix: "",
};
</script>
```

## 徽标与开关

`show-badge` 复用 `uvx-badge` 的配置，`show-switch` 复用 `uvx-switch`。开关变更通过 `switch-change` 返回布尔值。

```vue
<template>
   <uvx-list>
      <uvx-list-item
         title="未读消息"
         :show-badge="true"
         :badge="BADGE"
      ></uvx-list-item>
      <uvx-list-item
         title="接收通知"
         :show-switch="true"
         :switch-checked="checked"
         @switch-change="handleSwitchChange"
      ></uvx-list-item>
   </uvx-list>
</template>

<script lang="uts" setup>
import type { Badge } from "@/uni_modules/uvx-ui/components/uvx-list-item/types/index.uts";

const BADGE: Badge = {
   isDot: false,
   value: "12",
   max: 999,
   type: "error",
   showZero: false,
   bgColor: "",
   color: "",
   shape: "circle",
   numberType: "overflow",
   inverted: false,
};

const checked = ref(false);

/**
 * 更新开关状态
 * @param value 开关值
 * @returns null
 */
const handleSwitchChange = (value: boolean): void => {
   checked.value = value;
};
</script>
```

## 点击反馈与跳转

设置 `clickable` 开启点击反馈；设置 `link` 和 `to` 后显示箭头并跳转。

```vue
<template>
   <uvx-list>
      <uvx-list-item
         title="开启点击反馈"
         :clickable="true"
         @click="handleClick"
      ></uvx-list-item>
      <uvx-list-item
         title="打开单元格演示"
         link="navigateTo"
         to="/pages/layout/cell/cell"
      ></uvx-list-item>
   </uvx-list>
</template>

<script lang="uts" setup>
/**
 * 处理列表项点击
 * @returns null
 */
const handleClick = (): void => {
   console.log("list item clicked");
};
</script>
```

## 自定义插槽

默认插槽会替换列表项内置内容；`header`、`body`、`footer` 分别替换左侧、中间和右侧区域。

```vue
<template>
   <uvx-list>
      <uvx-list-item>
         <view class="custom-row">
            <uvx-icon name="star-fill" color="warning" :size="18"></uvx-icon>
            <text class="custom-row__text">完全自定义内容</text>
         </view>
      </uvx-list-item>
   </uvx-list>
</template>
```

## 长列表与触底事件

App、H5 和鸿蒙端由原生 `list-view` 触发 `scrolltolower`；微信小程序端由页面触发 `onReachBottom`。建议将追加数据逻辑抽成同一个函数，并使用条件编译分别绑定触底入口。微信端页面必须保持可滚动，不要在页面配置中设置 `disableScroll: true`。

```vue
<template>
   <uvx-list
      <!-- #ifndef MP-WEIXIN -->
      @scrolltolower="handleScrollToLower"
      <!-- #endif -->
   >
      <uvx-list-item
         v-for="item in items"
         :key="item.id"
         :title="item.title"
      ></uvx-list-item>
   </uvx-list>
</template>

<script lang="uts" setup>
type Item = {
   id: number;
   title: string;
};

/**
 * 创建列表数据
 * @param start 起始编号
 * @param count 创建数量
 * @returns Item[]
 */
const createItems = (start: number, count: number): Item[] => {
   const result: Item[] = [];
   for (let index = 0; index < count; index++) {
      const id = start + index;
      result.push({
         id,
         title: `列表长度-${id}`,
      });
   }
   return result;
};

const items = ref<Item[]>(createItems(1, 20));

/**
 * 追加下一页数据
 * @returns null
 */
const appendItems = (): void => {
   const start = items.value.length + 1;
   const nextItems = createItems(start, 20);
   for (let index = 0; index < nextItems.length; index++) {
      items.value.push(nextItems[index]);
   }
};

// #ifndef MP-WEIXIN
/**
 * 处理列表容器触底
 * @param event 滚动到底部事件
 * @returns null
 */
const handleScrollToLower = (_event: UniScrollToLowerEvent): void => {
   appendItems();
};
// #endif

// #ifdef MP-WEIXIN
onReachBottom((): void => {
   appendItems();
});
// #endif
</script>
```

## API

### `uvx-list` Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `border` | 是否显示上下边框 | `boolean` | `false` | 全部 |
| `border-color` | 边框颜色，空值时跟随主题 | `string` | `""` | 全部 |
| `direction` | 子项默认排版方向 | `row \| column` | `row` | 全部 |
| `padding` | 子项默认内边距，支持数字或 CSS 尺寸字符串 | `string \| number` | `"20rpx 30rpx"` | 全部 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 根节点外部样式类 | `string` | `""` | 全部 |

### `uvx-list` Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `scroll` | 列表滚动时触发 | `UniScrollEvent` | 全部 |
| `scrolltolower` | 列表容器滚动到底部时触发；微信小程序使用页面 `onReachBottom` | `UniScrollToLowerEvent` | 除微信外 |

### `uvx-list` Slots

| 名称 | 说明 | 平台 |
| :---: | :---: | :---: |
| `default` | 放置 `uvx-list-item` | 全部 |

### `uvx-list-item` Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `direction` | 排版方向，空值时继承父列表 | `"" \| row \| column` | `""` | 全部 |
| `title` | 标题 | `string` | `""` | 全部 |
| `note` | 描述 | `string` | `""` | 全部 |
| `ellipsis` | 标题最大行数，支持 `0-5` | `number` | `0` | 全部 |
| `disabled` | 是否禁用 | `boolean` | `false` | 全部 |
| `clickable` | 是否开启点击反馈 | `boolean` | `false` | 全部 |
| `show-arrow` | 是否显示右侧箭头 | `boolean` | `false` | 全部 |
| `link` | 是否启用链接或指定路由方式 | `boolean \| navigateTo \| redirectTo \| reLaunch \| switchTab` | `false` | 全部 |
| `to` | 跳转目标地址 | `string` | `""` | 全部 |
| `show-switch` | 是否显示开关 | `boolean` | `false` | 全部 |
| `switch-checked` | 开关是否选中 | `boolean` | `false` | 全部 |
| `show-badge` | 是否显示徽标 | `boolean` | `false` | 全部 |
| `badge` | 徽标配置，字段与 `uvx-badge` 对应 | `Badge` | 主题默认配置 | 全部 |
| `right-text` | 右侧文字 | `string` | `""` | 全部 |
| `thumb` | 左侧缩略图地址 | `string` | `""` | 全部 |
| `thumb-size` | 缩略图尺寸 | `lg \| base \| sm` | `base` | 全部 |
| `show-extra-icon` | 是否显示扩展图标 | `boolean` | `false` | 全部 |
| `extra-icon` | 扩展图标配置 | `ExtraIcon` | 空图标配置 | 全部 |
| `border` | 是否显示与上一项之间的分隔线 | `boolean` | `false` | 全部 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 根节点外部样式类 | `string` | `""` | 全部 |

### `uvx-list-item` Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `click` | 点击有效列表项时触发；禁用或无交互配置时不触发 | 无 | 全部 |
| `switch-change` | 开关值变化时触发 | `boolean` | 全部 |

### `uvx-list-item` Slots

| 名称 | 说明 | 平台 |
| :---: | :---: | :---: |
| `default` | 完全替换列表项内置内容 | 全部 |
| `header` | 自定义左侧或顶部内容 | 全部 |
| `body` | 自定义中间内容 | 全部 |
| `footer` | 自定义右侧或底部内容 | 全部 |

## 参考

- [uni-app x list-view 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/list-view.html)
- [uni-app x list-item 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/list-item.html)
- [uvx-badge 徽标数](./badge)
- [uvx-switch 开关选择器](./switch)
