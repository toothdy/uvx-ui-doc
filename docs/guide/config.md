# 配置

uvx-ui 从入口导出响应式配置、字号设置和国际化能力。请在 `app.use(uvxui)` 完成后使用这些 API。

## 全局配置

```uts
import { config } from "@/uni_modules/uvx-ui";

config.fontSize = 1.1;
config.zIndex = 700;
```

| 配置项 | 类型 | 默认值 | 说明 |
| :---: | :---: | :---: | --- |
| `fontSize` | `number` | `1` | 已接入字号缩放能力的组件所使用的倍率 |
| `zIndex` | `number` | `600` | Overlay、Popup、Toast 等采用全局默认值的组件所使用的基础层级 |

组件显式传入自己的 `z-index` 属性时，以组件属性为准。少数组件有独立层级规则，因此修改 `config.zIndex` 不等于强制改写所有组件的层级。

## 字号缩放

推荐通过 `setFontSize` 修改倍率。该方法会同步写入本地存储，下次启动时由入口自动恢复：

```uts
import { setFontSize } from "@/uni_modules/uvx-ui";

setFontSize(1.2);
```

直接设置 `config.fontSize` 只修改当前运行时状态，不会持久化。

字号缩放只影响内部调用 `toScale` 的组件和数值型字号属性，不会等比例缩放页面布局、图片或业务自定义样式。具体是否支持以对应组件文档为准。

## 国际化

入口默认注册 `zh-cn`、`zh-tw` 和 `en`，并以 `zh-cn` 作为无缓存时的默认语言。用户之前选择的语言会保存在本地。

### 切换语言

```uts
import { locale, setLocale } from "@/uni_modules/uvx-ui";

const switchToEnglish = (): void => {
   setLocale("en");
   console.log(locale.value);
};
```

建议只切换到已注册的语言标识。当前内置标识如下：

| 语言 | 标识 |
| --- | --- |
| 简体中文 | `zh-cn` |
| 繁体中文 | `zh-tw` |
| English | `en` |

### 覆盖或追加词条

项目根目录的业务语言包会在内置语言包之后注册，同名词条以业务侧为准：

```json
[
   ["确认", "立即提交"],
   ["欢迎使用", "欢迎使用 uvx-ui"]
]
```

运行时也可以追加词条：

```uts
import { appendLocale } from "@/uni_modules/uvx-ui";

const messages: string[][] = [
   ["欢迎使用", "Welcome to uvx-ui"],
];

appendLocale("en", messages);
```

### 读取译文

`t` 在当前语言中查找词条；未找到时返回传入的原文：

```uts
import { t } from "@/uni_modules/uvx-ui";

const buttonText: string = t("确认");
```

## 全局工具对象

安装入口会把 `$uvx` 挂载到应用全局属性，组件模板和脚本可以使用其中的格式化、校验、颜色、路由等工具。请勿在业务项目中覆盖 `$uvx`。

主题相关配置见[主题与样式](/guide/theme)。
