import ElementPlus from "element-plus";
import { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from "element-plus";
import DefaultTheme from "vitepress/theme";
import { inBrowser, useRoute } from "vitepress";
import type { Theme } from "vitepress";
import { h, watchEffect } from "vue";
import Changelog from "@/.vitepress/theme/components/changelog.vue";
import H5Demo from "@/.vitepress/theme/components/h5-demo.vue";
import Index from "@/.vitepress/theme/components/index.vue";
import IconList from "@/.vitepress/theme/components/icon-list.vue";
import StarDialog from "@/.vitepress/theme/components/star-dialog.vue";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "./custom.scss";

// 百度统计的上报队列：hm.js 异步加载完成前，指令先缓存在 window._hmt
declare global {
   interface Window {
      _hmt: unknown[][];
   }
}

const theme: Theme = {
   extends: DefaultTheme,
   // 通过 layout-bottom 插槽全站挂载 Star 引导弹窗（弹窗 fixed 定位，不影响页面布局）
   Layout() {
      return h(DefaultTheme.Layout, null, {
         "layout-bottom": () => h(StarDialog),
      });
   },
   // VitePress 是 SPA：hm.js 只在首次整页加载时自动计 1 次 PV，
   // 站内切换页面不会整页刷新，需监听路由变化手动补报
   setup() {
      if (!inBrowser) return;
      const route = useRoute();
      // 首次加载的 PV 由 hm.js 自动上报，这里从第二个页面开始补报
      let reportedPath = route.path;
      watchEffect(() => {
         if (route.path === reportedPath) return;
         reportedPath = route.path;
         window._hmt = window._hmt || [];
         window._hmt.push(["_trackPageview", route.path]);
      });
   },
   enhanceApp({ app }) {
      app.use(ElementPlus);
      // SSG 预渲染时 Element Plus 弹层组件需要 id/z-index 注入，否则报 SSR 告警且水合可能不一致
      app.provide(ID_INJECTION_KEY, { prefix: 1024, current: 0 });
      app.provide(ZINDEX_INJECTION_KEY, { current: 0 });
      app.component("Changelog", Changelog);
      app.component("H5Demo", H5Demo);
      app.component("Index", Index);
      app.component("IconList", IconList);
   },
};

export default theme;
