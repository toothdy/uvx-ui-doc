<h5-demo src="pages/layout/float-drawer/float-drawer" title="FloatDrawer 浮动面板" />

# FloatDrawer 浮动面板

`uvx-float-drawer` 提供可拖拽高度的浮动抽屉，支持阻尼、惯性、最小/最大高度和位置事件。高度相关属性单位为 `vh`，手柄高度和圆角单位为 `px`。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

## 基础用法

```vue
<uvx-float-drawer :initial-height="35" :max-height="70" :min-height="35">
   <template #main><view><text>页面主内容</text></view></template>
   <template #float><view><text>面板内容</text></view></template>
</uvx-float-drawer>
```

页面内容放在 `main` 插槽，浮动面板内容放在 `float` 插槽；组件不渲染默认插槽内容。`position-change` 的 `height` 为当前高度（`vh`），`percentage` 为相对窗口高度的百分比。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| :---: | :---: | :---: | :---: |
| `initial-height` | 初始高度及中间吸附点，单位 `vh` | `number` | `35` |
| `max-height` | 最大高度，单位 `vh` | `number` | `70` |
| `min-height` | 最小高度，单位 `vh` | `number` | `35` |
| `handle-height` | 拖拽手柄高度，单位 `px` | `number` | `20` |
| `damping` | 拖拽阻尼系数 | `number` | `1` |
| `inertia` | 速度吸附灵敏度，`0` 表示关闭 | `number` | `1` |
| `bg-color` | 面板背景色，为空时跟随主题 | `string` | `""` |
| `radius` | 面板顶部圆角，单位 `px` | `string \| number` | `15` |
| `show-on-tab-bar` | 是否为 TabBar 预留底部空间 | `boolean` | `false` |
| `show-indicator` | 是否显示拖拽指示器 | `boolean` | `true` |
| `disabled` | 是否禁用拖拽 | `boolean` | `false` |
| `z-index` | 层级 | `number` | `100` |
| `u-style` / `u-class` | 自定义样式和类名 | `string` | `""` |

### Events

| 事件 | 说明 | 参数 |
| :---: | :---: | :---: |
| `position-change` | 高度变化 | `height: number, percentage: number` |
| `drag-start` / `drag-end` | 拖拽开始和结束 | - |

### Slots

| 名称 | 说明 |
| :---: | :---: |
| `main` | 页面主内容区域 |
| `float` | 可拖拽浮动面板内的滚动内容 |

## 参考

- [Pointer Events](https://developer.mozilla.org/zh-CN/docs/Web/API/Pointer_events)
