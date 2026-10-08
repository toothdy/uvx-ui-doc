# 主题与样式

uvx-ui 通过响应式主题状态和 CSS 变量提供亮色、暗色及品牌色能力。入口插件负责初始化主题，`uvx-page` 负责把主题类应用到页面根节点。

## 默认行为

安装组件库后会自动执行主题初始化：

| 平台 | 初始主题与监听行为 |
| --- | --- |
| App | 读取应用主题；应用主题为 `auto` 时跟随系统，并监听系统与应用主题变化 |
| Web | 读取宿主主题，默认回退为亮色；切换时同步更新页面根节点的 `dark` 类 |
| 微信小程序 | 读取宿主主题并监听宿主主题变化 |

使用 `uvx-page` 作为页面根容器时，它会根据当前状态自动添加 `.uvx-light` 或 `.uvx-dark`。组件随后从该作用域读取 `--uvx-*` 变量。

```vue
<template>
   <uvx-page>
      <uvx-text type="main" text="文字会随主题切换"></uvx-text>
   </uvx-page>
</template>
```

## 手动切换主题

`setTheme` 设置指定主题，`toggleTheme` 在亮色和暗色之间切换：

```vue
<template>
   <uvx-page>
      <uvx-text
         type="content"
         :text="isDark ? '当前为暗色' : '当前为亮色'"
      ></uvx-text>
      <uvx-button text="切换主题" @click="toggleTheme"></uvx-button>
   </uvx-page>
</template>

<script setup lang="uts">
import {
   isDark,
   setTheme,
   toggleTheme,
} from "@/uni_modules/uvx-ui";

const useLightTheme = (): void => {
   setTheme("light");
};
</script>
```

在 App 端手动设置主题后会退出自动跟随状态。

## App 跟随系统

`setIsAuto` 用于切换 App 的自动跟随状态，仅 App 平台有效。它是“切换”方法，不接收布尔参数：

```uts
// #ifdef APP
import { isAuto, setIsAuto } from "@/uni_modules/uvx-ui";

const toggleAutoTheme = (): void => {
   setIsAuto();
   console.log(isAuto.value);
};
// #endif
```

## 运行时自定义颜色

在主题作用域内覆盖 CSS 变量，可以只影响当前页面或页面中的一个区域：

```vue
<template>
   <uvx-page>
      <view class="brand-theme">
         <uvx-button type="primary" text="品牌色按钮"></uvx-button>
         <uvx-text type="content" text="局部主题内容"></uvx-text>
      </view>
   </uvx-page>
</template>

<style>
.brand-theme {
   --uvx-primary: #007a5a;
   --uvx-text-content: #334155;
   --uvx-border: #cbd5e1;
}
</style>
```

常用变量包括：

| 类型 | CSS 变量 |
| --- | --- |
| 页面与容器 | `--uvx-page`、`--uvx-container`、`--uvx-hover` |
| 文字 | `--uvx-text-main`、`--uvx-text-content`、`--uvx-text-tips`、`--uvx-text-placeholder` |
| 状态色 | `--uvx-primary`、`--uvx-success`、`--uvx-warning`、`--uvx-error`、`--uvx-info` |
| 边框与禁用 | `--uvx-border`、`--uvx-disabled` |

完整变量及默认色值见 [Color 色彩](/components/color)。

## 编译期修改默认主题

默认 SCSS 色值位于：

```text
uni_modules/uvx-ui/theme.scss
```

当前版本的变量不是 `!default` 变量。如需改变所有页面的编译期默认值，需要直接修改该文件中的亮色和暗色色值，然后重新编译项目。升级或重新导入 uvx-ui 可能覆盖这些修改，建议在升级前保存差异。

只需局部或运行时换肤时，优先覆盖 CSS 变量，不修改组件内部节点结构。

## 自定义页面根容器

不使用 `uvx-page` 时，需要自行把主题类放到能包裹所有组件的节点上：

```vue
<template>
   <view :class="isDark ? 'uvx-dark' : 'uvx-light'">
      <uvx-button type="primary" text="自定义页面"></uvx-button>
   </view>
</template>

<script setup lang="uts">
import { isDark } from "@/uni_modules/uvx-ui";
</script>
```

同时确认 `App.uvue` 已引入 `uvx-ui/index.scss`。组件公开的样式属性、CSS 变量或 external class 应优先于直接依赖内部节点。
