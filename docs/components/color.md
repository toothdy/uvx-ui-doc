<h5-demo src="pages/basic/color/color" title="Color 色彩" />

# Color 色彩

`uvx-ui` 色板由品牌色（功能色）、文本语义色、表面背景色与边框/禁用色组成，全部以 CSS 变量（`--uvx-*`）形式提供，内置亮色、暗色两套取值。组件与自定义样式均通过变量取色，可自动跟随明暗主题切换。

## 功能色

品牌功能色用于表达操作与状态语义，组件普遍通过 `type` 属性消费这组颜色。

| 变量 | 亮色值 | 暗色值 | 用途说明 |
| :---: | :---: | :---: | :---: |
| `--uvx-primary` | <span class="color-swatch" style="background-color:#3c9cff"></span>`#3c9cff` | <span class="color-swatch" style="background-color:#398ade"></span>`#398ade` | 品牌主色，用于主要操作按钮、选中态、强调内容 |
| `--uvx-success` | <span class="color-swatch" style="background-color:#5ac725"></span>`#5ac725` | <span class="color-swatch" style="background-color:#53c21d"></span>`#53c21d` | 成功色，用于操作成功、完成状态 |
| `--uvx-warning` | <span class="color-swatch" style="background-color:#f9ae3d"></span>`#f9ae3d` | <span class="color-swatch" style="background-color:#f1a532"></span>`#f1a532` | 警告色，用于警示提醒 |
| `--uvx-error` | <span class="color-swatch" style="background-color:#f56c6c"></span>`#f56c6c` | <span class="color-swatch" style="background-color:#e45656"></span>`#e45656` | 错误色，用于失败提示、危险操作 |
| `--uvx-info` | <span class="color-swatch" style="background-color:#909399"></span>`#909399` | <span class="color-swatch" style="background-color:#767a82"></span>`#767a82` | 信息色，用于中性提示 |

`theme.scss` 中还为每个功能色定义了一组禁用态与浅色背景的 SCSS 变量，供自定义扩展使用（当前内置组件未直接消费）：

| SCSS 变量 | 色值 | 用途说明 |
| :---: | :---: | :---: |
| `$uvx-primary-disabled` | <span class="color-swatch" style="background-color:#9acafc"></span>`#9acafc` | 主色禁用态 |
| `$uvx-primary-light` | <span class="color-swatch" style="background-color:#ecf5ff"></span>`#ecf5ff` | 主色浅色背景 |
| `$uvx-success-disabled` | <span class="color-swatch" style="background-color:#a9e08f"></span>`#a9e08f` | 成功色禁用态 |
| `$uvx-success-light` | <span class="color-swatch" style="background-color:#f5fff0"></span>`#f5fff0` | 成功色浅色背景 |
| `$uvx-warning-disabled` | <span class="color-swatch" style="background-color:#f9d39b"></span>`#f9d39b` | 警告色禁用态 |
| `$uvx-warning-light` | <span class="color-swatch" style="background-color:#fdf6ec"></span>`#fdf6ec` | 警告色浅色背景 |
| `$uvx-error-disabled` | <span class="color-swatch" style="background-color:#f7b2b2"></span>`#f7b2b2` | 错误色禁用态 |
| `$uvx-error-light` | <span class="color-swatch" style="background-color:#fef0f0"></span>`#fef0f0` | 错误色浅色背景 |
| `$uvx-info-disabled` | <span class="color-swatch" style="background-color:#c4c6c9"></span>`#c4c6c9` | 信息色禁用态 |
| `$uvx-info-light` | <span class="color-swatch" style="background-color:#f4f4f5"></span>`#f4f4f5` | 信息色浅色背景 |

## 文字颜色

文本语义色按信息层级划分，从主要文字到占位文字逐级变浅。

| 变量 | 亮色值 | 暗色值 | 用途说明 |
| :---: | :---: | :---: | :---: |
| `--uvx-text-main` | <span class="color-swatch" style="background-color:#303133"></span>`#303133` | <span class="color-swatch" style="background-color:#f5f5f5"></span>`#f5f5f5` | 主要文字，用于标题、重点内容 |
| `--uvx-text-content` | <span class="color-swatch" style="background-color:#606266"></span>`#606266` | <span class="color-swatch" style="background-color:#d8d8d8"></span>`#d8d8d8` | 常规文字，用于正文内容 |
| `--uvx-text-tips` | <span class="color-swatch" style="background-color:#909399"></span>`#909399` | <span class="color-swatch" style="background-color:#a8a8a8"></span>`#a8a8a8` | 次要文字，用于辅助说明、次要信息 |
| `--uvx-text-placeholder` | <span class="color-swatch" style="background-color:#c0c4cc"></span>`#c0c4cc` | <span class="color-swatch" style="background-color:#6e6e6e"></span>`#6e6e6e` | 占位文字，用于输入框占位符等占位场景 |

## 背景颜色

表面色构成页面与容器的层级背景。

| 变量 | 亮色值 | 暗色值 | 用途说明 |
| :---: | :---: | :---: | :---: |
| `--uvx-page` | <span class="color-swatch" style="background-color:#ffffff"></span>`#ffffff` | <span class="color-swatch" style="background-color:#000000"></span>`#000000` | 页面背景 |
| `--uvx-container` | <span class="color-swatch" style="background-color:#f7f8fa"></span>`#f7f8fa` | <span class="color-swatch" style="background-color:#1f1f1f"></span>`#1f1f1f` | 容器背景，用于卡片、单元格等内容容器 |
| `--uvx-hover` | <span class="color-swatch" style="background-color:#f2f3f5"></span>`#f2f3f5` | <span class="color-swatch" style="background-color:#2a2a2a"></span>`#2a2a2a` | 悬停背景，用于按压、悬停高亮态 |

## 边框与禁用色

| 变量 | 亮色值 | 暗色值 | 用途说明 |
| :---: | :---: | :---: | :---: |
| `--uvx-border` | <span class="color-swatch" style="background-color:#ebedf0"></span>`#ebedf0` | <span class="color-swatch" style="background-color:#3a3a3a"></span>`#3a3a3a` | 边框色，用于分割线、组件描边 |
| `--uvx-disabled` | <span class="color-swatch" style="background-color:#dedede"></span>`#dedede` | <span class="color-swatch" style="background-color:#383838"></span>`#383838` | 禁用色，用于禁用态背景 |
| `--uvx-switch-border` | <span class="color-swatch" style="background-color:rgba(0, 0, 0, 0.12)"></span>`rgba(0, 0, 0, 0.12)` | <span class="color-swatch" style="background-color:rgba(255, 255, 255, 0.12)"></span>`rgba(255, 255, 255, 0.12)` | 辅助变量，开关、标签栏等组件的半透明边框色 |
| `--uvx-shadow` | <span class="color-swatch" style="background-color:rgba(0, 0, 0, 0.25)"></span>`rgba(0, 0, 0, 0.25)` | <span class="color-swatch" style="background-color:rgba(255, 255, 255, 0.25)"></span>`rgba(255, 255, 255, 0.25)` | 辅助变量，组件阴影色（如开关滑块投影） |

::: warning 使用须知

1. 组件通过 `type` 属性消费品牌色与文本语义色。以 `uvx-text` 为例，`type` 支持 `primary`、`success`、`warning`、`error`、`info` 五个品牌色和 `main`、`content`、`tips` 三个文本语义色，其余组件见各自文档。
2. 文本语义色按信息层级选用：`main` 用于标题与重点内容，`content` 用于正文，`tips` 用于辅助说明，`--uvx-text-placeholder` 用于占位场景。
3. 全部颜色变量的亮色取值定义在 `.uvx-light` 类下、暗色取值定义在 `.uvx-dark` 类下，由 `uvx-page` 根据当前主题自动挂载。页面使用 `uvx-page` 包裹即可自动联动暗黑模式，无需手动判断；APP 端跟随应用/系统主题，WEB 与小程序端跟随宿主主题。示例中的 `uvx-theme` 悬浮按钮即主题切换入口。
4. 自定义样式直接引用变量即可，例如 `background-color: var(--uvx-primary)`。变量由 `uvx-page` 根节点挂载，请确保使用变量的节点位于 `uvx-page` 内部。

:::

## 参考

- [主题与样式](/guide/theme)

<style scoped>
.color-swatch {
   display: inline-block;
   width: 14px;
   height: 14px;
   margin-right: 6px;
   vertical-align: -2px;
   border: 1px solid var(--vp-c-divider);
   border-radius: 4px;
}
</style>
