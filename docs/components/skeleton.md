<h5-demo src="pages/data/skeleton/skeleton" title="Skeleton 骨架屏" />

# Skeleton 骨架屏

`uvx-skeleton` 在接口数据加载期间展示占位结构，支持线条、头像、横向并列、自定义占位块和垂直间距，加载完成后通过默认插槽显示真实内容。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

小程序端仅支持微信。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| line、avatar、flex、custom、gap 配置 | √ | √ | √ | √ | √ |
| 默认插槽 | √ | √ | √ | √ | √ |
| `animate` 原生动画 | √ | √ | √ | √ | √ |
| 暗色主题变量 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. `loading` 默认为 `true`。为 `false` 时组件只渲染默认插槽内容。
2. `skeleton` 必须是数组；数组项可以是配置对象或数字。数字表示垂直间距，数字单位为 `rpx`。
3. `style` 支持 CSS 字符串、`UTSJSONObject` 或同类型数组。样式数组中使用空字符串表示该项不覆盖默认样式，不使用 `null`。
4. `num` 未传时为 `1`，传入 `0` 或负数时不生成节点；`gap` 传入 `0` 或空字符串时不生成重复节点之间的间距。
5. `round` 只影响线条和基础占位节点的圆角，头像始终保持圆形；`custom` 节点的圆角由自身 `style` 决定。
6. `animate` 使用组件内部动画引擎驱动横向扫光高亮，节点较多的复杂页面建议关闭动画以降低原生帧更新开销。
7. 骨架屏不会测量真实内容高度，复杂布局应通过 `style` 显式设置宽高。

:::

## 基础使用

使用 `type` 和 `num` 创建多条线形占位内容。`gap` 控制重复节点之间的间距。

```vue
<template>
   <uvx-skeleton
      :loading="loading"
      :skeleton="skeleton"
   >
      <uvx-text text="数据加载完成" type="content"></uvx-text>
   </uvx-skeleton>
</template>

<script lang="uts" setup>
import type { Config } from "@/uni_modules/uvx-ui/components/uvx-skeleton/types/index.uts";

const loading = ref(true);
const skeleton = ref<Config>([
   { type: "line", num: 3, gap: "20rpx" },
]);
</script>
```

## 头像占位

`avatar` 默认生成圆形占位块，可通过样式调整尺寸。`avatar--sm` 和 `avatar--lg` 类名也可以通过自定义 `uClass` 扩展样式。

```vue
<template>
   <uvx-skeleton
      :skeleton="avatarSkeleton"
   ></uvx-skeleton>
</template>

<script lang="uts" setup>
import type { Config } from "@/uni_modules/uvx-ui/components/uvx-skeleton/types/index.uts";

const avatarSkeleton: Config = [
   { type: "avatar", style: "width: 50rpx; height: 50rpx;" },
];
</script>
```

## 横向并列布局

`flex` 使用 `children` 声明横向子分组。普通子分组会自动占据剩余空间，头像和自定义块保持自身尺寸。

```vue
<template>
   <uvx-skeleton
      :skeleton="skeleton"
      :animate="true"
   ></uvx-skeleton>
</template>

<script lang="uts" setup>
import type { Config } from "@/uni_modules/uvx-ui/components/uvx-skeleton/types/index.uts";

const skeleton: Config = [
   {
      type: "flex",
      children: [
         { type: "avatar", style: "margin-right: 10rpx;" },
         { type: "line", num: 3, gap: "20rpx" },
      ],
   },
];
</script>
```

## 自定义样式

`style` 可以传入 CSS 字符串；当同一类型通过 `num` 重复生成时，传入样式数组为每一个节点指定样式。数组长度不足的节点使用默认样式。

```vue
<template>
   <uvx-skeleton :skeleton="skeleton"></uvx-skeleton>
</template>

<script lang="uts" setup>
import type { Config } from "@/uni_modules/uvx-ui/components/uvx-skeleton/types/index.uts";

const skeleton: Config = [
   {
      type: "line",
      num: 4,
      style: [
         "width: 200rpx;",
         "",
         "",
         "width: 500rpx;",
      ],
   },
];
</script>
```

## 自定义占位块和间距

`custom` 不设置默认尺寸，适合图片、卡片等需要自定义宽高的区域；数字配置项表示垂直间距。

```vue
<template>
   <uvx-skeleton :skeleton="skeleton"></uvx-skeleton>
</template>

<script lang="uts" setup>
import type { Config } from "@/uni_modules/uvx-ui/components/uvx-skeleton/types/index.uts";

const skeleton: Config = [
   { type: "custom", style: "width: 100%; height: 160rpx;" },
   30,
   { type: "line", num: 2, gap: "20rpx" },
];
</script>
```

## 圆角和动画

`round` 让线条和普通占位块使用胶囊形圆角，`animate` 控制占位节点的横向扫光动画。

```vue
<template>
   <uvx-skeleton
      :skeleton="skeleton"
      :round="true"
      :animate="false"
   ></uvx-skeleton>
</template>

<script lang="uts" setup>
import type { Config } from "@/uni_modules/uvx-ui/components/uvx-skeleton/types/index.uts";

const skeleton: Config = [
   { type: "line", num: 3 },
];
</script>
```

## 自定义根节点样式

`uStyle` 设置根节点 CSS 字符串，`uClass` 追加外部样式类。

```vue
<template>
   <uvx-skeleton
      :skeleton="rootSkeleton"
      u-class="profile-skeleton"
      u-style="padding: 20rpx;"
   ></uvx-skeleton>
</template>

<script lang="uts" setup>
import type { Config } from "@/uni_modules/uvx-ui/components/uvx-skeleton/types/index.uts";

const rootSkeleton: Config = [
   { type: "line", num: 2 },
];
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `loading` | 是否显示骨架屏，关闭后显示默认插槽 | `boolean` | `true` | 全部 |
| `skeleton` | 骨架屏配置数组，数组项为配置对象或数字间距 | `Config` | `[]` | 全部 |
| `animate` | 是否开启动画 | `boolean` | `true` | 全部 |
| `round` | 是否使用胶囊形圆角 | `boolean` | `false` | 全部 |
| `u-style` | 根节点 CSS 样式字符串 | `string` | `""` | 全部 |
| `u-class` | 根节点外部样式类 | `string` | `""` | 全部 |

### Config

| 字段 | 说明 | 类型 | 默认值 |
| :---: | :---: | :---: | :---: |
| `type` | 节点类型：`line`、`avatar`、`flex`、`custom`、`gap` | `NodeType` | `line` |
| `num` | 重复生成数量，非正数不生成节点 | `number` | 未设置时内部按 `1` 处理 |
| `style` | 节点样式或按重复节点下标指定的样式数组 | `string \| UTSJSONObject \| Array<string \| UTSJSONObject>` | `""` |
| `gap` | 重复节点之间的间距，数字单位为 `rpx` | `string \| number` | 未设置时内部按 `"20rpx"` 处理 |
| `children` | `flex` 的横向子配置 | `Array<Item>` | `[]` |
| `height` | `gap` 类型节点的高度，数字单位为 `rpx` | `string \| number` | `0` |

数字配置项直接表示垂直间距，数字单位为 `rpx`。

### Slots

| 插槽名 | 说明 | 平台 |
| :---: | :---: | :---: |
| `default` | `loading=false` 时显示的真实内容 | 全部 |

### Events

组件没有自定义事件。

## 参考

- [uni-app x 组件开发](https://uniapp.dcloud.net.cn/uni-app-x/)
- [UTS 类型系统](https://doc.dcloud.net.cn/uni-app-x/uts/data-type.html)
- [uni-app x 动画 API](https://uniapp.dcloud.net.cn/uni-app-x/api/animation.html)
