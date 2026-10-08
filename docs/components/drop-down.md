<h5-demo src="pages/form/drop-down/drop-down" title="DropDown 下拉筛选" />

# DropDown 下拉筛选

`uvx-drop-down` 用于页面顶部或列表顶部的条件筛选，由菜单容器、菜单项和筛选弹层三个组件配合完成。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 5.21+ | 5.11+ | 5.0+ | 4.0+ | 4.41+ |

小程序端仅支持微信。App Vapor 模式的最低版本由 `provide/inject` 组件通信能力决定。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 菜单项、筛选弹层、遮罩关闭 | √ | √ | √ | √ | √ |
| 普通值与激活值状态 | √ | √ | √ | √ | √ |
| 默认列表与自定义弹层插槽 | √ | √ | √ | √ | √ |
| 菜单吸顶 | 需滚动回调 | 需滚动回调 | 需滚动回调 | √ | √ |
| 暗色主题与自定义颜色 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. `uvx-drop-down`、`uvx-drop-down-item` 和 `uvx-drop-down-popup` 需要配合使用；容器与弹层的 `sign` 必须一致，同一页面的多组筛选应使用不同 `sign`。
2. `default-value` 默认为 `[0, "0", "all"]`。菜单项 `value` 命中其中任一值时使用普通状态，否则使用激活状态。
3. `type="1"` 只切换当前项的布尔激活状态，不打开弹层；`type="2"` 打开同 `sign` 的筛选弹层。
4. App 页面通过 `scroll-view` 滚动时，应在滚动事件中调用 `uvx-drop-down` 的 `init()`，用于更新吸顶状态和弹层位置。Web、微信端使用原生 `position: sticky`，滚动后仍建议调用 `init()` 刷新弹层锚点。
5. `current-drop-item.activeIndex` 控制选中项外观，点击默认选项时组件会先同步该索引，再发送 `clickItem`；使用方切换菜单数据时仍应提供对应的当前索引。
6. `text-color`、`text-active-color` 及菜单数据中的 `color`、`activeColor` 默认均为空字符串，此时使用主题文本色和主色；显式颜色不会随主题切换。
7. 弹层应放在页面内容末尾。App 的 `fixed` 节点会提升到页面根层级，组件通过 `z-index` 与锚点位置控制覆盖范围。
:::

## 基础用法

三个组件通过相同的 `sign` 建立关联。`uvx-drop-down-item` 必须是 `uvx-drop-down` 的后代节点。

```vue
<template>
   <uvx-drop-down
      ref="uDropDown"
      sign="document-filter"
      @click="handleMenuClick"
   >
      <uvx-drop-down-item
         name="order"
         type="2"
         label="综合排序"
         value="all"
      ></uvx-drop-down-item>
      <uvx-drop-down-item
         name="vip"
         type="1"
         label="VIP文档"
         :value="0"
      ></uvx-drop-down-item>
   </uvx-drop-down>

   <uvx-drop-down-popup
      sign="document-filter"
      :current-drop-item="orderMenu"
      @clickItem="handleItemClick"
   ></uvx-drop-down-popup>
</template>

<script lang="uts" setup>
import type { ItemClickEvent } from "@/uni_modules/uvx-ui/components/uvx-drop-down/types/index.uts";
import type { Menu } from "@/uni_modules/uvx-ui/components/uvx-drop-down-popup/types/index.uts";

// 下拉筛选组件实例
const uDropDown = ref<UvxDropDownComponentPublicInstance | null>(null);
const orderMenu = ref<Menu>({
   activeIndex: 0,
   child: [
      { "label": "综合排序", "value": "all" },
      { "label": "最新发布", "value": "new" },
   ],
});

/**
 * 处理菜单点击
 * @param event 菜单点击参数
 * @returns null
 */
const handleMenuClick = (event: ItemClickEvent): void => {
   console.log(event.name, event.active, event.type);
};

/**
 * 处理筛选选项点击
 * @param item 选项数据
 * @returns null
 */
const handleItemClick = (item: UTSJSONObject): void => {
   console.log(item.getString("label", ""));
};
</script>
```

## 默认值与激活状态

`default-value` 定义“尚未筛选”的值。菜单项值不在该数组内时，文字和图标自动切换为激活外观。

```vue
<uvx-drop-down :default-value="[0, '0', 'all']">
   <uvx-drop-down-item label="综合排序" value="all"></uvx-drop-down-item>
   <uvx-drop-down-item label="最新发布" value="new"></uvx-drop-down-item>
</uvx-drop-down>
```

上例中“综合排序”为普通状态，“最新发布”为激活状态。

## 两种菜单项类型

`type="1"` 适合 VIP、仅看有货等开关条件；点击时 `click` 事件中的 `active` 在 `true` 与 `false` 间切换。`type="2"` 适合排序、分类等多选一条件；点击时打开或关闭弹层。

```vue
<uvx-drop-down sign="filter-types" @click="handleMenuClick">
   <uvx-drop-down-item
      name="category"
      type="2"
      label="全部分类"
      value="all"
   ></uvx-drop-down-item>
   <uvx-drop-down-item
      name="stock"
      type="1"
      label="仅看有货"
      :value="0"
   ></uvx-drop-down-item>
</uvx-drop-down>
```

## 弹层菜单数据

`current-drop-item.child` 是 `UTSJSONObject[]`。默认读取每项的 `label` 字段，可通过 `key-name` 改为其他字段；`activeIndex` 控制选中项外观。

```uts
import type { Menu } from "@/uni_modules/uvx-ui/components/uvx-drop-down-popup/types/index.uts";

const categoryMenu = ref<Menu>({
   activeIndex: 1,
   size: 14,
   activeSize: 15,
   itemCustomStyle: "padding-left: 20px;",
   itemActiveCustomStyle: "padding-left: 20px;",
   child: [
      { "label": "全部分类", "value": "all" },
      { "label": "技术文档", "value": "technology" },
   ],
});
```

## 自定义颜色与图标

容器级颜色和图标会下发到全部菜单项。颜色为空时使用暗色主题可切换的语义颜色。

```vue
<template>
   <uvx-drop-down
      text-color="#606266"
      text-active-color="#2979ff"
      :extra-icon="NORMAL_ICON"
      :extra-active-icon="ACTIVE_ICON"
   >
      <uvx-drop-down-item label="综合排序"></uvx-drop-down-item>
   </uvx-drop-down>
</template>

<script lang="uts" setup>
import type { Icon } from "@/uni_modules/uvx-ui/components/uvx-drop-down/types/index.uts";

// 普通状态图标
const NORMAL_ICON: Icon = {
   name: "arrow-down-fill",
   size: 13,
   color: "#606266",
};
// 激活状态图标
const ACTIVE_ICON: Icon = {
   name: "arrow-up-fill",
   size: 13,
   color: "#2979ff",
};
</script>
```

## 自定义弹层内容

`uvx-drop-down-popup` 的默认插槽会替换内置选项列表。遮罩、定位、打开关闭和 `popupChange` 事件仍由组件处理。

```vue
<uvx-drop-down-popup sign="custom-filter">
   <view class="custom-filter-panel">
      <text>自定义筛选内容</text>
   </view>
</uvx-drop-down-popup>
```

## 吸顶与位置更新

App 演示页使用 `uvx-page` 的滚动事件更新位置；普通页面在 `onPageScroll` 中调用相同方法。

```vue
<template>
   <uvx-page @scroll="handleScroll">
      <uvx-drop-down ref="uDropDown" sign="sticky-filter">
         <uvx-drop-down-item label="排序"></uvx-drop-down-item>
      </uvx-drop-down>
      <uvx-drop-down-popup sign="sticky-filter"></uvx-drop-down-popup>
   </uvx-page>
</template>

<script lang="uts" setup>
// 下拉筛选组件实例
const uDropDown = ref<UvxDropDownComponentPublicInstance | null>(null);

/**
 * 更新筛选栏位置
 * @param _event 滚动事件
 * @returns null
 */
const handleScroll = (_event: UniScrollEvent): void => {
   uDropDown.value?.init();
};
</script>
```

## API

### DropDown Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `is-sticky` | 是否启用吸顶；App 需在滚动时调用 `init()` | `boolean` | `true` | 全部 |
| `sign` | 组件通信标识，需与弹层一致 | `string \| number` | `UVDROPDOWN` | 全部 |
| `default-value` | 未筛选状态的值集合 | `Value[]` | `[0, "0", "all"]` | 全部 |
| `text-size` | 普通菜单文字字号，数字默认补充 px | `string \| number` | `15px` | 全部 |
| `text-color` | 普通菜单文字颜色；空值跟随主题 | `string` | `""` | 全部 |
| `text-active-size` | 激活菜单文字字号，数字默认补充 px | `string \| number` | `15px` | 全部 |
| `text-active-color` | 激活菜单文字颜色；空值使用主题主色 | `string` | `""` | 全部 |
| `extra-icon` | 普通图标配置 | `Icon` | `{ name: "arrow-down", size: 15, color: "" }` | 全部 |
| `extra-active-icon` | 激活图标配置 | `Icon` | `{ name: "arrow-up", size: 15, color: "primary" }` | 全部 |
| `u-style` | 菜单栏自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 菜单栏外部类名 | `string` | `""` | 全部 |

### DropDownItem Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `name` | 字段标识，会原样传入点击事件 | `string \| number` | `""` | 全部 |
| `type` | `1` 直接切换，`2` 打开弹层 | `string \| number` | `2` | 全部 |
| `label` | 菜单文字 | `string` | `""` | 全部 |
| `value` | 当前筛选值 | `string \| number \| null` | `""` | 全部 |
| `is-drop` | 外部控制当前项是否展开 | `boolean` | `false` | 全部 |
| `u-style` | 菜单项根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 菜单项根节点外部类名 | `string` | `""` | 全部 |

### DropDownPopup Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `sign` | 组件通信标识，需与容器一致 | `string \| number` | `UVDROPDOWN` | 全部 |
| `z-index` | 弹层层级 | `string \| number` | `999` | 全部 |
| `opacity` | 遮罩透明度，超出 `0-1` 时自动限制 | `string \| number` | `0.5` | 全部 |
| `click-overlay-on-close` | 点击遮罩是否关闭弹层 | `boolean` | `true` | 全部 |
| `current-drop-item` | 当前筛选菜单数据 | `Menu` | `{ activeIndex: 0, child: [] }` | 全部 |
| `key-name` | 选项文字字段名 | `string` | `label` | 全部 |
| `u-style` | 遮罩自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 遮罩外部类名 | `string` | `""` | 全部 |

### Icon

| 字段 | 说明 | 类型 | 必填 |
| :---: | :---: | :---: | :---: |
| `name` | `uvx-icon` 图标名称 | `string` | 是 |
| `size` | 图标尺寸，数字默认补充 px | `string \| number` | 是 |
| `color` | 图标颜色；可使用 `primary` 等主题类型 | `string` | 是 |

### Menu

| 字段 | 说明 | 类型 | 必填 |
| :---: | :---: | :---: | :---: |
| `activeIndex` | 当前选中项索引 | `number` | 是 |
| `child` | 筛选选项列表 | `UTSJSONObject[]` | 是 |
| `label` | 菜单默认文字，供业务回退使用 | `string` | 否 |
| `value` | 菜单默认值 | `string \| number \| null` | 否 |
| `color` | 普通选项文字颜色，空值跟随主题 | `string` | 否 |
| `activeColor` | 选中项文字颜色，空值使用主题主色 | `string` | 否 |
| `size` | 普通选项文字字号 | `string \| number` | 否 |
| `activeSize` | 选中项文字字号 | `string \| number` | 否 |
| `itemCustomStyle` | 普通选项样式，CSS 字符串 | `string` | 否 |
| `itemActiveCustomStyle` | 选中项样式，CSS 字符串 | `string` | 否 |

### Events

| 组件 | 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `uvx-drop-down` | `click` | 点击任一菜单项 | `{ name, active, type }` | 全部 |
| `uvx-drop-down-item` | `click` | 点击当前菜单项 | `{ name, active, type }` | 全部 |
| `uvx-drop-down-popup` | `clickItem` | 点击默认筛选选项 | `UTSJSONObject` | 全部 |
| `uvx-drop-down-popup` | `popupChange` | 弹层打开或关闭 | `{ show: boolean }` | 全部 |

### Slots

| 组件 | 名称 | 说明 | 平台 |
| :---: | :---: | :---: | :---: |
| `uvx-drop-down` | `default` | 放置 `uvx-drop-down-item` | 全部 |
| `uvx-drop-down-popup` | `default` | 替换默认筛选选项列表 | 全部 |

### Methods

| 组件 | 方法 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `uvx-drop-down` | `init()` | 更新吸顶状态和弹层锚点位置 | - | 全部 |

## 参考

- [uni-app x 组件与 provide/inject](https://doc.dcloud.net.cn/uni-app-x/vue/component.html)
- [uni-app x UniElement](https://doc.dcloud.net.cn/uni-app-x/api/dom/unielement.html)
- [uni-app x position](https://doc.dcloud.net.cn/uni-app-x/css/position.html)
- [uni-app x z-index](https://doc.dcloud.net.cn/uni-app-x/css/z-index.html)
- [uni-app x 事件总线](https://doc.dcloud.net.cn/uni-app-x/api/event-bus.html)
