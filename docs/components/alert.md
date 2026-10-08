<h5-demo src="pages/feedback/alert/alert" title="Alert 警告提示" />

# Alert 警告提示

`uvx-alert` 用于在页面内容中展示需要关注的信息，支持五种语义主题、深浅色调、状态图标和关闭操作。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

小程序端仅支持微信。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 主题、图标、标题、说明和居中 | √ | √ | √ | √ | √ |
| 淡入淡出与点击关闭 | √ | √ | √ | √ | √ |
| 自定义样式和外部类 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. 默认 `type="warning"`、`effect="light"`，标题和说明默认均为空；至少传入其中一个才会显示文字。
2. `closable` 默认 `false`。点击关闭图标只隐藏当前实例，不触发 `click`，也不会修改父组件数据；重新挂载组件可再次显示。
3. 点击提示主体触发无参数 `click`。关闭图标会阻止点击冒泡。
4. `font-size` 默认 `14`，数字按 px 处理；`u-style` 接受 CSS 字符串，不接受对象。暗色主题下浅色调仍使用对应语义色的浅色背景。

:::

## 基础用法

用 `description` 展示简短说明，`type` 可选 `primary`、`success`、`warning`、`error`、`info`。

```vue
<template>
   <uvx-alert description="请检查输入内容"></uvx-alert>
   <uvx-alert description="保存成功" type="success"></uvx-alert>
</template>
```

## 深浅色调

`effect="dark"` 使用语义色背景和白色文字；默认的 `light` 使用浅色背景和语义色文字。

```vue
<template>
   <uvx-alert description="请注意截止时间" type="warning"></uvx-alert>
   <uvx-alert description="请注意截止时间" type="warning" effect="dark"></uvx-alert>
</template>
```

## 图标与关闭

`show-icon` 使用当前主题对应的状态图标。`closable` 显示关闭按钮，点击后播放淡出动画。

```vue
<template>
   <uvx-alert
      description="操作未完成"
      type="error"
      show-icon
      closable
   ></uvx-alert>
</template>
```

## 标题和居中

标题和说明可以同时显示；`center` 只改变文字对齐，图标和关闭按钮仍保持两侧布局。

```vue
<template>
   <uvx-alert
      title="温馨提示"
      description="请确认资料后继续"
      type="info"
      :center="true"
      :font-size="16"
   ></uvx-alert>
</template>
```

## 点击与自定义样式

`click` 没有事件参数。自定义样式通过 `u-style` 字符串传入，外部类通过 `u-class` 传入。

```vue
<template>
   <uvx-alert
      description="查看详情"
      u-style="margin-top: 8px;"
      u-class="notice-alert"
      @click="handleAlertClick"
   ></uvx-alert>
</template>

<script lang="uts" setup>
/**
 * 处理提示点击
 * @returns null
 */
const handleAlertClick = (): void => {
   console.log("alert clicked");
};
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `title` | 标题文字 | `string` | `""` | 全部 |
| `type` | 语义主题 | `success \| warning \| info \| error \| primary` | `warning` | 全部 |
| `description` | 辅助说明文字 | `string` | `""` | 全部 |
| `closable` | 是否显示关闭按钮 | `boolean` | `false` | 全部 |
| `show-icon` | 是否显示状态图标 | `boolean` | `false` | 全部 |
| `effect` | 色调 | `light \| dark` | `light` | 全部 |
| `center` | 文字是否居中 | `boolean` | `false` | 全部 |
| `font-size` | 标题和说明的字号；数字按 px 处理 | `string \| number` | `14` | 全部 |
| `u-style` | 提示主体自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 提示主体追加的外部类 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `click` | 点击提示主体时触发；关闭图标不会触发 | 无 | 全部 |

## 参考

- [uni-app x view 组件](https://doc.dcloud.net.cn/uni-app-x/component/view.html)
- [uni-app x text 组件](https://doc.dcloud.net.cn/uni-app-x/component/text.html)
- [uni-app x 组件事件](https://doc.dcloud.net.cn/uni-app-x/component/common.html)
