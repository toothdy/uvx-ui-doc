<h5-demo src="pages/form/form/form" title="Form 表单" />

# Form 表单

`uvx-form` 配合 `uvx-form-item` 管理字段布局、同步规则校验、错误展示、指定字段校验和初始值重置。组件直接校验绑定的业务模型，不依赖原生 `form` 的提交机制。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 3.9+ | 4.11+ | 4.61+ | 4.0+ | 4.41+ |

表单父子通信依赖 `provide/inject`，版本按官方组合式 API 的最低支持版本标注；小程序端仅支持微信。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 标签布局、嵌套字段、同步规则校验 | √ | √ | √ | √ | √ |
| `message`、`border-bottom`、`toast`、`none` 错误模式 | √ | √ | √ | √ | √ |
| `validate`、`validateField`、`resetFields`、`clearValidate` | √ | √ | √ | √ | √ |
| 同步自定义 `validator` | √ | √ | √ | √ | √，建议使用 `setRules` |
| 异步校验、递归 `fields/defaultField`、`transform` | × | × | × | × | × |
| 原生 `form` 的 `submit`、`reset` 事件 | × | × | × | × | × |

::: warning 使用须知

1. `uvx-form-item` 必须放在 `uvx-form` 内使用；`prop` 是模型字段路径，调用校验或重置方法时必须设置。
2. 嵌套字段使用点分路径，例如 `prop="userInfo.name"`。规则对象使用同名的字面键：`"userInfo.name"`。
3. `validate()` 和 `validateField()` 校验通过时兑现 `true`，失败时拒绝并返回 `FieldError[]`；调用方应使用 `try/catch` 处理失败结果。
4. 微信小程序使用包含函数的规则时，建议在 `onReady` 中调用 `setRules(rules)`，避免函数通过 Props 传递时丢失。
5. `resetFields()` 只重置已注册且设置了 `prop` 的字段，目标值来自组件首次接收 `model` 时保存的快照；未注册字段保持不变。
6. `error-type="toast"` 只在调用 `validate()` 失败时显示首条错误；`validateField()` 只更新字段状态。`none` 不渲染错误，但仍返回错误数组。
7. 当前校验器仅支持同步规则。`asyncValidator`、返回 Promise 的 `validator`、递归 `fields/defaultField` 和 `transform` 不生效。

:::

## 基础用法

通过 `model` 绑定业务数据，`rules` 按 `prop` 配置规则。`uvx-form-item` 的默认插槽可放置输入框、选择器或其他业务组件。

```vue
<template>
   <uvx-form
      ref="uForm"
      :model="model"
      :rules="rules"
      :label-width="80"
   >
      <uvx-form-item label="姓名" prop="name" required>
         <uvx-input
            v-model="model.name"
            border="none"
            placeholder="请输入姓名"
         ></uvx-input>
      </uvx-form-item>
   </uvx-form>
</template>

<script lang="uts" setup>
type FormModel = {
   name: string;
};

// 表单实例
const uForm = ref<UvxFormComponentPublicInstance | null>(null);
// 表单数据
const model = reactive<FormModel>({ name: "" });
// 字段校验规则
const rules: UTSJSONObject = {
   name: {
      type: "string",
      required: true,
      message: "请填写姓名",
   },
};
</script>
```

## 嵌套字段

`prop` 和规则键均使用完整点分路径。模型保持正常的强类型嵌套对象。

```vue
<template>
   <uvx-form :model="model" :rules="rules">
      <uvx-form-item label="姓名" prop="userInfo.name">
         <uvx-input v-model="model.userInfo.name" border="none"></uvx-input>
      </uvx-form-item>
   </uvx-form>
</template>

<script lang="uts" setup>
type UserInfo = {
   name: string;
};

type FormModel = {
   userInfo: UserInfo;
};

const model = reactive<FormModel>({
   userInfo: { name: "" },
});
const rules: UTSJSONObject = {
   "userInfo.name": {
      required: true,
      message: "请填写姓名",
   },
};
</script>
```

## 规则触发方式

`trigger` 支持 `blur`、`change` 或二者组成的数组。组件不会猜测插槽内控件的事件，需要在对应事件中显式调用 `validateField()`。

```vue
<template>
   <uvx-form ref="uForm" :model="model" :rules="rules">
      <uvx-form-item label="验证码" prop="code">
         <uvx-input
            v-model="model.code"
            border="none"
            @blur="handleCodeBlur"
         ></uvx-input>
      </uvx-form-item>
   </uvx-form>
</template>

<script lang="uts" setup>
type FormModel = {
   code: string;
};

// 表单实例
const uForm = ref<UvxFormComponentPublicInstance | null>(null);
// 表单数据
const model = reactive<FormModel>({ code: "" });
// 字段校验规则
const rules: UTSJSONObject = {
   code: {
      len: 4,
      required: true,
      message: "请填写4位验证码",
      trigger: "blur",
   },
};

/**
 * 失焦时校验验证码
 * @param value 当前验证码
 * @returns Promise<void>
 */
const handleCodeBlur = async (value: string): Promise<void> => {
   model.code = value;
   if (uForm.value == null) return;
   try {
      await uForm.value.validateField("code", "blur");
   } catch (_error) {
      // 错误已由表单项展示。
   }
};
</script>
```

## 自定义同步校验

`validator` 接收规则对象和字段值，返回 `true` 表示通过，返回 `false` 使用规则的 `message`，返回非空字符串则直接作为错误消息。包含函数的规则在微信小程序中应通过 `setRules()` 设置。

```vue
<script lang="uts" setup>
import type {
   FieldValue,
   ValidateResult,
   Validator,
} from "@/uni_modules/uvx-ui/components/uvx-form/types/index.uts";

// 表单实例
const uForm = ref<UvxFormComponentPublicInstance | null>(null);

/**
 * 校验姓名是否全部为中文
 * @param rule 当前规则
 * @param value 字段值
 * @returns ValidateResult
 */
const validateChinese: Validator = (
   rule: UTSJSONObject,
   value: FieldValue,
): ValidateResult => {
   const type = rule["type"];
   if (typeof type == "string" && (type as string) != "string") return false;
   if (typeof value != "string") return false;
   return /^[\u4e00-\u9fa5]+$/.test(value as string);
};

const rules: UTSJSONObject = {
   name: {
      type: "string",
      validator: validateChinese,
      message: "姓名必须为中文",
   },
};

onReady((): void => {
   uForm.value?.setRules(rules);
});
</script>
```

## 错误展示

`error-type` 支持四种模式：`message` 在字段下方显示错误文字，`border-bottom` 将下边框切换为错误色，`toast` 在整表校验失败时显示首条错误，`none` 只返回错误数组。

```vue
<template>
   <uvx-form
      :model="model"
      :rules="rules"
      error-type="border-bottom"
   >
      <uvx-form-item label="姓名" prop="name">
         <uvx-input v-model="model.name" border="none"></uvx-input>
      </uvx-form-item>
   </uvx-form>
</template>

<script lang="uts" setup>
type FormModel = {
   name: string;
};

const model = reactive<FormModel>({ name: "" });
// 字段校验规则
const rules: UTSJSONObject = {
   name: {
      required: true,
      message: "请填写姓名",
   },
};
</script>
```

## 提交、重置与清除

调用 `validate()` 校验全部已注册字段；`resetFields()` 恢复初始快照并清除错误；`clearValidate()` 只清除错误，不修改模型。

```vue
<script lang="uts" setup>
// 表单实例
const uForm = ref<UvxFormComponentPublicInstance | null>(null);

/**
 * 提交表单
 * @returns Promise<void>
 */
const handleSubmit = async (): Promise<void> => {
   if (uForm.value == null) return;
   try {
      await uForm.value.validate();
      console.log("校验通过");
   } catch (_error) {
      console.log("校验失败");
   }
};

/**
 * 重置表单
 * @returns null
 */
const handleReset = (): void => {
   uForm.value?.resetFields();
};

/**
 * 清除姓名错误
 * @returns null
 */
const handleClearName = (): void => {
   uForm.value?.clearValidate("name");
};
</script>
```

## API

### Form Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `model` | 待验证的数据对象 | `any` | `{}` | 全部 |
| `rules` | 字段规则集合，键与表单项 `prop` 一致 | `UTSJSONObject` | `{}` | 全部 |
| `error-type` | 错误展示方式 | `message \| border-bottom \| toast \| none` | `message` | 全部 |
| `border-bottom` | 表单项默认是否显示下边框 | `boolean` | `true` | 全部 |
| `label-position` | 标签位置 | `left \| top` | `left` | 全部 |
| `label-width` | 标签宽度，数字自动补 `px` | `string \| number` | `45` | 全部 |
| `label-align` | 标签文字对齐方式 | `left \| center \| right` | `left` | 全部 |
| `label-style` | 标签文字自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-style` | 表单根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到表单根节点的外部样式类 | `string` | `""` | 全部 |

### FormItem Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `label` | 标签文字 | `string` | `""` | 全部 |
| `prop` | 模型字段路径；校验和重置时必填 | `string` | `""` | 全部 |
| `border-bottom` | 是否显示下边框；自身或父表单任一为 `true` 即显示 | `boolean` | `false` | 全部 |
| `label-position` | 标签位置，空值继承父表单 | `left \| top \| ""` | `""` | 全部 |
| `label-width` | 标签宽度，空值继承父表单 | `string \| number` | `""` | 全部 |
| `right-icon` | 右侧图标名称，取值见 `uvx-icon` | `string` | `""` | 全部 |
| `left-icon` | 左侧图标名称，取值见 `uvx-icon` | `string` | `""` | 全部 |
| `required` | 是否显示必填星号，仅影响展示 | `boolean` | `false` | 全部 |
| `left-icon-style` | 左侧图标样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-style` | 表单项根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到表单项根节点的外部样式类 | `string` | `""` | 全部 |

### Rule

规则可以是单个 `UTSJSONObject` 或规则数组。同一字段的规则按声明顺序执行，表单项显示首条错误，Promise 拒绝结果保留全部错误。

| 属性 | 说明 | 类型 | 默认值 |
| :---: | :---: | :---: | :---: |
| `required` | 是否必填；`null`、空字符串、空数组视为空 | `boolean` | `false` |
| `type` | 字段类型 | `string \| number \| boolean \| array \| object \| date \| email \| url \| integer \| float \| regexp \| method \| hex` | `""` |
| `len` | 字符串/数组长度或数字值必须等于该值 | `number` | - |
| `min` | 字符串/数组最小长度或数字最小值 | `number` | - |
| `max` | 字符串/数组最大长度或数字最大值 | `number` | - |
| `pattern` | 正则表达式或正则字符串 | `RegExp \| string` | - |
| `enum` | 允许值列表，比较时同时匹配类型和值 | `any[]` | - |
| `whitespace` | 是否拒绝纯空白字符串；独立于 `required`，开启后空字符串同样校验失败 | `boolean` | `false` |
| `trigger` | 生效的触发方式；不传时所有调用均执行 | `blur \| change \| (blur \| change)[]` | - |
| `validator` | 同步自定义校验函数 | `Validator` | - |
| `message` | 规则失败时的错误文字；空缺时使用国际化“校验失败” | `string` | `校验失败` |

### Methods

| 方法 | 说明 | 参数 | 返回值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `validate()` | 校验全部已注册字段 | - | `Promise<boolean>`，失败拒绝 `FieldError[]` | 全部 |
| `validateField(fields, trigger?)` | 校验一个或多个字段，可按触发方式过滤规则 | `string \| string[]`、`blur \| change \| null` | `Promise<boolean>`，失败拒绝 `FieldError[]` | 全部 |
| `resetFields()` | 恢复已注册字段初始值并清除错误 | - | `void` | 全部 |
| `clearValidate(fields?)` | 清除全部或指定字段错误 | `string \| string[] \| null` | `void` | 全部 |
| `setRules(rules)` | 设置实例规则，设置后优先于 `rules` 属性 | `UTSJSONObject` | `void` | 全部 |

### Events

`uvx-form` 不触发事件；校验结果通过公开方法的 Promise 返回。

| 组件 | 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `uvx-form-item` | `click` | 点击表单项主体时触发 | - | 全部 |

### Slots

| 组件 | 名称 | 说明 | 平台 |
| :---: | :---: | :---: | :---: |
| `uvx-form` | `default` | 放置一个或多个 `uvx-form-item` | 全部 |
| `uvx-form-item` | `default` | 字段主体内容 | 全部 |
| `uvx-form-item` | `label` | 自定义标签区域，替换默认标签 | 全部 |
| `uvx-form-item` | `right` | 字段右侧内容 | 全部 |
| `uvx-form-item` | `error` | 自定义错误区域，替换默认错误文字 | 全部 |

## 参考

- [uni-app x form 官方文档](https://doc.dcloud.net.cn/uni-app-x/component/form.html)
- [uni-app x 组合式 API 官方文档](https://doc.dcloud.net.cn/uni-app-x/vue/composition-api.html)
- [uni-app x 组件通信与实例方法官方文档](https://doc.dcloud.net.cn/uni-app-x/vue/component.html)
- [UTSJSONObject 官方文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/utsjsonobject.html)
