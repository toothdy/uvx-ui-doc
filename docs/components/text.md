<h5-demo src="pages/basic/text/text" title="Text 文本" />

# Text 文本

`uvx-text` 集成文本类常用功能：主题色、金额/日期/手机号/姓名格式化与脱敏、超链接、前后图标、多行截断和微信开放能力。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

小程序端仅支持微信。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 主题、格式化、图标、多行截断、自定义样式 | √ | √ | √ | √ | √ |
| `click` 点击事件 | √ | √ | √ | √ | √ |
| `mode="phone"` 拨打电话 | 4.63+ | 4.63+ | 4.61+ | √ | √ |
| `mode="link"` 超链接 | √ | √ | √ | √ | √ |
| `open-type` 小程序开放能力 | × | × | × | × | √ |

::: warning 使用须知

1. 文本内容通过 `text` 属性传入，点击事件使用 `@click`。`mode="phone"` 且 `:call="true"` 时点击会直接拨打电话。
2. `color` 仅在未设置 `type` 时生效，以内联样式写入，不随暗黑模式联动；需要跟随主题请使用 `type`。
3. `size` 传数字时按全局缩放倍数换算，传字符串（如 `20px`）原样使用、不缩放。`lines` 支持 `1-5`，超出部分以省略号截断。
4. `open-type` 仅微信小程序生效，内部以重置样式的原生 `button` 实现开放能力，不透传微信回调事件。

:::

## 基础用法

通过 `text` 属性设置文本内容，默认为主文本色。

```vue
<template>
   <uvx-text text="我用十年青春,赴你最后之约"></uvx-text>
</template>
```

## 主题颜色

使用 `type` 设置主题颜色，支持 `primary`、`success`、`warning`、`error`、`info` 五个品牌色，以及 `main`、`content`、`tips` 三个文本语义色。

```vue
<template>
   <view class="text-list">
      <uvx-text text="主色" type="primary"></uvx-text>
      <uvx-text text="错误" type="error"></uvx-text>
      <uvx-text text="成功" type="success"></uvx-text>
      <uvx-text text="警告" type="warning"></uvx-text>
      <uvx-text text="信息" type="info"></uvx-text>
   </view>
</template>
```

## 拨打电话

`mode="phone"` 用于展示手机号码。`format="encrypt"` 将中间四位脱敏为 `150****9320`；`:call="true"` 后点击直接调用 `uni.makePhoneCall` 拨号。

```vue
<template>
   <view class="text-list">
      <uvx-text mode="phone" text="15019479320"></uvx-text>
      <uvx-text
         mode="phone"
         text="15019479320"
         :call="true"
         format="encrypt"
      ></uvx-text>
      <uvx-text
         mode="phone"
         text="15019479320"
         :call="true"
         type="primary"
      ></uvx-text>
   </view>
</template>
```

## 日期格式化

`mode="date"` 将 `text` 中的时间戳格式化为日期。时间戳支持秒和毫秒（10 位以内自动按秒处理），`format` 为格式化模板，支持 `yyyy`、`MM`、`dd`、`HH`、`mm`、`ss`，默认 `yyyy-MM-dd`；无法解析时原样显示。

```vue
<template>
   <uvx-text mode="date" text="1612959739"></uvx-text>
</template>
```

## 姓名脱敏

`mode="name"` 配合 `format="encrypt"` 对姓名脱敏：两个字的隐藏末字，三个字以上的保留首尾、中间以 `*` 代替。

```vue
<template>
   <uvx-text mode="name" text="张三三" format="encrypt"></uvx-text>
</template>
```

## 超链接

`mode="link"` 渲染为带下划线的超链接，`href` 设置跳转地址，内部由 `uvx-link` 实现。

```vue
<template>
   <uvx-text
      mode="link"
      text="打开文档"
      href="https://www.uvxui.cn"
   ></uvx-text>
</template>
```

## 显示金额

`mode="price"` 在文本前渲染 `￥` 符号，并对数值做千分位分隔、保留两位小数。

```vue
<template>
   <uvx-text mode="price" text="728732.32"></uvx-text>
</template>
```

## 前后图标

`prefix-icon`、`suffix-icon` 设置前置和后置图标，取值为 `uvx-icon` 的图标名称，默认跟随文字颜色和尺寸。`icon-style` 可单独覆盖图标样式，`align` 控制整体对齐。

```vue
<template>
   <view class="text-list">
      <uvx-text
         prefix-icon="photo"
         icon-style="font-size: 18px;line-height: 18px"
         text="搜索一下"
      ></uvx-text>
      <uvx-text
         suffix-icon="arrow-leftward"
         align="right"
         icon-style="font-size: 18px;line-height: 18px"
         text="查看更多"
      ></uvx-text>
   </view>
</template>
```

## 超出隐藏

`lines` 设置最大显示行数，支持 `1-5`，超出部分以省略号截断。App 端使用原生 `lines` 样式，H5 和小程序端使用 `-webkit-line-clamp`。

```vue
<template>
   <uvx-text
      :lines="2"
      text="关于uvx-ui的取名来由，首字母u来自于uni-app首字母，uni-app是基于Vue.js，Vue和View(延伸为UI、视图之意)同音，故取名uvx-ui，表达源于uni-app和Vue和uView之意，同时在此也对它们表示感谢。"
   ></uvx-text>
</template>
```

## 小程序开放能力

微信小程序通过 `open-type` 使用原生开放能力，组件内部以重置样式的 `button` 实现。以下示例使用 `share` 触发转发菜单：

```vue
<template>
   <uvx-text
      text="分享到微信"
      type="success"
      open-type="share"
      @click="clickHandler"
   ></uvx-text>
</template>

<script lang="uts" setup>
/**
 * 点击回调，非微信端提示
 * @returns null
 */
const clickHandler = (): void => {
   // #ifndef MP-WEIXIN
   console.log("请在微信小程序内查看效果");
   // #endif
};
</script>
```

开放能力需要微信小程序账号权限和基础库版本支持，开放能力本身不透传回调事件，需要回调的场景请改用 `uvx-button`。

## 自定义样式

`u-style` 设置文本节点样式（CSS 字符串），`u-class` 追加外部样式类到组件根节点。

```vue
<template>
   <uvx-text
      text="自定义文本"
      type="primary"
      u-class="my-text"
      u-style="font-size: 20px; font-weight: bold;"
   ></uvx-text>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `type` | 主题颜色 | `primary \| success \| warning \| error \| info \| main \| content \| tips` | `""` | 全部 |
| `show` | 是否显示组件 | `boolean` | `true` | 全部 |
| `text` | 文本内容 | `string` | `""` | 全部 |
| `mode` | 文本处理模式 | `text \| price \| phone \| name \| date \| link` | `text` | 全部 |
| `prefix-icon` | 前置图标名称，取值见 `uvx-icon` | `string` | `""` | 全部 |
| `suffix-icon` | 后置图标名称，取值见 `uvx-icon` | `string` | `""` | 全部 |
| `icon-style` | 图标样式，CSS 字符串 | `string` | `""` | 全部 |
| `href` | `mode="link"` 时的链接地址 | `string` | `""` | 全部 |
| `format` | 格式化规则：`date` 模式为日期模板；`phone`、`name` 模式传 `encrypt` 脱敏 | `string` | `""` | 全部 |
| `call` | `mode="phone"` 时点击是否拨打电话 | `boolean` | `false` | 全部 |
| `open-type` | 微信开放能力，取值范围见下表 | `getPhoneNumber \| getUserInfo \| contact \| launchApp \| openSetting \| chooseAvatar \| share` | `""` | 微信 |
| `bold` | 是否加粗 | `boolean` | `false` | 全部 |
| `block` | 是否块级显示，H5 和小程序端写入 `display: block` | `boolean` | `false` | 全部 |
| `lines` | 超出隐藏行数，`0` 表示不限制，支持 `1-5` | `number` | `0` | 全部 |
| `color` | 文本颜色，仅在未设置 `type` 时生效 | `string` | `""` | 全部 |
| `size` | 字体大小；数字按全局缩放换算，字符串原样使用 | `string \| number` | `14` | 全部 |
| `decoration` | 文字装饰线 | `none \| underline \| line-through` | `none` | 全部 |
| `margin` | 外边距 | `string \| number` | `0` | 全部 |
| `line-height` | 行高 | `string` | `""` | 全部 |
| `align` | 水平对齐方式 | `left \| center \| right` | `left` | 全部 |
| `word-wrap` | 换行规则 | `break-word \| normal \| anywhere` | `normal` | 全部 |
| `u-style` | 文本节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到组件根节点的外部样式类 | `string` | `""` | 全部 |

### OpenType

| 平台 | 支持值 |
| :---: | :---: |
| Android / iOS / 鸿蒙 / H5 | 不支持 |
| 微信 | `share`、`getPhoneNumber`、`getUserInfo`、`contact`、`launchApp`、`openSetting`、`chooseAvatar` |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `click` | 点击文本时触发；`mode="phone"` 且 `call` 拨号后同样触发 | - | 全部 |

## 参考

- [uni-app x text 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/text.html)
- [uni.makePhoneCall 官方文档](https://doc.dcloud.net.cn/uni-app-x/api/make-phone-call.html)
- [微信小程序 button 官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)
