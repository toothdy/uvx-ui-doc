<h5-demo src="pages/form/code/code" title="Code 验证码倒计时" />

# Code 验证码倒计时

`uvx-code` 提供验证码倒计时状态、提示文本、页面离开后继续计时和实例控制；组件自身不渲染可见文字。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 倒计时、文本事件和实例控制 | √ | √ | √ | √ | √ |
| 页面隐藏后持久化并恢复倒计时 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. 组件根节点为 `display: none`，显示内容必须使用 `change` 事件同步到按钮或文本。
2. `start()` 在倒计时进行中不会重复启动，可通过公开的 `canGetCode` 判断当前是否允许开始。
3. `change-text` 只替换第一个 `x` 或 `X`；模板中应至少包含其中一个占位符。
4. `keep-running=true` 时使用 `${uniqueKey}_$uvxCountDownTimestamp` 作为本地存储键；同一页面多个实例必须使用不同 `unique-key`。
5. `reset()` 会停止计时、清理存储并发送 `end-text`，但不会触发 `end`。

:::

## 基础用法

```vue
<template>
   <uvx-button :text="tips" @click="handleGetCode"></uvx-button>
   <uvx-code ref="uCode" @change="handleChange"></uvx-code>
</template>

<script lang="uts" setup>
// 倒计时提示文字
const tips = ref("");
// 倒计时组件实例
const uCode = ref<UvxCodeComponentPublicInstance | null>(null);

/**
 * 同步倒计时文字
 * @param value 倒计时文字
 * @returns null
 */
const handleChange = (value: string): void => {
   tips.value = value;
};

/**
 * 开始倒计时
 * @returns null
 */
const handleGetCode = (): void => {
   if (uCode.value != null && uCode.value.canGetCode) uCode.value.start();
};
</script>
```

## 自定义文本和时长

```vue
<uvx-code
   ref="uCode"
   :seconds="30"
   start-text="发送验证码"
   change-text="X 秒后重试"
   end-text="重新发送"
   @change="handleChange"
></uvx-code>
```

## 页面离开后继续计时

```vue
<uvx-code
   ref="uCode"
   :keep-running="true"
   unique-key="login-sms"
   @change="handleChange"
></uvx-code>
```

页面隐藏或组件卸载时保存预计结束时间，重新显示或挂载时按剩余时间恢复。

## 重置倒计时

```uts
uCode.value?.reset();
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `seconds` | 倒计时秒数 | `number` | `60` | 全部 |
| `start-text` | 初始提示文字，使用组件国际化文本 | `string` | `获取验证码` | 全部 |
| `change-text` | 倒计时文字，第一个 `x` 或 `X` 替换为秒数 | `string` | `X秒重新获取` | 全部 |
| `end-text` | 倒计时结束及重置后的文字 | `string` | `重新获取` | 全部 |
| `keep-running` | 页面离开后是否持久化并恢复倒计时 | `boolean` | `false` | 全部 |
| `unique-key` | 持久化倒计时的唯一键前缀 | `string` | `code` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `change` | 初始、计时、结束或重置文字变化时触发 | `text: string` | 全部 |
| `start` | 成功开始或恢复倒计时时触发 | - | 全部 |
| `end` | 倒计时自然结束时触发 | - | 全部 |

### Methods

| 方法 / 属性 | 说明 | 类型 | 平台 |
| :---: | :---: | :---: | :---: |
| `start()` | 在可开始状态下启动倒计时 | `() => void` | 全部 |
| `reset()` | 停止计时、恢复秒数并清理持久化数据 | `() => void` | 全部 |
| `canGetCode` | 当前是否允许开始倒计时 | `boolean` | 全部 |

## 参考

- [uni-app x 数据缓存官方文档](https://doc.dcloud.net.cn/uni-app-x/api/storage.html)
