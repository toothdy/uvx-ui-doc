<h5-demo src="pages/navigation/backtop/backtop" title="BackTop 返回顶部" />

# BackTop 返回顶部

`uvx-back-top` 在滚动超过阈值时提供返回顶部操作。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

## 基础用法

```vue
<uvx-back-top :scroll-top="0"></uvx-back-top>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| :---: | :---: | :---: | :---: |
| `mode` | 按钮形状 | `circle \| square` | `circle` |
| `icon` | 图标名称或图片路径 | `string` | `arrow-upward` |
| `text` | 按钮文字 | `string` | `""` |
| `duration` | 页面回顶动画时长（由页面使用） | `number` | `100` |
| `scroll-top` | 父页面传入的当前滚动距离 | `number` | `0` |
| `top` | 超过该滚动距离显示，单位 px | `number` | `400` |
| `bottom` / `right` | 距底部和右侧距离，单位 px | `number` | `100` / `20` |
| `z-index` | 层级 | `number` | `9` |
| `icon-style` | 图标自定义样式，CSS 字符串 | `string` | `""` |
| `u-style` | 根节点自定义样式 | `string` | `""` |

### Events

| 事件 | 说明 | 参数 |
| :---: | :---: | :---: |
| `click` | 点击按钮；页面需在回调中将滚动容器回到顶部 | - |

组件仅根据 `scroll-top > top` 控制显示，点击不会自行修改页面滚动位置。

## 参考

- [uni-app x scroll-view 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/scroll-view.html)
