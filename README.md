# uvx-ui 文档站

基于 VitePress、Vue 3 和 Element Plus 的 `uvx-ui` 独立文档网站。

## 开发

```bash
pnpm install
pnpm dev
```

## 构建

```bash
pnpm build
pnpm preview
```

文档站只负责展示 Markdown 文档和 H5 示例入口。`uvx-ui` 的真实示例由组件库项目单独编译后，通过 `UvH5Preview` 组件嵌入。
