# 介绍

uvx-ui 是面向 uni-app x 的跨端 UI 组件库，使用 UTS 与 UVue 编写。App 端编译为原生界面，同一套组件代码可运行在 Android、iOS、HarmonyOS、Web 和微信小程序。

## 核心特性

- **原生渲染**：App 端不依赖 WebView，保留 uni-app x 的原生渲染能力。
- **UTS 强类型**：组件属性、事件和公开方法均使用明确类型，在编译阶段暴露问题。
- **Vapor 优先**：以 Vue Vapor 模式为主要运行方式，并通过条件编译兼容非 Vapor 工程。
- **跨端组件**：当前源码包含 69 个组件，覆盖基础、表单、数据、反馈、布局与导航等常见场景。
- **主题适配**：内置亮色、暗色主题及响应式主题状态，支持运行时切换。
- **国际化**：内置简体中文、繁体中文和英文语言包，允许业务项目覆盖同名词条。
- **easycom**：完成 `pages.json` 映射后，组件可直接在模板中使用，无需逐个导入和注册。

各组件的最低 HBuilderX 版本和平台差异可能不同，请以对应组件文档中的兼容性表格为准。

## 从哪里开始

首次接入建议按以下顺序阅读：

1. [安装](/guide/install)：导入组件库、依赖、全局样式和语言包。
2. [快速上手](/guide/quickstart)：创建第一个使用 uvx-ui 的 UVue 页面。
3. [配置](/guide/config)：设置字号、弹层基础层级和语言。
4. [主题与样式](/guide/theme)：使用亮暗主题和自定义品牌色。
5. [注意事项](/guide/notes)：了解 uni-app x 的跨平台开发约束。

需要查找具体组件时，前往[组件总览](/components/intro)。

## 与 uv-ui 的关系

uvx-ui 延续了 uv-ui 的组件体系和设计经验，但并不是将原有 Vue 组件直接搬到 uni-app x。组件已按 UTS 强类型、UVue 原生渲染和 uni-app x 平台能力重新实现，使用时应以本站文档为准。

名称中的 `uv` 延续自 uv-ui，`x` 代表 uni-app x。

## 开源协议

uvx-ui 使用 MIT 协议，可免费用于个人或商业项目。使用组件库时仍需遵守目标平台、第三方服务及相关法律法规的要求。

## 致谢

- [uni-app x](https://doc.dcloud.net.cn/uni-app-x/) 与 DCloud 团队
- [Vue.js](https://cn.vuejs.org/)
- [uView](https://v1.uviewui.com/) 与 [uv-ui](https://www.uvui.cn/) 生态
