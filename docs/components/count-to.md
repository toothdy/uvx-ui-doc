<h5-demo src="pages/data/count-to/count-to" title="CountTo 数字滚动" />

# CountTo 数字滚动

`uvx-count-to` 将数字从起始值滚动到目标值，支持正向、倒计数、缓动、小数、千分位和实例控制。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 正向滚动、倒计数和缓动 | √ | √ | √ | √ | √ |
| 小数、千分位和样式 | √ | √ | √ | √ | √ |
| 开始、暂停和继续控制 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. `autoplay=true` 时，组件挂载以及 `start-val`、`end-val` 变化后都会从起始值重新执行。
2. `start()` 从 `start-val` 重新开始；`stop()` 暂停；`restart()` 在暂停和继续之间切换，并不是从头重播。
3. `duration` 小于 `0` 时按 `0` 处理；时长为 `0` 或起止值相同时会立即完成并触发 `end`。
4. `separator` 必须是非空且非数字字符串才会用于千分位；`decimals` 小于 `0` 时按 `0` 处理。

:::

## 基础用法

```vue
<template>
   <uvx-count-to :end-val="3000" @end="handleEnd"></uvx-count-to>
</template>
```

## 倒计数

`start-val` 大于 `end-val` 时自动按倒计数处理。

```vue
<uvx-count-to :start-val="300" :end-val="0"></uvx-count-to>
```

## 小数和分隔符

```vue
<template>
   <uvx-count-to
      :start-val="100"
      :end-val="10.55"
      :decimals="2"
      decimal="."
   ></uvx-count-to>
   <uvx-count-to
      :start-val="2000"
      :end-val="1542"
      separator=","
   ></uvx-count-to>
</template>
```

## 关闭缓动

```vue
<uvx-count-to
   :end-val="1000"
   :duration="1000"
   :use-easing="false"
></uvx-count-to>
```

## 手动控制

```vue
<template>
   <uvx-count-to
      ref="uCountTo"
      :end-val="3000"
      :autoplay="false"
   ></uvx-count-to>
</template>

<script lang="uts" setup>
const uCountTo = ref<UvxCountToComponentPublicInstance | null>(null);

const handleStart = (): void => {
   uCountTo.value?.start();
};

const handlePauseOrResume = (): void => {
   uCountTo.value?.restart();
};
</script>
```

## 自定义样式

```vue
<uvx-count-to
   :end-val="3000"
   color="#909399"
   :font-size="40"
   :bold="true"
   u-style="line-height: 48px;"
></uvx-count-to>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `start-val` | 起始值，无法转为数字时按 `0` | `string \| number` | `0` | 全部 |
| `end-val` | 目标值，无法转为数字时按 `0` | `string \| number` | `0` | 全部 |
| `duration` | 动画时长，单位 ms | `string \| number` | `2000` | 全部 |
| `autoplay` | 是否挂载后自动开始，并响应起止值变化 | `boolean` | `true` | 全部 |
| `decimals` | 小数位数 | `string \| number` | `0` | 全部 |
| `use-easing` | 是否使用缓动计算 | `boolean` | `true` | 全部 |
| `decimal` | 小数分隔符 | `string \| number` | `.` | 全部 |
| `color` | 数字颜色 | `string` | `#606266` | 全部 |
| `font-size` | 数字字号 | `string \| number` | `22` | 全部 |
| `bold` | 是否加粗 | `boolean` | `false` | 全部 |
| `separator` | 千分位分隔符 | `string` | `""` | 全部 |
| `u-style` | 文本节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到文本节点的外部样式类 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `end` | 动画到达目标值时触发 | - | 全部 |

### Methods

| 方法 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `start()` | 从 `start-val` 重新开始 | - | 全部 |
| `stop()` | 暂停当前动画 | - | 全部 |
| `restart()` | 在暂停和继续之间切换 | - | 全部 |

## 参考

- [uni-app x 定时器官方文档](https://doc.dcloud.net.cn/uni-app-x/api/timer.html)
