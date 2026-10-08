<h5-demo src="pages/feedback/no-network/no-network" title="NoNetwork 无网络提示" />

# NoNetwork 无网络提示

`uvx-no-network` 自动获取并监听网络状态，在断网时显示全屏提示、重试按钮和结果反馈。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 获取并监听网络状态 | √ | √ | √ | √ | √ |
| 断网遮罩、重试和状态事件 | √ | √ | √ | √ | √ |
| 跳转系统设置入口 | √ | √ | √ | × | × |

::: warning 使用须知

1. 组件挂载时调用 `uni.getNetworkType`，随后通过 `uni.onNetworkStatusChange` 持续监听，卸载时会解除监听。
2. 点击重试会重新检查网络并显示 Toast，同时始终触发 `retry`；检查结果还会触发 `connected` 或 `disconnected`。
3. “前往设置”入口由 `APP` 条件编译控制，并依赖项目中的 `uvx-system-settings` 插件，H5 和小程序不显示。
4. 组件仅依据系统网络类型判断是否联网，不代表业务接口一定可访问。

:::

## 基础用法

组件无需传入显示状态，断网后自动覆盖页面。

```vue
<template>
   <uvx-no-network></uvx-no-network>
</template>
```

## 监听网络状态

```vue
<template>
   <uvx-no-network
      @connected="handleConnected"
      @disconnected="handleDisconnected"
      @retry="handleRetry"
   ></uvx-no-network>
</template>

<script lang="uts" setup>
const handleConnected = (): void => {
   console.log("connected");
};

const handleDisconnected = (): void => {
   console.log("disconnected");
};

const handleRetry = (): void => {
   console.log("retry");
};
</script>
```

## 自定义提示

`image` 支持 `uvx-icon` 内置图标名、图片地址与 base64 数据。

```vue
<template>
   <uvx-no-network
      tips="网络不可用，请检查后重试"
      image="empty-wifi-off"
      :z-index="10080"
   ></uvx-no-network>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `tips` | 无网络时的提示文案，使用组件国际化文本 | `string` | `哎呀，网络信号丢失` | 全部 |
| `z-index` | 全屏遮罩层级 | `string \| number` | 全局层级 | 全部 |
| `image` | 无网络时展示的图标，支持内置图标名、图片地址与 base64 | `string` | `empty-wifi-off` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `retry` | 点击重试按钮时触发 | - | 全部 |
| `connected` | 初次检测或状态变化判定网络已连接时触发 | - | 全部 |
| `disconnected` | 初次检测或状态变化判定网络断开时触发 | - | 全部 |

## 参考

- [uni.getNetworkType 官方文档](https://doc.dcloud.net.cn/uni-app-x/api/network/get-network-type.html)
- [uni.onNetworkStatusChange 官方文档](https://doc.dcloud.net.cn/uni-app-x/api/network/on-network-status-change.html)
