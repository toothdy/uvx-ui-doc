<h5-demo src="pages/index/index" title="组件总览" />

# 组件总览

uvx-ui 当前提供 74 个组件文档页面，按使用场景分为七类，部分页面同时说明配套子组件。文档中的示例均使用 Vue 3 `<script lang="uts" setup>`，API 以当前组件源码为准。

## 使用前提

请先在项目中安装并注册 `uvx-ui`，再复制组件示例。组件页面的“平台兼容性”只描述当前版本已验证的平台；小程序端目前仅支持微信小程序（`MP-WEIXIN`）。未在组件文档中说明的辅助组件属于内部实现，不作为可单独使用的公共 API。

## 组件分类

| 分类 | 组件 |
| :---: | :--- |
| 基础组件 | [按钮](/components/button)、[色彩](/components/color)、[图标](/components/icon)、[图片](/components/image)、[布局](/components/layout)、[超链接](/components/link)、[页面容器](/components/page)、[文本](/components/text)、[动画](/components/transition) |
| 数据组件 | [相册](/components/album)、[头像](/components/avatar)、[徽标数](/components/badge)、[进度条](/components/progress)、[标签](/components/tags)、[倒计时](/components/count-down)、[二维码](/components/qrcode)、[数字滚动](/components/count-to)、[内容为空](/components/empty)、[加载动画](/components/loading-icon)、[加载页](/components/loading-page)、[加载更多](/components/load-more)、[骨架屏](/components/skeleton)、[列表](/components/list)、[索引列表](/components/index-list)、[横向滚动列表](/components/scroll-list) |
| 反馈组件 | [警告提示](/components/alert)、[模态框](/components/modal)、[无网络提示](/components/no-network)、[消息提示](/components/notify)、[滚动通知](/components/notice-bar)、[遮罩层](/components/overlay)、[弹出层](/components/popup)、[消息提示](/components/toast)、[长按提示](/components/tooltip) |
| 表单组件 | [日历](/components/calendar)、[复选框](/components/checkbox)、[验证码倒计时](/components/code)、[验证码输入](/components/code-input)、[时间选择器](/components/datetime-picker)、[下拉筛选](/components/drop-down)、[表单](/components/form)、[输入框](/components/input)、[键盘](/components/keyboard)、[步进器](/components/number-box)、[颜色选择器](/components/pick-color)、[选择器](/components/picker)、[单选框](/components/radio)、[评分](/components/rate)、[搜索](/components/search)、[滑动选择器](/components/slider)、[开关选择器](/components/switch)、[文本域](/components/textarea)、[上传](/components/upload) |
| 布局组件 | [单元格](/components/cell)、[折叠面板](/components/collapse)、[浮动面板](/components/float-drawer)、[宫格布局](/components/grid)、[轮播图](/components/swiper)、[滑动单元格](/components/swipe-action)、[垂直选项卡](/components/vtabs)、[瀑布流布局](/components/waterfall) |
| 导航组件 | [上拉菜单](/components/action-sheet)、[返回顶部](/components/backtop)、[导航栏](/components/navbar)、[底部导航栏](/components/tabbar)、[标签页](/components/tabs)、[步骤条](/components/steps)、[分段器](/components/subsection)、[吸顶](/components/sticky) |
| 其他组件 | [分割线](/components/divider)、[间隔槽](/components/gap)、[线条](/components/line)、[富文本](/components/parse)、[展开阅读更多](/components/read-more) |

## API

每个组件页面会列出属性、事件、插槽、公开方法和平台差异。事件回调参数按 UTS 类型书写，复制示例时请一并保留示例中的类型导入和状态声明。
