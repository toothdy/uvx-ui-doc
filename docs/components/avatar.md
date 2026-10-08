<h5-demo src="pages/data/avatar/avatar" title="Avatar 头像" />

# Avatar 头像

`uvx-avatar` 展示图片、文字、图标或小程序开放头像；`uvx-avatar-group` 以重叠方式展示一组头像和超量提示。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 图片、文字、图标、形状、尺寸和默认图 | √ | √ | √ | √ | √ |
| 随机背景色、默认插槽和点击事件 | √ | √ | √ | √ | √ |
| `mp-avatar` 开放头像 | × | × | × | × | √ |
| 头像组、对象数据和超量提示 | √ | √ | √ | √ | √ |

小程序端仅支持微信开放头像。

::: warning 使用须知

1. 默认插槽优先级最高。未使用插槽时，内容优先级依次为小程序开放头像、`icon`、`text`、图片。
2. `mp-avatar` 仅在微信小程序条件编译中生效，其他端会继续按图标、文字或图片逻辑渲染。
3. 图片加载失败时先尝试 `default-url`；默认图也失败或未提供时显示填充背景。
4. `size` 字符串 `large`、`default`、`mini` 分别转换为 `50`、`40`、`30`；其他值原样用于尺寸。
5. `uvx-avatar-group` 的 `gap` 是重叠比例，源码限制在 `0-1`；值越大，头像重叠越多。

:::

## 基础用法

```vue
<uvx-avatar src="https://example.com/avatar.jpg"></uvx-avatar>
```

## 形状和尺寸

```vue
<template>
   <uvx-avatar src="https://example.com/a.jpg" shape="circle" size="large"></uvx-avatar>
   <uvx-avatar src="https://example.com/b.jpg" shape="square" :size="36"></uvx-avatar>
</template>
```

## 文字和图标头像

```vue
<template>
   <uvx-avatar text="U" :random-bg-color="true" :color-index="0"></uvx-avatar>
   <uvx-avatar icon="star-fill" :font-size="22" bg-color="#ecf5ff"></uvx-avatar>
</template>
```

## 图片加载失败

```vue
<uvx-avatar
   src="https://example.com/missing.jpg"
   default-url="/static/default-avatar.png"
></uvx-avatar>
```

```vue
<script lang="uts" setup>
const handleAvatarClick = (name: string): void => {
   console.log(name);
};
</script>
```

## 小程序开放头像

```vue
<!-- #ifdef MP-WEIXIN -->
<uvx-avatar :mp-avatar="true" :size="60"></uvx-avatar>
<!-- #endif -->
```

## 自定义内容

```vue
<uvx-avatar :size="48">
   <text>VIP</text>
</uvx-avatar>
```

## 点击事件

```vue
<uvx-avatar
   name="user-1001"
   src="https://example.com/avatar.jpg"
   @click="handleAvatarClick"
></uvx-avatar>
```

`click` 返回 `name`，不返回原生事件对象。

## 头像组

```vue
<uvx-avatar-group
   :urls="urls"
   :size="35"
   :max-count="5"
   :gap="0.5"
   @show-more="handleShowMore"
></uvx-avatar-group>
```

```vue
<script lang="uts" setup>
const urls: string[] = [
   "https://example.com/a.jpg",
   "https://example.com/b.jpg",
   "https://example.com/c.jpg",
];

const handleShowMore = (): void => {
   console.log("显示更多头像");
};
</script>
```

## 头像组对象数据

```vue
<uvx-avatar-group
   :urls="objectUrls"
   key-name="avatar"
   :max-count="3"
></uvx-avatar-group>
```

```vue
<script lang="uts" setup>
const objectUrls: UTSJSONObject[] = [
   { "avatar": "https://example.com/a.jpg" },
   { "avatar": "https://example.com/b.jpg" },
];
</script>
```

对象数据未设置 `key-name` 或对应字段不存在时，头像组回退读取 `url` 字段。

## API

### Avatar Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `src` | 图片地址 | `string` | `""` | 全部 |
| `shape` | 头像形状 | `circle \| square` | `circle` | 全部 |
| `size` | 头像尺寸；支持 `large`、`default`、`mini` | `string \| number` | `40` | 全部 |
| `mode` | 图片裁剪模式 | `Mode` | `scaleToFill` | 全部 |
| `text` | 文字头像内容 | `string` | `""` | 全部 |
| `bg-color` | 文字、图标或占位状态背景色 | `string` | `""` | 全部 |
| `color` | 文字或图标颜色 | `string` | `""` | 全部 |
| `font-size` | 文字或图标大小 | `string \| number` | `18` | 全部 |
| `icon` | `uvx-icon` 图标名称 | `string` | `""` | 全部 |
| `mp-avatar` | 是否使用微信小程序开放头像 | `boolean` | `false` | 微信 |
| `random-bg-color` | 填充状态是否使用随机背景色 | `boolean` | `false` | 全部 |
| `default-url` | 图片加载失败后的默认图片地址 | `string` | `""` | 全部 |
| `color-index` | 随机背景色索引，有效范围 `0-19` | `string \| number` | `""` | 全部 |
| `name` | 点击事件返回的标识 | `string` | `""` | 全部 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到根节点的外部样式类 | `string` | `""` | 全部 |

### Avatar Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `click` | 点击头像时触发 | `name: string` | 全部 |

### Avatar Slots

| 名称 | 说明 | 平台 |
| :---: | :---: | :---: |
| `default` | 自定义头像内容；使用后替换内置内容 | 全部 |

### AvatarGroup Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `urls` | 图片地址或对象数据列表 | `(string \| UTSJSONObject)[]` | `[]` | 全部 |
| `max-count` | 最大展示数量，负值或无效值回退为 `5` | `string \| number` | `5` | 全部 |
| `shape` | 头像形状 | `circle \| square` | `circle` | 全部 |
| `mode` | 图片裁剪模式 | `Mode` | `scaleToFill` | 全部 |
| `show-more` | 是否显示超量遮罩 | `boolean` | `true` | 全部 |
| `size` | 头像尺寸；支持 `large`、`default`、`mini` | `string \| number` | `40` | 全部 |
| `key-name` | 对象数据图片地址字段；为空时读取 `url` | `string` | `""` | 全部 |
| `gap` | 头像重叠比例，限制在 `0-1` | `string \| number` | `0.5` | 全部 |
| `extra-value` | 自定义超量数字；大于 `0` 时优先显示 | `string \| number` | `0` | 全部 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到根节点的外部样式类 | `string` | `""` | 全部 |

### AvatarGroup Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `show-more` | 点击最后一个头像的超量遮罩时触发 | - | 全部 |

## 参考

- [uni-app x image 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/image.html)
- [微信小程序 open-data 官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/open-data.html)
