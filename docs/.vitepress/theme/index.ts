import ElementPlus from "element-plus";
import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import Changelog from "@/.vitepress/theme/components/changelog.vue";
import H5Demo from "@/.vitepress/theme/components/h5-demo.vue";
import Index from "@/.vitepress/theme/components/index.vue";
import IconList from "@/.vitepress/theme/components/icon-list.vue";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "./custom.scss";

const theme: Theme = {
   extends: DefaultTheme,
   enhanceApp({ app }) {
      app.use(ElementPlus);
      app.component("Changelog", Changelog);
      app.component("H5Demo", H5Demo);
      app.component("Index", Index);
      app.component("IconList", IconList);
   },
};

export default theme;
