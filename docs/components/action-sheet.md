<h5-demo src="pages/navigation/action-sheet/action-sheet" title="ActionSheet 上拉菜单" />

# ActionSheet 上拉菜单

`uvx-action-sheet` 从页面底部弹出操作菜单，支持标题、描述、加载与禁用状态、自定义内容、取消区域和微信开放能力。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

小程序端仅支持微信。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 标题、描述、操作项、取消区域 | √ | √ | √ | √ | √ |
| 加载、禁用、自定义颜色和字号 | √ | √ | √ | √ | √ |
| 默认插槽及 `open()`、`close()` 方法 | √ | √ | √ | √ | √ |
| `open-type` 开放能力及回调 | × | × | × | × | √ |

::: warning 使用须知

1. 组件没有 `show` 属性，应通过实例的 `open()` 和 `close()` 控制显示。
2. `disabled` 或 `loading` 操作项不会触发 `select`，也不会自动关闭；有效操作项是否自动关闭由 `close-on-click-action` 控制。
3. 点击关闭图标、取消区域、允许关闭的遮罩或调用 `close()`，最终都会在弹层关闭后触发一次 `close`；组件没有独立的 `cancel` 事件。
4. 操作项自身的 `openType` 优先于组件级 `open-type`。开放能力仅微信小程序生效，并依赖小程序账号权限、基础库版本和业务配置。
5. 默认插槽会替换描述下方的分割线和全部默认操作项；标题、描述、取消区域仍由组件渲染。
6. `color` 和 `fontSize` 只作用于当前操作项名称；禁用态始终使用主题禁用色。

:::

## 基础用法

通过 `actions` 传入操作项，使用组件实例打开菜单。

```vue
<template>
   <uvx-button text="打开菜单" @click="handleOpen"></uvx-button>
   <uvx-action-sheet
      ref="uActionSheet"
      :actions="actions"
      @select="handleSelect"
      @close="handleClose"
   ></uvx-action-sheet>
</template>

<script lang="uts" setup>
import type { Item } from "@/uni_modules/uvx-ui/components/uvx-action-sheet/types/index.uts";

const actions: Item[] = [
   { name: "选项1" },
   { name: "选项2" },
   { name: "选项3", subname: "描述文本" },
];
// 上拉菜单实例
const uActionSheet = ref<UvxActionSheetComponentPublicInstance | null>(null);

/**
 * 打开菜单
 * @returns null
 */
const handleOpen = (): void => {
   uActionSheet.value?.open();
};

/**
 * 处理操作项选择
 * @param item 选中的操作项
 * @returns null
 */
const handleSelect = (item: Item): void => {
   console.log(item.name);
};

/**
 * 处理菜单关闭
 * @returns null
 */
const handleClose = (): void => {
   console.log("close");
};
</script>
```

## 加载与禁用

`loading` 显示加载图标，`disabled` 使用禁用文字色。两种状态都会阻止选择和自动关闭。

```vue
<uvx-action-sheet
   ref="uActionSheet"
   :actions="[
      { name: '可选项' },
      { name: '加载中', loading: true },
      { name: '不可选择', disabled: true },
   ]"
></uvx-action-sheet>
```

## 标题、描述和取消区域

`title` 显示标题与关闭图标，`description` 显示操作项说明，`cancel-text` 非空时显示底部取消区域。

```vue
<uvx-action-sheet
   ref="uActionSheet"
   title="请选择操作"
   description="操作完成后不可撤销"
   cancel-text="取消"
   :round="10"
   :actions="actions"
></uvx-action-sheet>
```

## 自定义操作内容

默认插槽替换默认操作项区域。插槽内部如需关闭菜单，应调用组件实例的 `close()`。

```vue
<uvx-action-sheet
   ref="uActionSheet"
   title="自定义内容"
   cancel-text="取消"
>
   <view class="custom-content">
      <text>这里可以放置自定义操作内容</text>
   </view>
</uvx-action-sheet>
```

## 自定义操作项

操作项可单独设置副标题、文字颜色和字号。颜色只在非禁用状态生效。

```uts
const actions: Item[] = [
   {
      name: "删除",
      subname: "删除后无法恢复",
      color: "#f56c6c",
      fontSize: 16,
   },
];
```

## 微信开放能力

操作项通过 `openType` 设置微信原生开放能力，组件会转发对应回调。组件级 `open-type` 可作为操作项未设置时的默认值。

```vue
<uvx-action-sheet
   ref="uActionSheet"
   :actions="[
      { name: '获取用户信息', openType: 'getUserInfo' },
   ]"
   @getuserinfo="handleUserInfo"
></uvx-action-sheet>
```

```uts
/**
 * 处理获取用户信息回调
 * @param event 微信原生按钮事件
 * @returns null
 */
const handleUserInfo = (event: UniEvent): void => {
   console.log(event);
};
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `title` | 菜单标题；空字符串时不显示标题栏 | `string` | `""` | 全部 |
| `description` | 操作项上方的描述信息 | `string` | `""` | 全部 |
| `actions` | 操作项列表，字段见下表 | `Item[]` | `[]` | 全部 |
| `cancel-text` | 取消区域文字；空字符串时不显示 | `string` | `""` | 全部 |
| `close-on-click-action` | 点击有效操作项后是否关闭 | `boolean` | `true` | 全部 |
| `safe-area-inset-bottom` | 是否留出底部安全区 | `boolean` | `true` | 全部 |
| `open-type` | 操作项未设置 `openType` 时使用的开放能力 | `OpenType` | `""` | 微信 |
| `close-on-click-overlay` | 是否允许点击遮罩关闭 | `boolean` | `true` | 全部 |
| `round` | 弹层顶部圆角，单位 px | `number` | `0` | 全部 |
| `lang` | 返回用户信息的语言 | `zh_CN \| zh_TW \| en` | `zh_CN` | 微信 |
| `session-from` | `contact` 客服会话来源 | `string` | `""` | 微信 |
| `send-message-title` | 客服会话内消息卡片标题 | `string` | `""` | 微信 |
| `send-message-path` | 客服会话内消息卡片跳转路径 | `string` | `""` | 微信 |
| `send-message-img` | 客服会话内消息卡片图片 | `string` | `""` | 微信 |
| `show-message-card` | 是否显示客服会话消息卡片 | `boolean` | `false` | 微信 |
| `app-parameter` | `launchApp` 时传递给 App 的参数 | `string` | `""` | 微信 |

### Item

| 字段 | 说明 | 类型 | 必填 |
| :---: | :---: | :---: | :---: |
| `name` | 操作项名称 | `string` | 是 |
| `color` | 名称文字颜色 | `string` | 否 |
| `fontSize` | 名称文字字号，数字默认补充 px | `number` | 否 |
| `subname` | 操作项副标题 | `string` | 否 |
| `openType` | 当前项的微信开放能力，优先于组件级配置 | `string` | 否 |
| `disabled` | 是否禁用当前项 | `boolean` | 否 |
| `loading` | 是否显示加载状态 | `boolean` | 否 |

### OpenType

| 平台 | 支持值 |
| :---: | :---: |
| Android / iOS / 鸿蒙 / H5 | 不支持 |
| 微信 | `getUserInfo`、`contact`、`getPhoneNumber`、`openSetting`、`launchApp` |

组件级 `OpenType` 为 `getUserInfo | contact | getPhoneNumber | openSetting | launchApp | ""`。`error` 不是微信官方 `open-type` 值；开放能力失败应监听 `@error`。

### Events

微信开放能力事件的参数均为原生 `UniEvent`，具体数据从 `event.detail` 获取。

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `select` | 点击非禁用、非加载操作项时触发 | `Item` | 全部 |
| `close` | 内部弹层关闭后触发 | - | 全部 |
| `getuserinfo` | 获取用户信息回调 | `UniEvent` | 微信 |
| `contact` | 客服会话回调 | `UniEvent` | 微信 |
| `getphonenumber` | 获取手机号回调 | `UniEvent` | 微信 |
| `error` | 开放能力调用失败回调 | `UniEvent` | 微信 |
| `launchapp` | 打开 App 成功回调 | `UniEvent` | 微信 |
| `opensetting` | 打开授权设置后的回调 | `UniEvent` | 微信 |

### Slots

| 名称 | 说明 | 平台 |
| :---: | :---: | :---: |
| `default` | 替换描述下方的分割线和默认操作项列表 | 全部 |

### Methods

| 方法 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `open()` | 打开上拉菜单 | - | 全部 |
| `close()` | 关闭上拉菜单 | - | 全部 |

## 参考

- [uni-app x button 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/button.html)
- [uni-app x 组件实例官方文档](https://doc.dcloud.net.cn/uni-app-x/component/#component-instance)
- [微信小程序 button 官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)
