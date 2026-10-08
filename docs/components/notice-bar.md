<h5-demo src="pages/feedback/notice-bar/notice-bar" title="NoticeBar 滚动通知" />

# NoticeBar 滚动通知

`uvx-notice-bar` 用于在页面内展示简短公告，支持横向连续滚动、纵向轮播、横向步进和点击跳转。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 4.41+ | 4.41+ | 4.61+ | 4.41+ | 4.41+ |

横向连续滚动依赖 `UniElement.getBoundingClientRectAsync()` 测量文字和可见区域。小程序端仅支持微信。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 横向连续滚动、速度控制 | √ | √ | √ | √ | √ |
| 纵向轮播、横向步进、自动切换 | √ | √ | √ | √ | √ |
| 禁止手动切换轮播 `disable-touch` | √ | √ | √ | √ | × |
| 点击事件、关闭、页面跳转 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. `direction="row"` 且 `step=false` 时连续滚动；`direction="column"` 或 `step=true` 时使用轮播。`speed` 仅影响连续滚动，`duration` 仅影响轮播切换间隔。
2. `text` 默认是空数组。连续滚动通常传字符串；轮播传字符串数组，也可传对象数组并用 `key-name` 指定文字字段（默认 `text`）。
3. `click` 在连续滚动模式返回 `null`，在轮播模式返回当前索引；`change` 只在轮播切换时触发。关闭图标只触发 `close`，不会触发 `click`。
4. `url` 非空时点击通知会按 `link-type` 跳转，即使没有设置 `mode="link"`。`mode="link"` 只显示右箭头。
5. `disable-scroll` 只控制轮播自动切换，`disable-touch` 只控制轮播手动切换；微信小程序的原生 `swiper` 不支持 `disable-touch`，设置后仍可手动切换。
6. 颜色属性默认空字符串，由主题样式提供警告色文字和浅色背景；暗色主题下仍保留警告色背景。显式传入的颜色不随主题切换。`u-style` 接受 CSS 字符串。

:::

## 基础用法

默认展示左侧音量图标，横向连续滚动文字。

```vue
<template>
   <uvx-notice-bar text="这是一个消息通知"></uvx-notice-bar>
</template>
```

## 关闭与跳转

`mode="closable"` 显示关闭图标；`mode="link"` 显示右箭头。点击有 `url` 的通知时执行页面跳转。

```vue
<template>
   <uvx-notice-bar text="可关闭通知" mode="closable"></uvx-notice-bar>
   <uvx-notice-bar
      text="查看标签页面"
      mode="link"
      url="/pages/data/tags/tags"
   ></uvx-notice-bar>
</template>
```

## 滚动速度

`speed` 是横向连续滚动每秒移动的像素数，默认 `80`。

```vue
<template>
   <uvx-notice-bar text="滚动速度较快的通知" :speed="250"></uvx-notice-bar>
</template>
```

## 纵向与步进

`direction="column"` 纵向切换；`step` 在横向模式按项切换。`duration` 控制切换间隔，单位毫秒。

```vue
<template>
   <uvx-notice-bar :text="notices" direction="column" :duration="3000"></uvx-notice-bar>
   <uvx-notice-bar :text="notices" step></uvx-notice-bar>
</template>

<script lang="uts" setup>
// 通知内容
const notices: string[] = ["第一条通知", "第二条通知", "第三条通知"];
</script>
```

## 对象内容与事件

对象数组通过 `key-name` 读取文字。点击和切换事件的参数都是索引；连续滚动的点击参数为 `null`。

```vue
<template>
   <uvx-notice-bar
      :text="messages"
      key-name="title"
      direction="column"
      @click="handleClick"
      @change="handleChange"
   ></uvx-notice-bar>
</template>

<script lang="uts" setup>
// 对象通知内容
const messages: UTSJSONObject[] = [
   { title: "系统维护通知" },
   { title: "服务恢复通知" },
];

/**
 * 处理通知点击
 * @param index 当前索引
 * @returns null
 */
const handleClick = (index: number | null): void => {
   console.log("click", index);
};

/**
 * 处理通知切换
 * @param index 当前索引
 * @returns null
 */
const handleChange = (index: number): void => {
   console.log("change", index);
};
</script>
```

## 自定义样式

`color` 同时设置文字和图标颜色，`bg-color` 设置背景。`icon=false` 可隐藏左侧图标。

```vue
<template>
   <uvx-notice-bar
      text="自定义通知"
      color="#ffffff"
      bg-color="#f56c6c"
      :icon="false"
      :font-size="16"
      u-style="margin-top: 8px;"
   ></uvx-notice-bar>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `text` | 通知内容；字符串、字符串数组或对象数组 | `string \| string[] \| UTSJSONObject[]` | `[]` | 全部 |
| `key-name` | 对象通知项中的文字字段 | `string` | `text` | 全部 |
| `direction` | 滚动方向 | `row \| column` | `row` | 全部 |
| `step` | 横向模式是否按项轮播 | `boolean` | `false` | 全部 |
| `icon` | 左侧图标名称；`false` 或空字符串隐藏；`true` 使用音量图标 | `string \| boolean` | `volume` | 全部 |
| `mode` | 右侧图标模式 | `"" \| link \| closable` | `""` | 全部 |
| `color` | 自定义文字和图标颜色；空值使用主题警告色 | `string` | `""` | 全部 |
| `bg-color` | 自定义背景颜色；空值使用警告色浅色背景 | `string` | `""` | 全部 |
| `speed` | 连续滚动速度，单位 px/s；非正数回退到 80 | `string \| number` | `80` | 全部 |
| `font-size` | 文字字号；数字按 px 处理 | `string \| number` | `14` | 全部 |
| `duration` | 轮播切换间隔，单位 ms；非正数回退到 2000 | `string \| number` | `2000` | 全部 |
| `url` | 点击通知时跳转的页面路径 | `string` | `""` | 全部 |
| `link-type` | 页面跳转方式 | `navigateTo \| redirectTo \| reLaunch \| switchTab` | `navigateTo` | 全部 |
| `disable-touch` | 禁止用户手动切换轮播 | `boolean` | `true` | Android、iOS、鸿蒙、H5；微信不支持 |
| `disable-scroll` | 禁止轮播自动切换 | `boolean` | `false` | 全部 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 根节点追加外部类 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `click` | 点击通知主体时触发；关闭图标不触发 | 连续模式 `null`，轮播模式为当前索引 `number` | 全部 |
| `close` | 点击关闭图标并隐藏当前实例时触发 | 无 | 全部 |
| `change` | 轮播切换后触发 | 当前索引 `number` | 全部 |

## 参考

- [uni-app x swiper 组件](https://doc.dcloud.net.cn/uni-app-x/component/swiper.html)
- [uni-app x UniElement 测量 API](https://doc.dcloud.net.cn/uni-app-x/api/dom/unielement.html#getboundingclientrectasync)
- [uni-app x 页面跳转 API](https://doc.dcloud.net.cn/uni-app-x/api/router.html)
