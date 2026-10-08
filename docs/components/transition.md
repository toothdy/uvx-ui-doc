<h5-demo src="pages/basic/transition/transition" title="Transition 动画" />

# Transition 动画

`uvx-transition` 提供进/出场过渡动画：内置 fade、slide、zoom 七种动画模式，由 JS 动画引擎逐帧驱动，并支持通过 `init`/`step`/`run` 组合命令式自定义动画，内容通过默认插槽传入。

## 平台兼容性

| Android | iOS | 鸿蒙 | H5 | 微信 |
| :-: | :-: | :-: | :-: | :-: |
| 4.51+ | 4.51+ | 4.61+ | 4.0+ | 4.41+ |

`uvx-transition` 不基于单一原生组件，由 JS 动画引擎持有组件根节点的 `UniElement` 引用，逐帧通过 `UniElement.style.setProperty` 写入样式，版本以 `CSSStyleDeclaration.setProperty`（string 参数重载）各端起始支持版本为准。

### 平台能力

| 能力 | Android | iOS | 鸿蒙 | H5 | 微信 |
| :---: | :-: | :-: | :-: | :-: | :-: |
| 预设动画模式（fade / slide / zoom） | √ | √ | √ | √ | √ |
| `show` 显隐控制与进/出场动画 | √ | √ | √ | √ | √ |
| `click`、`change` 事件 | √ | √ | √ | √ | √ |
| 命令式自定义动画（`init` / `step` / `run`） | √ | √ | √ | √ | √ |
| `open`、`close` 手动触发 | √ | √ | √ | √ | √ |
| `u-style`、`u-class` 自定义样式 | √ | √ | √ | √ | √ |
| 出场结束后的节点处理 | `v-if` 卸载 | `v-if` 卸载 | `v-if` 卸载 | `v-if` 卸载 | 节点常驻 + `display:none` |

::: warning 使用须知

1. 动画模式共 7 种：`fade`、`slide-top`、`slide-bottom`、`slide-left`、`slide-right`、`zoom-in`、`zoom-out`，默认 `fade`。`zoom-in` 由 0.92 放大进场、`zoom-out` 由 1.2 缩小进场，两者均伴随透明度过渡。
2. 通过 `show` 控制显隐：`true` 播放入场、`false` 播出场，出场动画播完后才卸载节点。App/H5 端以 `v-if` 卸载；微信小程序端节点常驻，以内联 `display:none` 隐藏，且每次进场前会重置上次动画残留的样式（fade 进场重置 `transform`，其余模式进场重置 `opacity`），跨模式切换安全。
3. 各端帧驱动方式存在差异：Android 通过 `uvx-animation` uts 插件以 Choreographer 原生帧回调驱动；iOS、鸿蒙、H5 使用 `requestAnimationFrame`；微信小程序端使用 `setTimeout`（约 16ms 一帧，接近 60fps）。
4. 初始 `:show="true"` 时，组件在挂载后自动播放入场动画。
5. `easing` 传入 CSS 缓动名（`linear`、`ease`、`ease-in`、`ease-out`、`ease-in-out`），其余按引擎预设名直接透传（如 `easeInQuad`），无法识别的名称按线性处理。
6. 命令式动画的 `step` 支持 `translate`、`rotate`、`scale`、`skew` 等 `transform` 子属性与 `opacity` 等数值属性，纯数字值自动补单位（`rotate`/`skew` 补 `deg`，`translate` 补 `px`）；`background`、`color` 等颜色属性按 RGBA 插值。

:::

## 基础用法

通过 `show` 控制显隐，`true` 播放入场动画，改为 `false` 播出场动画，默认 `fade` 渐隐渐现。

```vue
<template>
   <uvx-transition mode="fade" :show="show">
      <text>内容</text>
   </uvx-transition>
</template>

<script lang="uts" setup>
const show = ref<boolean>(false);
</script>
```

## 滑动过渡

`slide-top` 由上至下、`slide-bottom` 由下至上、`slide-left` 由左至右、`slide-right` 由右至左四个方向滑入滑出，以 `translateY`/`translateX` 位移实现。

```vue
<template>
   <uvx-transition mode="slide-top" :show="show">
      <text>内容</text>
   </uvx-transition>
</template>
```

## 缩放过渡

`zoom-in` 由小到大、`zoom-out` 由大到小，缩放伴随透明度过渡。

```vue
<template>
   <uvx-transition mode="zoom-in" :show="show">
      <text>内容</text>
   </uvx-transition>
</template>
```

## 自定义时长与缓动

`duration` 设置动画时长（毫秒），`easing` 设置缓动函数，对进/出场动画同时生效。

```vue
<template>
   <uvx-transition
      mode="slide-left"
      :show="show"
      :duration="600"
      easing="ease-in-out"
   >
      <text>内容</text>
   </uvx-transition>
</template>
```

## 点击回调

点击组件触发 `click` 事件，参数为当前 `show` 值；进/出场动画结束时触发 `change` 事件。以下示例点击遮罩后收起：

```vue
<template>
   <uvx-transition mode="fade" :show="show" @click="onOverlayClick"></uvx-transition>
</template>

<script lang="uts" setup>
const show = ref<boolean>(false);

// 点击组件后收起
const onOverlayClick = (): void => {
   show.value = false;
};
</script>
```

## 命令式自定义动画

通过组件实例的 `init`、`step`、`run` 方法组合自定义动画：`init` 配置 step 的默认时长、缓动与延迟，`step` 添加动画步骤，`run` 依次执行队列中的所有 step。

```vue
<template>
   <uvx-transition
      ref="uAni"
      :show="true"
      u-style="width: 40px;height: 40px;background-color: #3c9cff;border-radius: 4px;"
   ></uvx-transition>
</template>

<script lang="uts" setup>
const uAni = ref<UvxTransitionComponentPublicInstance | null>(null);

// 初始化命令式动画基础配置：step 默认时长 300ms、缓动 linear、开始前延迟 500ms
onReady(() => {
   const ins = uAni.value;
   if (ins == null) return;
   ins.init({ duration: 300, timingFunction: 'linear', delay: 500 });
});

// 依次执行两个 step：右移 200px 并旋转 360 度，再以 ease-in 500ms 回到原位
const runCustom = (): void => {
   const ins = uAni.value;
   if (ins == null) return;
   ins.step({ translateX: '200px', rotate: '360deg' }, {});
   ins.step(
      { translateX: '0px', rotate: '0deg' },
      { timingFunction: 'ease-in', duration: 500 }
   );
   ins.run();
};
</script>
```

每个 step 从上一步的终态继续动画；`run` 返回 `Promise`，完成时机可通过 `await` 或 `.then` 获取。

## 手动触发

`open`、`close` 与 `show` 属性解耦，直接通过组件实例触发入场/出场动画：

```vue
<template>
   <uvx-transition ref="uAni" mode="slide-top" :show="false">
      <text>内容</text>
   </uvx-transition>
</template>

<script lang="uts" setup>
const uAni = ref<UvxTransitionComponentPublicInstance | null>(null);

// 不修改 show，直接驱动进/出场
const toggle = (): void => {
   const ins = uAni.value;
   if (ins == null) return;
   ins.open();
   setTimeout(() => {
      const instance = uAni.value;
      if (instance == null) return;
      instance.close();
   }, 1500);
};
</script>
```

## 自定义样式

`u-style` 设置组件根节点样式（CSS 字符串，对象样式可用 `$uvx.style.stringify` 转换），`u-class` 通过外部样式类 `u-class` 追加样式。

```vue
<template>
   <uvx-transition
      mode="fade"
      :show="show"
      u-style="width: 120px;height: 120px;background-color: #3c9cff;border-radius: 8px;"
      u-class="my-anim"
      @click="onOverlayClick"
   ></uvx-transition>
</template>

<script lang="uts" setup>
const show = ref<boolean>(false);

const onOverlayClick = (): void => {
   show.value = false;
};
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 平台 |
| :---: | :---: | :---: | :---: | :---: |
| `show` | 是否显示，`true` 播放入场动画、`false` 播出场动画 | `boolean` | `false` | 全部 |
| `mode` | 动画模式 | `fade \| slide-top \| slide-bottom \| slide-left \| slide-right \| zoom-in \| zoom-out` | `fade` | 全部 |
| `duration` | 动画时长（毫秒） | `number` | `300` | 全部 |
| `easing` | 缓动函数，CSS 名称或引擎预设名 | `string` | `ease-out` | 全部 |
| `u-style` | 组件根节点自定义样式，CSS 字符串 | `string` | `""` | 全部 |
| `u-class` | 追加到组件根节点的外部样式类 | `string` | `""` | 全部 |

### Slots

| 名称 | 说明 | 平台 |
| :---: | :---: | :---: |
| `default` | 动画作用的内容 | 全部 |

### Methods

通过模板 ref 获取组件实例后直接调用，如 `uAni.value.open()`。

| 方法 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `init` | 初始化命令式动画基础配置，并清空已有 step 队列；未配置时 step 默认时长 300ms、缓动 `ease`、延迟 0 | `options`：`{ duration, timingFunction, delay }` | 全部 |
| `step` | 添加动画步骤 | `props`：目标属性，如 `{ translateX: '200px', rotate: '360deg' }`；`config`：本步配置，可覆盖 `{ duration, timingFunction }`，无需覆盖时传 `{}` | 全部 |
| `run` | 依次执行队列中的所有 step，返回 `Promise`，完成时机用 `await` 或 `.then` 获取 | - | 全部 |
| `open` | 手动触发入场动画，与 `show` 属性解耦 | - | 全部 |
| `close` | 手动触发出场动画 | - | 全部 |

### Events

| 事件 | 说明 | 参数 | 平台 |
| :---: | :---: | :---: | :---: |
| `click` | 点击组件时触发 | `detail: boolean`，当前 `show` 值 | 全部 |
| `change` | 进/出场动画结束时触发 | `detail: boolean`，入场结束为 `true`、出场结束为 `false` | 全部 |

## 参考

- [uni-app x UniElement 官方文档](https://doc.dcloud.net.cn/uni-app-x/api/dom/unielement.html)
- [uni-app x CSSStyleDeclaration 官方文档](https://doc.dcloud.net.cn/uni-app-x/api/dom/cssstyledeclaration.html)
