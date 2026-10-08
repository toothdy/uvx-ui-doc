<h5-demo src="pages/basic/button/button" title="Button 按钮" />

# Button 按钮

`uvx-button` 提供主题、尺寸、形状、加载、禁用、图标、自定义颜色和平台开放能力。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

小程序端仅支持微信。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 主题、尺寸、形状、图标、加载、禁用 | √ | √ | √ | √ | √ |
| `click` 点击事件与节流 | √ | √ | √ | √ | √ |
| `form-type` 表单提交与重置 | √ | √ | √ | √ | √ |
| `open-type="agreePrivacyAuthorization"` | 4.31+ | 4.31+ | 4.61+ | × | √ |
| 其他 `open-type` 开放能力 | × | × | × | × | √ |
| 微信开放能力属性与回调事件 | × | × | × | × | √ |

::: warning 使用须知

1. 点击事件请使用 `@click`。`disabled` 或 `loading` 状态下不会触发点击，`throttle-time` 可设置点击节流时间。
2. App 端的 `open-type` 仅支持 `agreePrivacyAuthorization`；H5 不传递 `open-type`；其他开放能力仅微信小程序支持。
3. `hairline` 使用 `0.5px` 细边框。`color` 为渐变色时组件会移除边框，`hairline` 不生效。
4. `icon` 使用 `uvx-icon` 的图标名称；默认插槽会替换 `text` 内容，`suffix` 插槽追加在文字后方。

:::

## 基础用法

使用 `type` 设置按钮主题，支持 `info`、`primary`、`success`、`warning` 和 `error`。

```vue
<template>
   <view class="button-list">
      <uvx-button text="默认按钮" type="info"></uvx-button>
      <uvx-button text="主要按钮" type="primary"></uvx-button>
      <uvx-button text="成功按钮" type="success"></uvx-button>
      <uvx-button text="警告按钮" type="warning"></uvx-button>
      <uvx-button text="危险按钮" type="error"></uvx-button>
   </view>
</template>
```

## 镂空与细边框

`plain` 使用当前主题的容器背景，并将边框和文字切换为主题色。`hairline` 控制是否使用 `0.5px` 细边框，关闭后恢复普通 `1px` 边框。

```vue
<template>
   <view class="button-list">
      <uvx-button
         text="镂空按钮"
         type="primary"
         :plain="true"
      ></uvx-button>
      <uvx-button
         text="普通边框"
         type="warning"
         :plain="true"
         :hairline="false"
      ></uvx-button>
   </view>
</template>
```

## 禁用与加载

`disabled` 会降低按钮透明度并阻止点击。`loading` 会隐藏普通内容，显示加载图标和 `loading-text`，同时阻止点击。

```vue
<template>
   <view class="button-list">
      <uvx-button
         text="禁用按钮"
         type="primary"
         :disabled="true"
      ></uvx-button>
      <uvx-button
         type="success"
         loading-text="提交中"
         loading-mode="circle"
         :loading="true"
      ></uvx-button>
   </view>
</template>
```

## 图标与形状

`icon` 设置前置图标，`shape="circle"` 设置胶囊圆角。图标默认跟随按钮文字颜色和尺寸，也可以使用 `icon-color`、`icon-size` 单独覆盖。

```vue
<template>
   <view class="button-list">
      <uvx-button
         text="定位"
         type="warning"
         icon="map"
         :plain="true"
      ></uvx-button>
      <uvx-button
         text="圆角按钮"
         type="success"
         shape="circle"
      ></uvx-button>
   </view>
</template>
```

## 自定义颜色

`color` 可传普通 CSS 颜色或 `linear-gradient` 渐变。渐变色用于实心按钮时会移除边框。

```vue
<template>
   <view class="button-list">
      <uvx-button
         text="自定义颜色"
         color="rgb(10, 185, 156)"
      ></uvx-button>
      <uvx-button
         text="渐变色按钮"
         color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
      ></uvx-button>
   </view>
</template>
```

## 按钮尺寸

`size` 支持 `large`、`normal`、`small`、`mini`，默认值为 `normal`。

```vue
<template>
   <view class="button-list">
      <uvx-button text="大型按钮" type="success" size="large"></uvx-button>
      <uvx-button text="普通按钮" type="error" size="normal"></uvx-button>
      <uvx-button text="小型按钮" type="primary" size="small"></uvx-button>
      <uvx-button text="迷你按钮" type="warning" size="mini"></uvx-button>
   </view>
</template>
```

## 自定义样式

`u-style` 设置按钮根节点样式，`u-text-style` 设置文字样式，均使用 CSS 字符串。`u-class` 可追加外部样式类。

```vue
<template>
   <uvx-button
      text="自定义按钮"
      type="primary"
      u-class="submit-button"
      u-style="width: 100%; height: 48px; border-radius: 24px;"
      u-text-style="font-size: 16px; font-weight: 600;"
   ></uvx-button>
</template>
```

## 微信开放能力

微信小程序通过 `open-type` 使用原生开放能力，组件会透传对应回调。以下示例使用 `getPhoneNumber` 获取用户手机号：

```vue
<template>
   <uvx-button
      text="获取手机号"
      type="primary"
      open-type="getPhoneNumber"
      @getphonenumber="handlePhoneNumber"
   ></uvx-button>
</template>

<script lang="uts" setup>
/**
 * 处理获取手机号回调
 * @param event 微信原生按钮事件
 * @returns null
 */
const handlePhoneNumber = (event: UniEvent): void => {
   console.log(event.detail);
};
</script>
```

开放能力需要微信小程序账号权限、基础库版本和对应业务配置。`getPhoneNumber` 与 `getRealtimePhoneNumber` 均为按次计费的手机号验证能力，收到回调后应立即隐藏或禁用按钮，避免重复授权产生额外费用。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `type` | 按钮主题 | `info \| primary \| error \| warning \| success` | `info` | 全部 |
| `size` | 按钮尺寸 | `large \| normal \| small \| mini` | `normal` | 全部 |
| `shape` | 按钮形状 | `square \| circle` | `square` | 全部 |
| `plain` | 是否使用镂空样式 | `boolean` | `false` | 全部 |
| `hairline` | 是否使用 `0.5px` 细边框，渐变色下不生效 | `boolean` | `true` | 全部 |
| `disabled` | 是否禁用按钮 | `boolean` | `false` | 全部 |
| `loading` | 是否显示加载状态并阻止点击 | `boolean` | `false` | 全部 |
| `loading-text` | 加载状态文字，空字符串时回退到 `text` | `string` | `加载中` | 全部 |
| `loading-mode` | 加载图标模式 | `spinner \| circle \| semicircle` | `spinner` | 全部 |
| `loading-size` | 加载图标尺寸，单位 px | `number` | `15` | 全部 |
| `text` | 按钮文字 | `string \| number` | `""` | 全部 |
| `icon` | 前置图标名称 | `string` | `""` | 全部 |
| `icon-size` | 图标尺寸，数字默认补充 px | `string \| number` | `""` | 全部 |
| `icon-color` | 图标颜色；未设置时跟随按钮状态 | `string` | `""` | 全部 |
| `color` | 自定义颜色，支持普通颜色和 `linear-gradient` | `string` | `""` | 全部 |
| `form-type` | 触发所属 `form` 的提交或重置 | `submit \| reset \| ""` | `""` | 全部 |
| `open-type` | 平台开放能力，取值范围见下表 | `OpenType` | `""` | App、微信 |
| `app-parameter` | `launchApp` 时传递给 App 的参数 | `string` | `""` | 微信 |
| `hover-stop-propagation` | 是否阻止祖先节点出现点击态 | `boolean` | `true` | 微信 |
| `hover-start-time` | 按住后出现点击态的时间，单位 ms | `string \| number` | `0` | 全部 |
| `hover-stay-time` | 松开后保留点击态的时间，单位 ms | `string \| number` | `200` | 全部 |
| `lang` | 返回用户信息的语言 | `zh_CN \| zh_TW \| en` | `zh_CN` | 微信 |
| `session-from` | `contact` 客服会话来源 | `string` | `""` | 微信 |
| `send-message-title` | 客服会话内消息卡片标题 | `string` | `""` | 微信 |
| `send-message-path` | 客服会话内消息卡片跳转路径 | `string` | `""` | 微信 |
| `send-message-img` | 客服会话内消息卡片图片 | `string` | `""` | 微信 |
| `show-message-card` | 是否显示客服会话消息卡片 | `boolean` | `false` | 微信 |
| `phone-number-no-quota-toast` | 手机号验证额度用尽时是否显示提示 | `boolean` | `true` | 微信 |
| `throttle-time` | 点击事件节流时间，单位 ms | `number` | `0` | 全部 |
| `u-style` | 按钮根节点样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-text-style` | 按钮文字样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到按钮根节点的外部样式类 | `string` | `""` | 全部 |

### OpenType

| 平台 | 支持值 |
| :---: | :---: |
| Android | `agreePrivacyAuthorization`（HBuilderX 4.31+） |
| iOS | `agreePrivacyAuthorization`（HBuilderX 4.31+） |
| 鸿蒙 | `agreePrivacyAuthorization`（HBuilderX 4.61+） |
| H5 | 不支持 |
| 微信 | `feedback`、`share`、`getUserInfo`、`contact`、`getPhoneNumber`、`getRealtimePhoneNumber`、`launchApp`、`openSetting`、`chooseAvatar`、`agreePrivacyAuthorization`、`liveActivity` |

### Events

微信开放能力事件的参数均为原生 `UniEvent`，具体数据从 `event.detail` 获取。

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `click` | 按钮点击；禁用或加载中不触发 | - | 全部 |
| `getphonenumber` | 获取手机号，`open-type="getPhoneNumber"` 时触发 | `UniEvent` | 微信 |
| `getrealtimephonenumber` | 实时验证手机号，`open-type="getRealtimePhoneNumber"` 时触发 | `UniEvent` | 微信 |
| `getuserinfo` | 获取用户信息，`open-type="getUserInfo"` 时触发 | `UniEvent` | 微信 |
| `contact` | 客服会话回调，`open-type="contact"` 时触发 | `UniEvent` | 微信 |
| `chooseavatar` | 选择头像，`open-type="chooseAvatar"` 时触发 | `UniEvent` | 微信 |
| `agreeprivacyauthorization` | 同意隐私协议，`open-type="agreePrivacyAuthorization"` 时触发 | `UniEvent` | 微信 |
| `opensetting` | 打开授权设置页后的回调 | `UniEvent` | 微信 |
| `launchapp` | 打开 App 成功的回调 | `UniEvent` | 微信 |
| `error` | 使用开放能力发生错误的回调 | `UniEvent` | 微信 |
| `createliveactivity` | 一次性订阅消息下发机制回调，获取下发 code，`open-type="liveActivity"` 时触发 | `UniEvent` | 微信 |

### Slots

| 名称 | 说明 | 平台 |
| :---: | :---: | :---: |
| `default` | 自定义按钮主体内容；使用后替换 `text` | 全部 |
| `suffix` | 在按钮主体内容后追加内容 | 全部 |

## 参考

- [uni-app x button 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/button.html)
- [微信小程序 button 官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)
