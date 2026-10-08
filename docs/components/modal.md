<h5-demo src="pages/feedback/modal/modal" title="Modal 模态框" />

# Modal 模态框

`uvx-modal` 用于消息提示、操作确认和当前页面内的模态交互，支持异步确认、自定义正文和自定义按钮。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 标题、正文、确认和取消操作 | √ | √ | √ | √ | √ |
| 异步确认、关闭图标和遮罩关闭 | √ | √ | √ | √ | √ |
| 默认插槽、按钮插槽和公开方法 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. 组件没有 `show` 属性，应通过实例的 `open()` 和 `close()` 控制显示。
2. `async-close` 为 `true` 时，点击确认只触发 `confirm` 并进入加载状态；业务完成后应调用 `closeLoading()`，再按需要调用 `close()`。
3. `cancel` 只在点击取消按钮时触发；右上角关闭、遮罩关闭和方法关闭最终都会在弹层关闭后触发 `close`。
4. 使用 `confirmButton` 插槽后，默认分割线、确认按钮和取消按钮全部被替换，关闭逻辑由插槽内容自行处理。

:::

## 基础用法

```vue
<template>
   <uvx-button text="打开" @click="handleOpen"></uvx-button>
   <uvx-modal
      ref="uModal"
      title="提示"
      content="确认执行当前操作吗？"
      @confirm="handleConfirm"
   ></uvx-modal>
</template>

<script lang="uts" setup>
const uModal = ref<UvxModalComponentPublicInstance | null>(null);

const handleOpen = (): void => {
   uModal.value?.open();
};

const handleConfirm = (): void => {
   console.log("confirm");
};
</script>
```

## 显示取消和关闭按钮

```vue
<uvx-modal
   ref="uModal"
   title="删除确认"
   content="删除后无法恢复"
   :show-cancel-button="true"
   :show-close-icon="true"
   @cancel="handleCancel"
   @close="handleClose"
></uvx-modal>
```

## 异步关闭

```vue
<uvx-modal
   ref="uModal"
   title="提交确认"
   content="确认提交当前内容吗？"
   :async-close="true"
   @confirm="handleAsyncConfirm"
></uvx-modal>
```

```uts
const handleAsyncConfirm = (): void => {
   setTimeout((): void => {
      uModal.value?.closeLoading();
      uModal.value?.close();
   }, 2000);
};
```

## 自定义正文

默认插槽会替换 `content` 对应的正文节点。

```vue
<uvx-modal ref="uModal" title="图片预览">
   <image src="/static/logo.jpeg" mode="aspectFit"></image>
</uvx-modal>
```

## 自定义按钮

```vue
<template>
   <uvx-modal ref="uModal" title="提示">
      <template #confirmButton>
         <uvx-button
            text="知道了"
            type="success"
            @click="handleCustomClose"
         ></uvx-button>
      </template>
   </uvx-modal>
</template>

<script lang="uts" setup>
const uModal = ref<UvxModalComponentPublicInstance | null>(null);

/**
 * 关闭自定义按钮的模态框
 * @returns null
 */
const handleCustomClose = (): void => {
   uModal.value?.close();
};
</script>
```

## 动画和布局

`zoom="false"` 时内部居中弹层使用淡入淡出动画。`negative-top` 向上偏移模态框，`width` 和 `align` 控制宽度与正文对齐。

```vue
<uvx-modal
   ref="uModal"
   title="提示"
   content="居中显示的正文"
   :zoom="false"
   :negative-top="40"
   width="560rpx"
   align="center"
></uvx-modal>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `title` | 标题；空字符串时不渲染标题 | `string` | `""` | 全部 |
| `content` | 默认插槽未传入时显示的正文 | `string` | `""` | 全部 |
| `confirm-text` | 确认按钮文字，使用组件国际化文本 | `string` | `确认` | 全部 |
| `cancel-text` | 取消按钮文字，使用组件国际化文本 | `string` | `取消` | 全部 |
| `show-confirm-button` | 是否显示确认按钮 | `boolean` | `true` | 全部 |
| `show-cancel-button` | 是否显示取消按钮 | `boolean` | `false` | 全部 |
| `show-close-icon` | 是否显示右上角关闭图标 | `boolean` | `false` | 全部 |
| `confirm-color` | 确认按钮文字和加载图标颜色 | `string` | `""` | 全部 |
| `cancel-color` | 取消按钮文字颜色 | `string` | `""` | 全部 |
| `button-reverse` | 是否对调确认和取消按钮顺序 | `boolean` | `false` | 全部 |
| `zoom` | 是否使用缩放动画；关闭后使用淡入淡出 | `boolean` | `true` | 全部 |
| `z-index` | 模态框层级 | `string \| number` | `10075` | 全部 |
| `async-close` | 确认后是否进入异步加载状态 | `boolean` | `false` | 全部 |
| `close-on-click-overlay` | 是否允许点击遮罩关闭 | `boolean` | `true` | 全部 |
| `negative-top` | 模态框向上偏移距离 | `string \| number` | `0` | 全部 |
| `width` | 模态框宽度 | `string \| number` | `650rpx` | 全部 |
| `align` | 正文对齐方式 | `left \| center \| right` | `left` | 全部 |
| `text-style` | 正文文本样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-style` | 模态框主体样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 模态框主体追加类名 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `confirm` | 点击默认确认按钮时触发 | - | 全部 |
| `cancel` | 点击默认取消按钮时触发 | - | 全部 |
| `close` | 内部弹层关闭后触发 | - | 全部 |

### Slots

| 名称 | 说明 | 平台 |
| :---: | :---: | :---: |
| `default` | 自定义正文；使用后替换 `content` 文本 | 全部 |
| `confirmButton` | 自定义整个按钮区域 | 全部 |

### Methods

| 方法 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `open()` | 打开模态框并重置确认加载状态 | - | 全部 |
| `close()` | 关闭模态框 | - | 全部 |
| `closeLoading()` | 结束异步确认加载状态，不会自动关闭 | - | 全部 |

## 参考

- [uni-app x 组件实例官方文档](https://doc.dcloud.net.cn/uni-app-x/component/#component-instance)
