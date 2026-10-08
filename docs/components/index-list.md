<h5-demo src="pages/data/index-list/index-list" title="IndexList 索引列表" />

# IndexList 索引列表

`uvx-index-list` 用于展示按字母或自定义索引分组的长列表，右侧索引栏支持点击和连续滑动定位，常用于联系人、城市与机场列表。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 4.41+ | 4.41+ | 4.61+ | 4.41+ | 4.41+ |

小程序端仅支持微信。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 纵向滚动、索引触摸定位 | √ | √ | √ | √ | √ |
| `header`、`default`、`footer` 插槽 | √ | √ | √ | √ | √ |
| 暗色主题和自定义颜色 | √ | √ | √ | √ | √ |
| `init()` 动态重新测量 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. `uvx-index-list`、`uvx-index-item`、`uvx-index-anchor` 必须组合使用；索引列表顺序需要与分组渲染顺序一致。
2. `index-list` 为空数组时自动生成 `A-Z`，不是隐藏索引栏。需要自定义索引时传入完整数组。
3. 组件内部已经包含纵向 `scroll-view`，页面应避免再套可滚动容器。演示页通过 `disableScroll` 和 `uvx-page direction="none"` 禁用页面滚动。
4. 项目使用 `uvx-navbar` 作为系统导航栏时，无需额外传入导航栏高度；只有使用非标准自定义导航栏时，才需要配置 `custom-nav-height`。
5. 分组内容异步加载或高度发生变化后，调用公开的 `init()` 重新测量，否则索引定位仍使用旧布局。
6. `select` 在触摸结束时触发，返回 `index` 和 `value` 两个参数；只接收第一个参数的旧代码仍然有效。
7. `active-color`、`inactive-color`、锚点 `color` 和 `bg-color` 为空时跟随主题；显式传色后不再随暗色主题变化。

:::

## 基础用法

索引值、分组和锚点按相同顺序渲染。`uvx-index-item` 包裹一个完整分组，`uvx-index-anchor` 放在分组顶部。

```vue
<template>
   <uvx-index-list
      :index-list="INDEX_LIST"
      @select="handleSelect"
   >
      <uvx-index-item
         v-for="(group, index) in GROUPS"
         :key="index"
         :index="group.index"
      >
         <uvx-index-anchor :text="group.index"></uvx-index-anchor>
         <view
            v-for="(name, nameIndex) in group.names"
            :key="nameIndex"
            class="contact-row"
         >
            <text>{{ name }}</text>
         </view>
      </uvx-index-item>
   </uvx-index-list>
</template>

<script lang="uts" setup>
import type { Value } from "@/uni_modules/uvx-ui/components/uvx-index-list/types/index.uts";

type ContactGroup = {
   index: Value;
   names: string[];
};

const INDEX_LIST: Value[] = ["A", "B", "C"];
const GROUPS: ContactGroup[] = [
   { index: "A", names: ["阿明", "安然"] },
   { index: "B", names: ["白雪", "包容"] },
   { index: "C", names: ["陈晨", "程远"] },
];

/**
 * 处理索引选择
 * @param index 索引下标
 * @param value 索引值
 * @returns null
 */
const handleSelect = (index: number, value: Value): void => {
   console.log("选中索引", index, value);
};
</script>
```

## 头部和底部

`header` 位于首个分组之前，`footer` 位于全部分组之后。两者会跟随列表内容滚动。

```vue
<uvx-index-list :index-list="INDEX_LIST">
   <template #header>
      <view class="list-header">
         <text>常用联系人</text>
      </view>
   </template>

   <uvx-index-item>...</uvx-index-item>

   <template #footer>
      <view class="list-footer">
         <text>共 120 位联系人</text>
      </view>
   </template>
</uvx-index-list>
```

## 自定义索引颜色

索引颜色支持单独设置激活态和普通态。未传颜色时使用主题变量。

```vue
<uvx-index-list
   :index-list="INDEX_LIST"
   active-color="#5ac725"
   inactive-color="#909399"
>
   ...
</uvx-index-list>
```

## 自定义锚点

锚点支持文字颜色、背景、字号和高度。

```vue
<uvx-index-list
   :index-list="INDEX_LIST"
>
   <uvx-index-item>
      <uvx-index-anchor
         text="A"
         color="#ffffff"
         bg-color="#3c9cff"
         :size="15"
         :height="36"
      ></uvx-index-anchor>
   </uvx-index-item>
</uvx-index-list>
```

## 动态内容重新测量

分组内容异步更新后，通过组件实例调用 `init()`。

```vue
<template>
   <uvx-index-list ref="uIndexList" :index-list="INDEX_LIST">
      ...
   </uvx-index-list>
</template>

<script lang="uts" setup>
const uIndexList = ref<UvxIndexListComponentPublicInstance | null>(null);

/**
 * 数据加载完成后刷新布局
 * @returns null
 */
const handleDataLoaded = (): void => {
   uIndexList.value?.init();
};
</script>
```

## API

### IndexList Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `inactive-color` | 非激活索引颜色，为空时使用内容文本主题色 | `string` | `""` | 全部 |
| `active-color` | 激活索引背景色，为空时使用主题主色 | `string` | `""` | 全部 |
| `index-list` | 索引字符数组；空数组时自动生成 `A-Z` | `(string \| number)[]` | `[]` | 全部 |
| `custom-nav-height` | 非标准自定义导航栏的内容栏高度，支持 px 数值、`px` 和 `rpx`；使用 `uvx-navbar` 时无需传入 | `string \| number` | `0` | 全部 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到根节点的外部样式类 | `string` | `""` | 全部 |

### IndexList Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `select` | 触摸索引结束时触发 | `index: number, value: string \| number` | 全部 |

### IndexList Slots

| 名称 | 说明 | 平台 |
| :---: | :---: | :---: |
| `header` | 列表头部内容 | 全部 |
| `default` | 索引分组内容 | 全部 |
| `footer` | 列表底部内容 | 全部 |

### IndexList Methods

| 方法 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `init()` | 下一渲染周期重新测量索引栏和分组布局 | - | 全部 |

### IndexItem Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `index` | 分组标识；分组定位按渲染顺序对应 `index-list` | `string \| number` | `0` | 全部 |
| `u-style` | 分组根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到分组根节点的外部样式类 | `string` | `""` | 全部 |

### IndexItem Slots

| 名称 | 说明 | 平台 |
| :---: | :---: | :---: |
| `default` | 分组锚点和内容 | 全部 |

### IndexAnchor Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `text` | 锚点文字 | `string \| number` | `""` | 全部 |
| `color` | 锚点文字颜色，为空时使用内容文本主题色 | `string` | `""` | 全部 |
| `size` | 锚点文字大小，数字按 px 处理 | `string \| number` | `14` | 全部 |
| `bg-color` | 锚点背景色，为空时使用容器主题色 | `string` | `""` | 全部 |
| `height` | 锚点高度，数字按 px 处理 | `string \| number` | `32` | 全部 |
| `u-style` | 锚点根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到锚点根节点的外部样式类 | `string` | `""` | 全部 |

## 参考

- [uni-app x scroll-view 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/scroll-view.html)
- [uni-app x UniElement 官方文档](https://doc.dcloud.net.cn/uni-app-x/api/dom/unielement.html)
- [uni-app x view 组件官方文档](https://doc.dcloud.net.cn/uni-app-x/component/view.html)
