import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitepress";

export default defineConfig({
   title: "uvx-ui 组件库",
   description: "基于 uni-app x 构建的组件库，使用 uvue 与 UTS 开发，App 端原生渲染，支持 Android、iOS、鸿蒙、H5 和微信小程序，内置主题定制、暗黑模式、国际化。",
   lang: "zh-CN",
   cleanUrls: false,
   lastUpdated: true,
   head: [
      ["link", { rel: "icon", type: "image/jpeg", href: "/logo.jpeg" }],
      [
         "meta",
         {
            name: "keywords",
            content:
               "uvx-ui,uvx-ui组件库,uni-app x,uniappx,uniapp,uni-app,uvue,uts,UI组件库,UI框架,跨端组件库,Android,iOS,鸿蒙,HarmonyOS,微信小程序,H5",
         },
      ],
   ],
   vite: {
      resolve: {
         alias: {
            "@": fileURLToPath(new URL("../", import.meta.url)),
         },
      },
   },
   themeConfig: {
      logo: "/logo.jpeg",
      siteTitle: "uvx-ui",
      nav: [
         { text: "演示", link: "/demo" },
         { text: "指南", link: "/guide/intro" },
         { text: "组件", link: "/components/intro" },
         { text: "API", link: "/components/intro#api" },
      ],
      sidebar: {
         "/guide/": [
            {
               text: "开发文档",
               items: [
                  { text: "介绍", link: "/guide/intro" },
                  { text: "安装", link: "/guide/install" },
                  { text: "快速上手", link: "/guide/quickstart" },
                  { text: "配置", link: "/guide/config" },
                  { text: "注意事项", link: "/guide/notes" },
                  { text: "更新日志", link: "/guide/changelog" },
               ],
            },
            {
               text: "样式与主题",
               items: [
                  { text: "主题与样式", link: "/guide/theme" },
                  { text: "内置样式", link: "/guide/styles" },
                  { text: "自定义图标库", link: "/guide/custom-icon" },
               ],
            },
         ],
         "/components/": [
            {
               text: "起步",
               items: [{ text: "组件总览", link: "/components/intro" }],
            },
            {
               text: "基础组件",
               items: [
                  { text: "Button 按钮", link: "/components/button" },
                  { text: "Color 色彩", link: "/components/color" },
                  { text: "Icon 图标", link: "/components/icon" },
                  { text: "Image 图片", link: "/components/image" },
                  { text: "Layout 布局", link: "/components/layout" },
                  { text: "Link 超链接", link: "/components/link" },
                  { text: "Page 页面容器", link: "/components/page" },
                  { text: "Text 文本", link: "/components/text" },
                  { text: "Transition 动画", link: "/components/transition" },
               ],
            },
            {
               text: "数据组件",
               items: [
                  { text: "Album 相册", link: "/components/album" },
                  { text: "Avatar 头像", link: "/components/avatar" },
                  { text: "Badge 徽标数", link: "/components/badge" },
                  { text: "Progress 进度条", link: "/components/progress" },
                  { text: "Tags 标签", link: "/components/tags" },
                  { text: "CountDown 倒计时", link: "/components/count-down" },
                  { text: "QRCode 二维码", link: "/components/qrcode" },
                  { text: "CountTo 数字滚动", link: "/components/count-to" },
                  { text: "Empty 内容为空", link: "/components/empty" },
                  { text: "LoadingIcon 加载动画", link: "/components/loading-icon" },
                  { text: "LoadingPage 加载页", link: "/components/loading-page" },
                  { text: "LoadMore 加载更多", link: "/components/load-more" },
                  { text: "Skeleton 骨架屏", link: "/components/skeleton" },
                  { text: "List 列表", link: "/components/list" },
                  { text: "IndexList 索引列表", link: "/components/index-list" },
                  { text: "ScrollList 横向滚动列表", link: "/components/scroll-list" },
               ],
            },
            {
               text: "反馈组件",
               items: [
                  { text: "Alert 警告提示", link: "/components/alert" },
                  { text: "Modal 模态框", link: "/components/modal" },
                  { text: "NoNetwork 无网络提示", link: "/components/no-network" },
                  { text: "Notify 消息提示", link: "/components/notify" },
                  { text: "NoticeBar 滚动通知", link: "/components/notice-bar" },
                  { text: "Overlay 遮罩层", link: "/components/overlay" },
                  { text: "Popup 弹出层", link: "/components/popup" },
                  { text: "Toast 消息提示", link: "/components/toast" },
                  { text: "Tooltip 长按提示", link: "/components/tooltip" },
               ],
            },
            {
               text: "表单组件",
               items: [
                  { text: "Calendar 日历", link: "/components/calendar" },
                  { text: "Checkbox 复选框", link: "/components/checkbox" },
                  { text: "Code 验证码倒计时", link: "/components/code" },
                  { text: "CodeInput 验证码输入", link: "/components/code-input" },
                  { text: "DatetimePicker 时间选择器", link: "/components/datetime-picker" },
                  { text: "DropDown 下拉筛选", link: "/components/drop-down" },
                  { text: "Form 表单", link: "/components/form" },
                  { text: "Input 输入框", link: "/components/input" },
                  { text: "Keyboard 键盘", link: "/components/keyboard" },
                  { text: "NumberBox 步进器", link: "/components/number-box" },
                  { text: "PickColor 颜色选择器", link: "/components/pick-color" },
                  { text: "Picker 选择器", link: "/components/picker" },
                  { text: "Radio 单选框", link: "/components/radio" },
                  { text: "Rate 评分", link: "/components/rate" },
                  { text: "Search 搜索", link: "/components/search" },
                  { text: "Slider 滑动选择器", link: "/components/slider" },
                  { text: "Switch 开关选择器", link: "/components/switch" },
                  { text: "Textarea 文本域", link: "/components/textarea" },
                  { text: "Upload 上传", link: "/components/upload" },
               ],
            },
            {
               text: "布局组件",
               items: [
                  { text: "Cell 单元格", link: "/components/cell" },
                  { text: "Collapse 折叠面板", link: "/components/collapse" },
                  { text: "FloatDrawer 浮动面板", link: "/components/float-drawer" },
                  { text: "Grid 宫格布局", link: "/components/grid" },
                  { text: "Swiper 轮播图", link: "/components/swiper" },
                  { text: "SwipeAction 滑动单元格", link: "/components/swipe-action" },
                  { text: "Vtabs 垂直选项卡", link: "/components/vtabs" },
                  { text: "Waterfall 瀑布流布局", link: "/components/waterfall" },
               ],
            },
            {
               text: "导航组件",
               items: [
                  { text: "ActionSheet 上拉菜单", link: "/components/action-sheet" },
                  { text: "BackTop 返回顶部", link: "/components/backtop" },
                  { text: "Navbar 导航栏", link: "/components/navbar" },
                  { text: "Tabbar 底部导航栏", link: "/components/tabbar" },
                  { text: "Tabs 标签页", link: "/components/tabs" },
                  { text: "Steps 步骤条", link: "/components/steps" },
                  { text: "Subsection 分段器", link: "/components/subsection" },
                  { text: "Sticky 吸顶", link: "/components/sticky" },
               ],
            },
            {
               text: "其他组件",
               items: [
                  { text: "Divider 分割线", link: "/components/divider" },
                  { text: "Gap 间隔槽", link: "/components/gap" },
                  { text: "Line 线条", link: "/components/line" },
                  { text: "Parse 富文本", link: "/components/parse" },
                  { text: "ReadMore 展开阅读更多", link: "/components/read-more" },
               ],
            },
         ],
      },
      outline: {
         level: [2, 3],
         label: "页面导航",
      },
      returnToTopLabel: "回到顶部",
      sidebarMenuLabel: "页面导航",
      darkModeSwitchLabel: "外观",
      lightModeSwitchTitle: "切换到浅色模式",
      darkModeSwitchTitle: "切换到深色模式",
      docFooter: { prev: "上一篇", next: "下一篇" },
      notFound: {
         title: "页面未找到",
         quote: "你访问的页面不存在",
         linkLabel: "返回首页",
         linkText: "返回首页",
      },
      aside: false,
      search: {
         provider: "local",
         options: {
            translations: {
               button: {
                  buttonText: "请输入关键词",
                  buttonAriaLabel: "搜索文档",
               },
               modal: {
                  displayDetails: "显示详细列表",
                  resetButtonTitle: "清空搜索",
                  backButtonTitle: "关闭搜索",
                  noResultsText: "未找到相关结果：",
                  footer: {
                     selectText: "选择",
                     selectKeyAriaLabel: "回车",
                     navigateText: "切换",
                     navigateUpKeyAriaLabel: "向上",
                     navigateDownKeyAriaLabel: "向下",
                     closeText: "关闭",
                     closeKeyAriaLabel: "退出",
                  },
               },
            },
         },
      },
      socialLinks: [{ icon: "github", link: "https://github.com/toothdy" }],
      footer: {
         message: "uvx-ui · uni-app x 组件库",
         copyright: "Released under the MIT License.",
      },
   },
});
