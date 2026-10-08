<h5-demo src="pages/data/progress/progress" title="Progress 进度条" />

# Progress 进度条

`uvx-line-progress` 用于展示任务或操作的当前进度，支持百分比文字、自定义颜色、高度和轨道内容。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

小程序端仅支持微信。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 百分比进度和默认文字 | √ | √ | √ | √ | √ |
| 自定义颜色、高度和根节点样式 | √ | √ | √ | √ | √ |
| 默认插槽自定义轨道内容 | √ | √ | √ | √ | √ |
| 进度变化过渡动画 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. `percentage` 会转为数字并限制在 `0-100`；无效值按 `0` 处理。
2. `height` 的单位固定为 px，无效值或非正数会回退为 `12`。
3. 默认百分比文字仅在 `show-text=true` 且进度不低于 `10` 时显示，避免文字挤出较短的激活轨道。
4. 默认插槽会替换百分比文字，不受 `show-text` 和 `10%` 阈值限制；插槽内容超出轨道时会被圆角区域裁剪。
5. `active-color` 和 `inactive-color` 默认跟随主题；显式传入颜色后不再随暗色主题变化。

:::

## 基础用法

通过 `percentage` 设置当前进度。

```vue
<template>
   <uvx-line-progress :percentage="30"></uvx-line-progress>
</template>
```

## 隐藏百分比

设置 `show-text=false` 后仅显示轨道。

```vue
<template>
   <uvx-line-progress
      :percentage="40"
      :show-text="false"
   ></uvx-line-progress>
</template>
```

## 自定义高度

`height` 接收数字或数字字符串，单位统一为 px。

```vue
<template>
   <uvx-line-progress
      :percentage="50"
      :show-text="false"
      :height="8"
   ></uvx-line-progress>
</template>
```

## 自定义颜色

`active-color` 设置已完成轨道颜色，`inactive-color` 设置背景轨道颜色。

```vue
<template>
   <uvx-line-progress
      active-color="#3c9cff"
      inactive-color="#dfe7ef"
      :percentage="60"
      :show-text="false"
      :height="8"
   ></uvx-line-progress>
</template>
```

## 自定义轨道内容

默认插槽位于激活轨道内部。自定义内容应控制在进度条高度内，避免被裁剪。

```vue
<template>
   <uvx-line-progress
      active-color="#3c9cff"
      :percentage="70"
      :height="20"
   >
      <text class="progress-label">70%</text>
   </uvx-line-progress>
</template>

<style lang="scss">
.progress-label {
   margin-right: 5px;
   color: #ffffff;
   font-size: 10px;
   line-height: 1.2em;
}
</style>
```

## 动态进度

修改 `percentage` 后，激活轨道会以过渡动画更新宽度。

```vue
<template>
   <uvx-line-progress
      :percentage="percentage"
      :show-text="false"
      :height="8"
   ></uvx-line-progress>
   <uvx-button text="增加" @click="handleIncrease"></uvx-button>
</template>

<script lang="uts" setup>
// 当前进度
const percentage = ref<number>(50);

/**
 * 增加进度
 * @returns null
 */
const handleIncrease = (): void => {
   percentage.value = Math.min(100, percentage.value + 10);
};
</script>
```

## 自定义根节点

`u-style` 设置根节点样式，`u-class` 追加外部样式类。

```vue
<template>
   <uvx-line-progress
      u-class="order-progress"
      u-style="width: 80%;"
      :percentage="75"
   ></uvx-line-progress>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `active-color` | 激活轨道颜色，空值时使用主题主色 | `string` | `""` | 全部 |
| `inactive-color` | 背景轨道颜色，空值时使用主题边框色 | `string` | `""` | 全部 |
| `percentage` | 当前进度，无效值按 `0` 处理并限制在 `0-100` | `string \| number` | `0` | 全部 |
| `show-text` | 是否显示默认百分比文字 | `boolean` | `true` | 全部 |
| `height` | 进度条高度，单位 px，必须大于 `0` | `string \| number` | `12` | 全部 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到根节点的外部样式类 | `string` | `""` | 全部 |

### Slots

| 插槽 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| default | 替换激活轨道中的默认百分比文字 | - | 全部 |

## 参考

- [uni-app x view 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/view.html)
- [uni-app x CSS 官方文档](https://doc.dcloud.net.cn/uni-app-x/css/)
- [UTS 数字类型](https://doc.dcloud.net.cn/uni-app-x/uts/data-type.html#number)
