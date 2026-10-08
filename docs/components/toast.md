<h5-demo src="pages/feedback/toast/toast" title="Toast 消息提示" />

# Toast 消息提示

`uvx-toast` 提供可定制的轻提示，支持语义主题、加载状态、显示位置、透明遮罩以及关闭后的跳转、返回和回调。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 主题、图标、加载状态、位置和遮罩 | √ | √ | √ | √ | √ |
| 命令式与声明式显示 | √ | √ | √ | √ | √ |
| 结束后跳转、返回和完成回调 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. `show(options)` 会将本次配置与 Props 合并；再次调用会清理上一次计时器并重新计时。
2. `type="loading"` 或 `loading=true` 都会显示加载图标。`icon="none"`、`icon=false` 可关闭普通图标。
3. 自动结束时先处理 `url`，其次处理 `back`，最后执行 `complete`；手动 `hide()` 只隐藏并清理计时器，不执行这些动作。
4. `url` 非空时优先于 `back`。`is-tab=true` 使用 `switchTab`，否则按普通路由处理。
5. `show` Prop 由组件监听，但组件不会向父级回写；命令式调用更适合一次性提示。

:::

## 基础用法

```vue
<template>
   <uvx-button text="显示提示" @click="handleShow"></uvx-button>
   <uvx-toast ref="uToast"></uvx-toast>
</template>

<script lang="uts" setup>
const uToast = ref<UvxToastComponentPublicInstance | null>(null);

const handleShow = (): void => {
   uToast.value?.show({ message: "操作成功" });
};
</script>
```

## 主题和图标

`type` 支持 `default`、`primary`、`success`、`error`、`warning` 和 `loading`。

```uts
uToast.value?.show({ message: "保存成功", type: "success" });
uToast.value?.show({ message: "保存失败", type: "error" });
uToast.value?.show({ message: "自定义图标", icon: "bell" });
uToast.value?.show({ message: "无图标", icon: false });
```

## 加载状态

```uts
uToast.value?.show({
   message: "正在加载",
   type: "loading",
   duration: 3000,
});
```

## 显示位置

```uts
uToast.value?.show({ message: "顶部提示", position: "top" });
uToast.value?.show({ message: "底部提示", position: "bottom" });
```

## 结束后跳转

```uts
uToast.value?.show({
   message: "即将跳转",
   duration: 1500,
   url: "/pages/basic/text/text",
   params: { source: "toast" },
});
```

跳转到 `pages.json` 中的 tabBar 页面时设置 `isTab: true`。

## 结束后返回和回调

```uts
uToast.value?.show({
   message: "操作完成",
   back: true,
   complete: (): void => {
      console.log("toast complete");
   },
});
```

## 声明式显示

```vue
<uvx-toast
   :show="show"
   message="声明式提示"
   type="primary"
   position="center"
></uvx-toast>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `z-index` | 遮罩层级；内容层级在此基础上加 `1` | `string \| number` | 全局层级 | 全部 |
| `loading` | 是否显示加载状态 | `boolean` | `false` | 全部 |
| `message` | 提示内容 | `string \| number` | `""` | 全部 |
| `icon` | 图标开关、图标名或图片地址；`none` 表示隐藏 | `boolean \| string` | `true` | 全部 |
| `type` | 提示主题 | `default \| primary \| success \| error \| warning \| loading` | `default` | 全部 |
| `show` | 是否声明式显示 | `boolean` | `false` | 全部 |
| `overlay` | 是否显示透明遮罩阻止操作穿透 | `boolean` | `true` | 全部 |
| `position` | 显示位置 | `top \| center \| bottom` | `center` | 全部 |
| `params` | 普通路由跳转参数 | `UTSJSONObject` | `{}` | 全部 |
| `duration` | 显示时长，单位 ms；负值回退为 `2000` | `string \| number` | `2000` | 全部 |
| `is-tab` | `url` 是否为 tabBar 页面 | `boolean` | `false` | 全部 |
| `url` | 自动结束后的跳转地址 | `string` | `""` | 全部 |
| `complete` | 自动结束并完成路由处理后的回调 | `() => void` | 空函数 | 全部 |
| `back` | 无 `url` 时是否返回上一页 | `boolean` | `false` | 全部 |
| `u-style` | 内容自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 内容追加类名 | `string` | `""` | 全部 |

### Options

`show(options)` 支持上述除 `show` 外的所有字段，字段均可选；`complete` 还可传 `null`。

### Methods

| 方法 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `show(options?)` | 合并配置、显示并开始计时 | `Options \| null` | 全部 |
| `hide()` | 隐藏并清理计时器，不执行路由与回调 | - | 全部 |

## 参考

- [uni-app x 页面路由官方文档](https://doc.dcloud.net.cn/uni-app-x/api/route.html)
