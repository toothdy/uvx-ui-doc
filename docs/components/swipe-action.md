<h5-demo src="pages/layout/swipe-action/swipe-action" title="SwipeAction 滑动单元格" />

# SwipeAction 滑动单元格

`uvx-swipe-action` 与 `uvx-swipe-action-item` 配合提供滑动操作容器，支持自动关闭其他项。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

## 基础用法

```vue
<uvx-swipe-action>
   <uvx-swipe-action-item>
      <uvx-cell title="向左滑动"></uvx-cell>
   </uvx-swipe-action-item>
</uvx-swipe-action>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| :---: | :---: | :---: | :---: |
| `auto-close` | 打开一项时是否关闭其他项 | `boolean` | `true` |

`options` 中每一项至少可设置 `text`，也可设置 `icon`、`iconSize` 和 `style`（样式对象）。按钮点击事件返回被点击的配置项、索引和当前项 `name`。

### SwipeActionItem Props

| 属性 | 说明 | 类型 | 默认值 |
| :---: | :---: | :---: | :---: |
| `show` | 是否显示操作区域 | `boolean` | `false` |
| `name` | 子项标识 | `string \| number` | `""` |
| `disabled` | 是否禁用滑动 | `boolean` | `false` |
| `auto-close` | 打开时是否关闭同组其他项 | `boolean` | `true` |
| `threshold` | 滑动触发阈值 | `number` | `20` |
| `options` | 右侧操作按钮配置（含 `text`、`icon`、`iconSize`、`style`） | `object[]` | `[]` |
| `duration` | 动画时长（ms） | `string \| number` | `300` |

### SwipeActionItem Events

| 事件 | 说明 | 参数 |
| :---: | :---: | :---: |
| `click` | 点击右侧操作按钮 | `{ item, index, name }` |
| `open` / `close` | 子项打开或关闭 | `{ name }` |

## 参考

- [uni-app x touch 事件](https://doc.dcloud.net.cn/uni-app-x/event/touch.html)
