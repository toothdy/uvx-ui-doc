<h5-demo src="pages/form/rate/rate" title="Rate 评分" />

# Rate 评分

`uvx-rate` 用于星级评分，支持整数、半星、最小值、只读、禁用、自定义图标和滑动选择。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 整数、半星、只读和禁用 | √ | √ | √ | √ | √ |
| 点击、滑动选择和双向绑定 | √ | √ | √ | √ | √ |
| 自定义颜色、图标、尺寸和间距 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. `value` 不为数值 `0` 时优先于 `model-value`；推荐只使用 `v-model`。
2. `disabled` 和 `readonly` 都阻止修改；`disabled` 还会将所有图标颜色切换为禁用色。
3. `touchable` 只控制滑动选择，点击星星始终可用，除非禁用或只读。
4. `count` 最小为 `1`，`size` 最小为 `1`，`gutter` 最小为 `0`，`min-count` 被限制在 `0-count`。
5. 组件位于后显示的弹层中时，显示后调用 `init()` 重新读取左边界，保证滑动评分准确。

:::

## 基础用法

```vue
<template>
   <uvx-rate v-model="value" @change="handleChange"></uvx-rate>
</template>

<script lang="uts" setup>
const value = ref<number>(0);

const handleChange = (nextValue: number): void => {
   value.value = nextValue;
};
</script>
```

## 星星数量和尺寸

```vue
<uvx-rate :model-value="3" :count="4" :size="30" :gutter="6"></uvx-rate>
```

## 半星评分

```vue
<uvx-rate
   :model-value="3"
   :allow-half="true"
   :touchable="true"
></uvx-rate>
```

## 禁用和只读

```vue
<template>
   <uvx-rate :model-value="3" :disabled="true"></uvx-rate>
   <uvx-rate :model-value="3" :readonly="true"></uvx-rate>
</template>
```

## 自定义图标和颜色

```vue
<uvx-rate
   :model-value="3"
   active-icon="heart-fill"
   inactive-icon="heart"
   active-color="#f56c6c"
   inactive-color="#c8c9cc"
></uvx-rate>
```

## 最小评分

```vue
<uvx-rate :model-value="1" :min-count="1"></uvx-rate>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `value` | 兼容评分值，非零时优先于 `model-value` | `number \| string` | `0` | 全部 |
| `model-value` | 双向绑定评分值 | `number \| string` | `0` | 全部 |
| `count` | 评分项数量，最小为 `1` | `number \| string` | `5` | 全部 |
| `disabled` | 是否禁用操作并使用禁用色 | `boolean` | `false` | 全部 |
| `readonly` | 是否只读 | `boolean` | `false` | 全部 |
| `size` | 图标尺寸，最小为 `1` | `number \| string` | `18` | 全部 |
| `inactive-color` | 未选中颜色，为空时跟随图标主题 | `string` | `""` | 全部 |
| `active-color` | 选中颜色，为空时使用错误语义色 | `string` | `""` | 全部 |
| `gutter` | 图标间距，最小为 `0` | `number \| string` | `4` | 全部 |
| `min-count` | 用户可选择的最小评分 | `number \| string` | `1` | 全部 |
| `allow-half` | 是否允许半星 | `boolean` | `false` | 全部 |
| `active-icon` | 选中图标名称 | `string` | `star-fill` | 全部 |
| `inactive-icon` | 未选中图标名称 | `string` | `star` | 全部 |
| `touchable` | 是否允许滑动选择 | `boolean` | `false` | 全部 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到根节点的外部样式类 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `update:modelValue` | 用户修改评分后更新绑定值 | `value: number` | 全部 |
| `input` | 用户修改评分后触发 | `value: number` | 全部 |
| `change` | 用户修改评分后触发 | `value: number` | 全部 |

### Methods

| 方法 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `init()` | 下一帧重新测量组件左边界 | - | 全部 |

## 参考

- [uni.createSelectorQuery 官方文档](https://doc.dcloud.net.cn/uni-app-x/api/nodes-info.html)
