<h5-demo src="pages/other/parse/parse" title="Parse 富文本" />

# Parse 富文本

`uvx-parse` 解析并渲染 HTML 富文本，支持文本选择、标签默认样式、相对地址补全、图片预览、链接跳转、锚点定位和页面标题设置。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.97+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

小程序端仅支持微信。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| HTML 渲染 | √ | √ | √ | √ | √ |
| `selectable` 文本选择 | 当前版本未生效 | 当前版本未生效 | 当前版本未生效 | 当前版本未生效 | √ |
| `tag-style`、`domain`、自定义样式 | √ | √ | √ | √ | √ |
| `set-title` 设置页面标题 | √ | √ | √ | √ | √ |
| `imgtap` / `linktap` 事件与图片预览 | √ | √ | 4.71+ | √ | × |
| 锚点跳转（`use-anchor`） | √ | √ | 4.71+ | √ | × |

::: warning 使用须知

1. 点击拦截依赖 rich-text 的 `itemclick` 事件，微信小程序不支持该事件：`imgtap`、`linktap`、图片预览、外链复制和锚点自动跳转在微信端均不生效，内容渲染与文本选择不受影响。
2. 外链（含 `://` 的地址）点击策略：H5 新窗口打开，App 与小程序复制链接到剪贴板；`javascript:` 伪协议直接忽略；其余按站内路径处理，先 `uni.navigateTo`，失败回退 `uni.switchTab`。
3. 组件固定使用 `mode="native"` 渲染，该属性仅 Android 4.71+ 生效。此模式下 HTML 字符串中的 `<img>` 不支持自定义宽高，以组件宽度为基准等比缩放，可通过 `tag-style` 为 `img` 追加 `max-width: 100%` 约束。
4. `content` 变更后整体重新解析，每次更新依次触发 `load` 与 `ready`。
5. `selectable` 当前绑定的是 rich-text 已废弃的 `user-select` 属性（仅微信支持），App 与 H5 端文本选择暂未生效，待源码修正。

:::

## 基础用法

通过 `content` 传入 HTML 字符串，`selectable` 开启文本选择，`use-anchor` 开启锚点跳转。`load` 在内容结构加载后触发，`ready` 返回根节点尺寸。

```vue
<template>
   <view class="parse-content">
      <uvx-parse
         :content="content"
         :tag-style="tagStyle"
         :selectable="true"
         :use-anchor="true"
         @load="handleLoad"
         @ready="handleReady"
         @imgtap="handleImageTap"
         @linktap="handleLinkTap"
      />
   </view>
</template>

<script lang="uts" setup>
const content = "<title>富文本解析器</title><h2 id=\"top\">标题</h2><p>段落内容，支持<strong>加粗</strong>与<a href=\"#top\">锚点</a>。</p><p><img src=\"/static/logo.jpeg\" /></p>";
// 标签默认样式
const tagStyle: UTSJSONObject = {
   p: "margin: 8px 0;",
   img: "max-width: 100%;",
};

/**
 * 处理内容加载事件
 * @returns null
 */
const handleLoad = (): void => {
   console.log("内容结构已加载");
};

/**
 * 处理内容渲染完成事件
 * @param rect 根节点尺寸
 * @returns null
 */
const handleReady = (rect: DOMRect | null): void => {
   console.log(rect == null ? "渲染完成" : "渲染完成，宽度 " + rect.width.toString() + "px");
};

/**
 * 处理图片点击事件
 * @param detail 图片点击详情
 * @returns null
 */
const handleImageTap = (detail: UniRichTextItemClickEventDetail): void => {
   if (detail.src != null) console.log("点击图片：" + detail.src);
};

/**
 * 处理链接点击事件
 * @param detail 链接点击详情
 * @returns null
 */
const handleLinkTap = (detail: UniRichTextItemClickEventDetail): void => {
   if (detail.href != null) console.log("点击链接：" + detail.href);
};
</script>
```

## 标签默认样式

`tag-style` 以标签名为键、CSS 字符串为值，为**未声明 `style` 属性**的标签注入默认样式，已写 `style` 的标签保持原样。

```vue
<template>
   <uvx-parse :content="content" :tag-style="tagStyle" />
</template>

<script lang="uts" setup>
const content = "<p>有默认段间距</p><p style=\"color:#3c9cff;\">自带样式不受影响</p>";

const tagStyle: UTSJSONObject = {
   p: "margin: 8px 0;",
   img: "max-width: 100%;",
};
</script>
```

## 相对地址补全

`domain` 为主域名，组件自动补全 HTML 中 `src` 与 `href` 的相对地址。锚点（`#` 开头）、绝对地址、`data:` 与 `mailto:` 开头的地址不做处理。

```vue
<template>
   <uvx-parse :content="content" domain="https://www.uvxui.cn" />
</template>

<script lang="uts" setup>
// /static/logo.jpeg 会被补全为 https://www.uvxui.cn/static/logo.jpeg
const content = "<p><img src=\"/static/logo.jpeg\" /></p><p><a href=\"/guide/intro\">站内链接</a></p>";
</script>
```

## 链接与图片

点击 `<img>` 触发 `imgtap`，`preview-img` 控制是否调用图片预览；点击 `<a>` 触发 `linktap`，跳转策略见上方使用须知。

```vue
<template>
   <uvx-parse
      :content="content"
      :preview-img="false"
      :copy-link="false"
      @imgtap="handleImageTap"
      @linktap="handleLinkTap"
   />
</template>

<script lang="uts" setup>
const content = "<p><img src=\"/static/logo.jpeg\" /></p><p><a href=\"https://www.uvxui.cn\">外链</a></p>";

/**
 * 处理图片点击事件
 * @param detail 图片点击详情
 * @returns null
 */
const handleImageTap = (detail: UniRichTextItemClickEventDetail): void => {
   if (detail.src != null) console.log("仅回调，不预览：" + detail.src);
};

/**
 * 处理链接点击事件
 * @param detail 链接点击详情
 * @returns null
 */
const handleLinkTap = (detail: UniRichTextItemClickEventDetail): void => {
   if (detail.href != null) console.log("仅回调，不复制：" + detail.href);
};
</script>
```

## 锚点跳转

`use-anchor` 为 `true` 时，点击 `href` 以 `#` 开头的链接滚动到对应 `id` 节点；传数字时表示额外偏移量（单位 px）。

```vue
<template>
   <uvx-parse :content="content" :use-anchor="44" />
</template>

<script lang="uts" setup>
const content = "<p><a href=\"#chapter\">跳到章节</a></p><h2 id=\"chapter\">章节标题</h2>";
</script>
```

## 页面标题

`set-title` 默认开启，`content` 中含 `<title>` 标签时，自动提取文本并调用 `uni.setNavigationBarTitle` 设置页面标题。

```vue
<template>
   <uvx-parse :content="content" :set-title="true" />
</template>

<script lang="uts" setup>
// 页面标题会被设置为「文档标题」
const content = "<title>文档标题</title><p>正文内容</p>";
</script>
```

## 公开方法

通过模板 ref 调用。`navigateTo` 需 `use-anchor` 开启，锚点禁用或未找到节点时 Promise 进入 reject。

```vue
<template>
   <uvx-parse ref="parseRef" :content="content" :use-anchor="true" />
   <uvx-button text="追加内容" @click="handleAppend"></uvx-button>
   <uvx-button text="提取文本" @click="handleGetText"></uvx-button>
</template>

<script lang="uts" setup>
const parseRef = ref<UvxParseComponentPublicInstance | null>(null);
const content = "<p>初始内容</p>";

/**
 * 追加内容，不覆盖已有节点
 * @returns null
 */
const handleAppend = (): void => {
   parseRef.value?.setContent("<p>追加的段落</p>", true);
};

/**
 * 提取富文本纯文本
 * @returns null
 */
const handleGetText = (): void => {
   console.log(parseRef.value?.getText());
};
</script>
```

### Methods

| 方法 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `setContent(content, append?)` | 设置内容，`append` 为 `true` 时追加到尾部 | `content: string`、`append: boolean`（默认 `false`） | 全部 |
| `getText(targetContent?)` | 提取纯文本，缺省提取当前内容 | `targetContent: string`（默认当前内容） | 全部 |
| `getRect()` | 返回根节点尺寸 | -，返回 `Promise<DOMRect \| null>` | 全部 |
| `navigateTo(id, offset?)` | 滚动到锚点节点，`offset` 为额外偏移量 | `id: string`、`offset: number`（默认 `0`），返回 `Promise<void>` | Android、iOS、鸿蒙、H5 |

## 自定义样式

`container-style` 与 `u-style` 都作用于根节点，`u-style` 优先级更高；`u-class` 追加外部样式类。

```vue
<template>
   <uvx-parse
      :content="content"
      container-style="padding: 12px;"
      u-style="background-color: #f8f8f8;"
      u-class="parse-box"
   />
</template>

<script lang="uts" setup>
const content = "<p>带容器样式的富文本</p>";
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `content` | 要渲染的 HTML 内容 | `string` | `""` | 全部 |
| `tag-style` | 未声明 `style` 的标签注入默认样式，键为标签名 | `UTSJSONObject` | `{}` | 全部 |
| `domain` | 相对地址补全使用的主域名 | `string` | `""` | 全部 |
| `copy-link` | 点击外链时是否复制链接（H5 为是否新窗口打开） | `boolean` | `true` | 全部 |
| `preview-img` | 点击图片时是否预览图片 | `boolean` | `true` | 全部 |
| `selectable` | 是否允许选择富文本内容；仅微信端生效，其余平台当前版本未生效 | `boolean` | `false` | 微信 |
| `set-title` | 是否将 `title` 标签内容设置为页面标题 | `boolean` | `true` | 全部 |
| `use-anchor` | 是否启用锚点跳转，数字表示额外偏移量 | `boolean \| number` | `false` | 全部 |
| `container-style` | 根节点自定义样式，被 `u-style` 覆盖 | `string` | `""` | 全部 |
| `u-style` | 根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到根节点的外部样式类 | `string` | `""` | 全部 |

### Events

`imgtap` 与 `linktap` 的参数均为 `UniRichTextItemClickEventDetail`：`src` 为图片链接、`href` 为超链接，两者至多存在一个。

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `load` | 内容更新并渲染后触发 | - | 全部 |
| `ready` | 内容渲染完成后返回根节点尺寸 | `DOMRect \| null` | 全部 |
| `imgtap` | 点击富文本中的图片时触发 | `UniRichTextItemClickEventDetail` | Android、iOS、鸿蒙、H5 |
| `linktap` | 点击富文本中的链接时触发 | `UniRichTextItemClickEventDetail` | Android、iOS、鸿蒙、H5 |
| `click` | 点击富文本区域时触发 | - | 全部 |

## 参考

- [uni-app x rich-text 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/rich-text.html)
