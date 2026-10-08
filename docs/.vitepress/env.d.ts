// 声明 Vue 单文件组件模块,供 TS 识别 .vue 文件引入
declare module "*.vue" {
   import type { DefineComponent } from "vue";

   const component: DefineComponent;
   export default component;
}
