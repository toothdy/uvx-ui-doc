<h5-demo src="pages/feedback/notify/notify" title="Notify 消息提示" />

# Notify 消息提示

`uvx-notify` 从页面顶部滑入通知消息，支持四种主题、自动关闭、安全区、自定义图标和命令式调用。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 主题、自动关闭、自定义样式和状态栏安全区 | √ | √ | √ | √ | √ |
| 命令式配置、快捷主题方法和完成回调 | √ | √ | √ | √ | √ |
| H5 默认顶部偏移 `44px` | × | × | × | √ | × |

::: warning 使用须知

1. 组件通过实例方法显示；`show(options)` 的本次配置会覆盖对应 Props，未传字段继续使用 Props。
2. `duration` 大于 `0` 时自动关闭；设为 `0` 时保持显示，需调用 `close()`。
3. `complete` 只在计时结束自动关闭后执行；手动 `close()` 不执行该回调。
4. H5 端 `top` 解析为 `0` 时，源码自动使用 `44px`；其他端保持 `0`。

:::

## 基础用法

```vue
<template>
   <uvx-button text="显示通知" @click="handleShow"></uvx-button>
   <uvx-notify ref="uNotify"></uvx-notify>
</template>

<script lang="uts" setup>
const uNotify = ref<UvxNotifyComponentPublicInstance | null>(null);

const handleShow = (): void => {
   uNotify.value?.show({ message: "顶部提示" });
};
</script>
```

## 主题类型

`type` 支持 `primary`、`success`、`warning` 和 `error`。除 `primary` 外，组件会显示对应的默认语义图标。

```uts
uNotify.value?.success("保存成功");
uNotify.value?.warning("请检查输入");
uNotify.value?.error("提交失败");
uNotify.value?.primary("普通通知");
```

## 自定义样式

```vue
<uvx-notify
   ref="uNotify"
   color="#ffffff"
   bg-color="#000000"
   :font-size="16"
   u-style="padding-bottom: 4px;"
></uvx-notify>
```

## 安全区和持续显示

```uts
uNotify.value?.show({
   message: "持续显示的通知",
   duration: 0,
   safeAreaInsetTop: true,
});
```

## 完成回调

`complete` 只属于 `Options`，不是组件 Prop。

```uts
uNotify.value?.show({
   message: "即将关闭",
   duration: 2000,
   complete: (): void => {
      console.log("notify complete");
   },
});
```

## 自定义图标

```vue
<uvx-notify ref="uNotify">
   <template #icon>
      <uvx-icon name="bell" color="#ffffff" :size="20"></uvx-icon>
   </template>
</uvx-notify>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `top` | 通知距窗口顶部的距离 | `string \| number` | `0` | 全部；H5 的 `0` 转为 `44px` |
| `type` | 通知主题 | `primary \| success \| warning \| error` | `primary` | 全部 |
| `color` | 文字和默认图标颜色 | `string` | `#ffffff` | 全部 |
| `bg-color` | 自定义背景色；为空时使用主题类型样式 | `string` | `""` | 全部 |
| `message` | 通知内容 | `string` | `""` | 全部 |
| `duration` | 显示时长，单位 ms；`0` 不自动关闭 | `string \| number` | `3000` | 全部 |
| `font-size` | 文字大小，默认图标尺寸为其 `1.3` 倍 | `string \| number` | `15` | 全部 |
| `safe-area-inset-top` | 是否插入顶部状态栏安全区 | `boolean` | `false` | 全部 |
| `u-style` | 通知内容自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 通知内容追加类名 | `string` | `""` | 全部 |

### Options

`show(options)` 支持全部 Props 字段，并额外支持以下字段：

| 字段 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `complete` | 自动关闭后的回调 | `(() => void) \| null` | `null` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `open` | `show()` 显示通知时触发 | - | 全部 |
| `close` | 自动关闭或调用 `close()` 时触发 | - | 全部 |

### Slots

| 名称 | 说明 | 平台 |
| :---: | :---: | :---: |
| `icon` | 自定义图标；使用后替换默认语义图标 | 全部 |

### Methods

| 方法 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `show(options?)` | 合并配置并显示通知 | `Options \| null` | 全部 |
| `close()` | 手动关闭通知 | - | 全部 |
| `primary(message)` | 显示主要通知 | `string` | 全部 |
| `success(message)` | 显示成功通知 | `string` | 全部 |
| `warning(message)` | 显示警告通知 | `string` | 全部 |
| `error(message)` | 显示错误通知 | `string` | 全部 |

## 参考

- [uni-app x 状态栏官方文档](https://doc.dcloud.net.cn/uni-app-x/component/status-bar.html)

