# 扩展自定义图标库

内置图标不能满足业务需求时，可以把 iconfont 字体接入 `uvx-icon`。组件固定读取项目中的 `/static/custom-icon.ttf`，不需要额外编写 `@font-face`。

## 1. 下载字体文件

在 [阿里字体图标库](https://www.iconfont.cn) 的项目中选择“下载至本地”，解压后找到 `iconfont.ttf`。

自定义图标按字体码点渲染，因此彩色图标会显示为单色。显示颜色由 `uvx-icon` 的 `color` 属性控制。

## 2. 放入 static 目录

把文件改名为 `custom-icon.ttf`，放到项目根目录的 `static` 中：

```text
项目根目录/
└── static/
    └── custom-icon.ttf
```

路径和文件名必须完全一致。替换字体后需要重新编译项目，热更新不能保证刷新已打包的字体资源。

## 3. 查找码点

打开下载包中的 `iconfont.css`，找到目标图标的 `content`：

```css
.icon-edit::before {
   content: "\e641";
}
```

传给组件时去掉反斜杠，使用四位十六进制码点 `e641`。

## 4. 使用自定义图标

`uPrefix` 传入一个非 `uvx-icon` 的自定义前缀，`name` 传四位码点：

```vue
<template>
   <uvx-icon
      u-prefix="business-icon"
      name="e641"
      color="#007a5a"
      :size="30"
   ></uvx-icon>
</template>
```

前缀用于区分自定义字体实例，可按业务命名；字体文件路径仍固定为 `/static/custom-icon.ttf`。

## 更新字体

在 iconfont 项目中新增图标后：

1. 重新下载完整字体包；
2. 用新的 `iconfont.ttf` 覆盖 `static/custom-icon.ttf`；
3. 检查原有图标码点是否变化；
4. 清理旧构建产物并重新编译所有目标平台。

## 常见问题

| 现象 | 原因与处理 |
| --- | --- |
| 图标空白 | 检查文件路径、文件名、`u-prefix` 和四位码点，然后重新编译 |
| 图标显示成方框或问号 | 当前字体不包含该码点，或字体文件损坏，重新下载完整 TTF |
| 新增图标未更新 | 字体仍是旧构建缓存，覆盖文件后清理并重新编译 |
| 图标颜色不正确 | iconfont 字体按单色渲染，请通过 `color` 设置颜色 |
| 某个平台正常、另一个平台空白 | 分别清理对应平台构建缓存，并确认 `/static` 资源已打包 |

## 相关文档

- [Icon 图标组件](/components/icon)
- [uni-app x font-family](https://doc.dcloud.net.cn/uni-app-x/css/font-family.html)
- [阿里字体图标库](https://www.iconfont.cn)
