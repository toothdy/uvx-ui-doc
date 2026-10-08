<h5-demo src="pages/data/count-down/count-down" title="CountDown 倒计时" />

# CountDown 倒计时

`uvx-count-down` 根据给定时长展示剩余时间，支持自定义格式、毫秒刷新、插槽和实例控制。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 基础倒计时和格式化 | √ | √ | √ | √ | √ |
| 毫秒级刷新 | √ | √ | √ | √ | √ |
| 手动开始、暂停和重置 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. `time` 的单位是毫秒，无法解析或小于 `0` 时按 `0` 处理。
2. `auto-start=true` 时，组件挂载和 `time` 变化都会重置并开始倒计时。
3. `format` 支持 `DD`、`HH`、`mm`、`ss`、`SSS`；未写入较大单位时，剩余时间会折算到下一个单位。
4. `millisecond=true` 会提高刷新频率，适合短时倒计时，不建议用于大量同时运行的实例。
5. 倒计时结束时会依次触发 `pause` 和 `finish`。

:::

## 基础用法

```vue
<uvx-count-down :time="30 * 60 * 1000" @finish="handleFinish"></uvx-count-down>
```

## 自定义格式

格式占位符为 `DD` 天、`HH` 时、`mm` 分、`ss` 秒、`SSS` 毫秒。

```vue
<uvx-count-down
   :time="26 * 60 * 60 * 1000"
   format="DD天HH时mm分ss秒"
></uvx-count-down>
```

## 毫秒级渲染

```vue
<uvx-count-down
   :time="10 * 1000"
   format="ss:SSS"
   :millisecond="true"
></uvx-count-down>
```

## 自定义内容

监听 `change` 获取各时间单位，组件默认插槽可替换默认文本。

```vue
<uvx-count-down :time="time" @change="handleChange">
   <text>{{ timeData.minutes }}分{{ timeData.seconds }}秒</text>
</uvx-count-down>
```

## 手动控制

```vue
<template>
   <uvx-count-down
      ref="uCountDown"
      :time="5000"
      :auto-start="false"
   ></uvx-count-down>
</template>

<script lang="uts" setup>
const uCountDown = ref<UvxCountDownComponentPublicInstance | null>(null);

const handleStart = (): void => {
   uCountDown.value?.start();
};

const handlePause = (): void => {
   uCountDown.value?.pause();
};

const handleReset = (): void => {
   uCountDown.value?.reset();
};
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `time` | 倒计时时长，单位毫秒 | `string \| number` | `0` | 全部 |
| `format` | 时间格式，支持 `DD`、`HH`、`mm`、`ss`、`SSS` | `string` | `HH:mm:ss` | 全部 |
| `auto-start` | 是否挂载后自动开始，且响应 `time` 变化 | `boolean` | `true` | 全部 |
| `millisecond` | 是否按毫秒刷新 | `boolean` | `false` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `finish` | 倒计时结束时触发 | - | 全部 |
| `change` | 剩余时间变化时触发 | `TimeData` | 全部 |
| `start` | 开始倒计时时触发 | - | 全部 |
| `pause` | 暂停或结束时触发 | - | 全部 |
| `reset` | 重置完成时触发 | - | 全部 |

### Methods

| 方法 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `start()` | 从当前剩余时间开始倒计时 | - | 全部 |
| `pause()` | 暂停并保留当前剩余时间 | - | 全部 |
| `reset()` | 重置为 `time`，`auto-start=true` 时自动开始 | - | 全部 |

### Slots

| 插槽 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| default | 替换默认格式化文本 | - | 全部 |

`TimeData` 包含 `days`、`hours`、`minutes`、`seconds`、`milliseconds` 五个数字字段。

## 参考

- [uni-app x 定时器官方文档](https://doc.dcloud.net.cn/uni-app-x/api/timer.html)
