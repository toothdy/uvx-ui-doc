<h5-demo src="pages/form/keyboard/keyboard" title="Keyboard 键盘" />

# Keyboard 键盘

`uvx-keyboard` 提供数字、身份证和车牌三种自定义键盘，内置底部弹层、工具栏、遮罩和安全区。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 数字、身份证、车牌键盘 | √ | √ | √ | √ | √ |
| 工具栏、遮罩、安全区和随机键位 | √ | √ | √ | √ | √ |
| 车牌模式切换、禁用按键和自定义切换键 | √ | √ | √ | √ | √ |

::: warning 使用须知

1. 组件通过实例 `open()`、`close()` 控制，不提供 `show` 属性。
2. 点击确认先触发 `confirm`，仅当 `close-on-click-confirm=true` 时关闭；点击取消始终触发 `cancel` 并关闭。
3. 遮罩关闭最终触发 `close`，但不会触发 `cancel`。
4. `dot-disabled` 只影响数字键盘的小数点；身份证键盘由 `mode="card"` 控制。
5. `auto-change`、`dis-keys`、`u-switch-key` 和 `abc` 插槽只用于车牌键盘。

:::

## 数字键盘

```vue
<uvx-keyboard
   ref="uKeyboard"
   mode="number"
   @change="handleChange"
   @backspace="handleBackspace"
></uvx-keyboard>
```

## 身份证键盘

```vue
<uvx-keyboard ref="uKeyboard" mode="card"></uvx-keyboard>
```

## 车牌键盘

```vue
<uvx-keyboard
   ref="uKeyboard"
   mode="car"
   :auto-change="true"
   :dis-keys="['I', 'O']"
   @change-car-input-mode="handleModeChange"
></uvx-keyboard>
```

## 工具栏

```vue
<uvx-keyboard
   ref="uKeyboard"
   tips="请输入金额"
   :show-cancel="true"
   :show-confirm="true"
   cancel-text="取消"
   confirm-text="完成"
   @cancel="handleCancel"
   @confirm="handleConfirm"
></uvx-keyboard>
```

## 自定义内容

```vue
<uvx-keyboard ref="uKeyboard" mode="car" :u-switch-key="true">
   <text>工具栏上方内容</text>
   <template #abc><text>ABC</text></template>
</uvx-keyboard>
```

## 实例控制

```uts
// 键盘实例
const uKeyboard = ref<UvxKeyboardComponentPublicInstance | null>(null);

uKeyboard.value?.open();
uKeyboard.value?.changeCarMode();
uKeyboard.value?.close();
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `mode` | 键盘类型 | `number \| card \| car` | `number` | 全部 |
| `dot-disabled` | 数字键盘是否隐藏小数点 | `boolean` | `false` | 全部 |
| `tooltip` | 是否显示顶部工具栏 | `boolean` | `true` | 全部 |
| `show-tips` | 是否显示工具栏标题 | `boolean` | `true` | 全部 |
| `tips` | 自定义工具栏标题；为空时按模式显示默认标题 | `string` | `""` | 全部 |
| `show-cancel` / `show-confirm` | 是否显示取消/确认按钮 | `boolean` | `true` | 全部 |
| `random` | 是否随机排列常规按键 | `boolean` | `false` | 全部 |
| `safe-area-inset-bottom` | 是否适配底部安全区 | `boolean` | `true` | 全部 |
| `close-on-click-overlay` | 点击遮罩是否关闭 | `boolean` | `true` | 全部 |
| `close-on-click-confirm` | 点击确认是否关闭 | `boolean` | `true` | 全部 |
| `overlay` | 是否显示遮罩 | `boolean` | `true` | 全部 |
| `z-index` | 弹层层级 | `string \| number` | `10075` | 全部 |
| `cancel-text` / `confirm-text` | 工具栏按钮国际化文字 | `string` | `取消` / `确定` | 全部 |
| `auto-change` | 车牌键盘输入省份后是否自动切换模式 | `boolean` | `false` | 全部 |
| `dis-keys` | 车牌键盘禁用按键 | `(string \| number)[]` | `[]` | 全部 |
| `u-switch-key` | 是否使用 `abc` 插槽替换车牌切换键 | `boolean` | `false` | 全部 |
| `u-style` | 键盘根节点样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 键盘根节点追加类名 | `string` | `""` | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `close` | 内部弹层关闭后触发 | - | 全部 |
| `change` | 点击普通按键时触发 | `string \| number` | 全部 |
| `confirm` / `cancel` | 点击工具栏确认/取消时触发 | - | 全部 |
| `backspace` | 点击或长按退格键时触发 | - | 全部 |
| `change-car-input-mode` | 车牌输入模式切换时触发 | `isAlphabet: boolean` | 全部 |

### Slots

| 名称 | 说明 | 平台 |
| :---: | :---: | :---: |
| `default` | 工具栏上方内容 | 全部 |
| `abc` | 车牌键盘自定义模式切换键内容 | 全部 |

### Methods

| 方法 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `open()` / `close()` | 打开或关闭键盘 | - | 全部 |
| `changeCarMode()` | 切换车牌键盘输入模式 | - | 全部 |

## 参考

- [uni-app x 安全区适配](https://doc.dcloud.net.cn/uni-app-x/css/common/variable.html)

