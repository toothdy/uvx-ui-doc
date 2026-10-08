# 快速上手

完成[安装](/guide/install)后，可以用一个页面验证组件、事件、主题和 App 端滚动容器是否正常工作。

## 1. 创建页面

新建 `pages/demo/demo.uvue`：

```vue
<template>
   <uvx-page>
      <view class="page-content">
         <uvx-text type="main" text="第一个 uvx-ui 页面" :size="20"></uvx-text>
         <uvx-text
            type="content"
            text="组件已通过 easycom 映射自动注册"
         ></uvx-text>
         <uvx-button
            type="primary"
            text="点击验证"
            @click="handleClick"
         ></uvx-button>
      </view>
   </uvx-page>
</template>

<script setup lang="uts">
const handleClick = (): void => {
   uni.showToast({
      title: "运行成功",
      icon: "none",
   });
};
</script>

<style>
.page-content {
   display: flex;
   flex-direction: column;
   gap: 16px;
   padding: 20px;
}
</style>
```

安装阶段已在 `pages.json` 中配置 `easycom.custom` 映射，因此页面内不需要 `import` 或 `components` 注册。

## 2. 注册页面

在项目根目录的 `pages.json` 中保留 easycom 配置，并添加页面路径：

```json
{
   "easycom": {
      "autoscan": true,
      "custom": {
         "^uvx-(.*)": "@/uni_modules/uvx-ui/components/uvx-$1/uvx-$1.uvue"
      }
   },
   "pages": [
      {
         "path": "pages/demo/demo",
         "style": {
            "navigationBarTitleText": "快速上手"
         }
      }
   ]
}
```

已有配置时，只合并 `easycom` 节点并添加新的页面项，不要覆盖原有页面或其他全局配置。

## 3. 运行验证

运行到目标平台后，确认以下结果：

- 页面能显示标题、说明和按钮；
- 点击按钮后出现“运行成功”提示；
- 切换系统主题后，支持的平台能更新页面和组件颜色。

## 为什么使用 uvx-page

`uvx-page` 是组件库提供的页面根容器：

- App 端内部使用 `scroll-view`，解决非 Vapor 模式下页面本身不可滚动的问题；
- Web 和小程序端使用普通 `view`，由页面负责滚动；
- 根节点自动挂载 `.uvx-light` 或 `.uvx-dark`，让子组件读取正确的主题变量；
- 内置页面级 Toast 实例；
- 当前版本在 App 端同时提供主题切换悬浮按钮。

如果不使用 `uvx-page`，需要自行提供滚动容器和 `.uvx-light` / `.uvx-dark` 主题作用域。

## 继续阅读

- 修改字号、层级与语言：[配置](/guide/config)
- 切换亮暗主题与品牌色：[主题与样式](/guide/theme)
- 使用省略、细边框等工具类：[内置样式](/guide/styles)
- 查看组件属性和事件：[组件总览](/components/intro)
