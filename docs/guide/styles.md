# 内置样式

uvx-ui 在 `index.scss` 中提供主题变量和少量通用工具类。使用前请确认 `App.uvue` 已全局引入：

```vue
<style lang="scss">
@import "@/uni_modules/uvx-ui/index.scss";
</style>
```

## 文本省略

`uvx-line-1` 用于单行省略，`uvx-line-2` 到 `uvx-line-5` 用于限制最多显示的行数：

```vue
<text class="uvx-line-1">单行内容过长时显示省略号</text>
<text class="uvx-line-2">多行内容过长时最多显示两行，多余内容显示省略号。</text>
```

不同渲染模式的支持范围如下：

| 类名 | Web / 小程序 | App 非 Vapor | App Vapor |
| --- | :---: | :---: | :---: |
| `uvx-line-1` | 支持 | 支持 | 支持 |
| `uvx-line-2` 至 `uvx-line-5` | 支持 | 使用原生 `lines` | 当前公共样式未提供 |

App Vapor 页面需要多行省略时，请优先使用具体组件提供的行数属性，并在目标平台真机验证。

## 0.5px 边框

| 类名 | 作用 |
| --- | --- |
| `uvx-border` | 四边边框 |
| `uvx-border-top` | 顶部边框 |
| `uvx-border-right` | 右侧边框 |
| `uvx-border-bottom` | 底部边框 |
| `uvx-border-left` | 左侧边框 |
| `uvx-border-top-bottom` | 顶部与底部边框 |

```vue
<view class="uvx-border-bottom">
   <uvx-text type="content" text="带底部分隔线的内容"></uvx-text>
</view>
```

边框宽度为 `0.5px`，颜色读取 `--uvx-border`，会随亮暗主题变化。实际物理宽度取决于设备像素密度和目标平台渲染结果。

## 重置按钮

`uvx-reset-button` 去除原生 `button` 的默认内边距、背景和边框，适合在必须使用 `button` 开放能力时自定义外观：

```vue
<button class="uvx-reset-button">
   <uvx-text type="primary" text="自定义按钮内容"></uvx-text>
</button>
```

该类只负责重置，不会自动补充尺寸、布局或按下状态。

## 按下反馈

`uvx-hover-class` 将按下状态透明度设为 `0.7`，通过内置组件的 `hover-class` 属性使用：

```vue
<view hover-class="uvx-hover-class">
   <uvx-text type="content" text="按住查看反馈"></uvx-text>
</view>
```

## 主题类

`.uvx-light` 和 `.uvx-dark` 分别声明亮色与暗色的 `--uvx-*` 变量。正常情况下由 `uvx-page` 自动应用；自定义页面容器时才需要手动添加。

主题机制和颜色变量见[主题与样式](/guide/theme)与 [Color 色彩](/components/color)。
