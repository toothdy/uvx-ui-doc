# 安装

本章说明如何把 uvx-ui 接入现有 uni-app x 项目。完成入口安装和 easycom 配置后，组件可直接在模板中使用。

## 准备工作

接入前请确认：

- 项目是使用 Vue 3 的 uni-app x 项目；
- HBuilderX 已安装 sass/scss 编译插件；
- 开发工具版本满足所用组件文档标注的最低要求。

## 1. 导入组件库

将 `uvx-ui` 放入项目的 `uni_modules` 目录：

```text
项目根目录/
└── uni_modules/
    └── uvx-ui/
```

通过插件市场导入时，请同时导入插件声明的依赖：

- `lime-i18n`
- `uvx-animation`
- `uvx-system-settings`

不要只复制单个组件目录。部分动画、系统设置和公共工具会引用同级 `uni_modules` 插件。

## 2. 配置 easycom

在项目根目录的 `pages.json` 中开启自动扫描，并添加 `uvx-*` 组件映射：

```json
{
   "easycom": {
      "autoscan": true,
      "custom": {
         "^uvx-(.*)": "@/uni_modules/uvx-ui/components/uvx-$1/uvx-$1.uvue"
      }
   },
   "pages": []
}
```

以上映射与 uvx-ui 示例工程一致。已有 `pages.json` 时，只合并 `easycom` 节点，不要覆盖原有 `pages`、`globalStyle` 和分包配置。

配置完成后，`uvx-button` 会自动解析到对应组件文件，无需在页面中单独导入。

## 3. 引入主题与公共样式

在项目根目录的 `uni.scss` 中引入主题变量：

```scss
@import "@/uni_modules/uvx-ui/theme.scss";
```

在 `App.uvue` 中引入组件库公共样式。多行省略、细边框和主题 CSS 变量等工具类依赖此入口：

```vue
<style lang="scss">
@import "@/uni_modules/uvx-ui/index.scss";
</style>
```

## 4. 创建业务语言包

组件库入口会读取项目根目录下的三个业务语言包。即使暂时不覆盖词条，也需要创建这些文件：

```text
项目根目录/
└── locales/
    ├── zh-cn.json
    ├── zh-tw.json
    └── en.json
```

暂时没有自定义词条时，三个文件内容均可使用空数组：

```json
[]
```

语言包使用二维字符串数组，业务词条会覆盖组件库中的同名词条：

```json
[
   ["确认", "提交"],
   ["取消", "返回"]
]
```

## 5. 安装入口插件

在 `main.uts` 中安装 uvx-ui：

```uts
import App from "./App.uvue";
import { createSSRApp } from "vue";
import uvxui from "@/uni_modules/uvx-ui";

export function createApp() {
   const app = createSSRApp(App);
   app.use(uvxui);
   return { app };
}
```

安装过程会初始化主题、读取已保存的字号、注册语言包，并把 `$uvx` 工具对象挂载到应用全局属性。

## 6. 验证安装

在任意已注册的 `.uvue` 页面中直接使用组件：

```vue
<template>
   <uvx-page>
      <uvx-button type="primary" text="uvx-ui 已安装"></uvx-button>
   </uvx-page>
</template>
```

组件能正常显示即表示 easycom、入口插件和样式均已生效。

## 常见问题

| 现象 | 检查项 |
| --- | --- |
| 找不到 `uvx-*` 组件 | 检查 `pages.json` 中的 `easycom.custom` 映射及组件安装位置，然后重新编译项目 |
| 找不到语言包 | 确认根目录存在 `locales/zh-cn.json`、`zh-tw.json` 和 `en.json` |
| SCSS 编译失败 | 在 HBuilderX 插件市场安装或更新 sass/scss 编译插件 |
| 工具类或主题变量不生效 | 确认 `App.uvue` 已引入 `uvx-ui/index.scss` |
| 找不到动画或系统设置模块 | 补齐 `uvx-animation`、`uvx-system-settings` 等依赖 |

下一步阅读[快速上手](/guide/quickstart)，创建一个完整页面。
