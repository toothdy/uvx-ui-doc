<template>
   <!-- Star 引导弹窗：点击 Star 按钮后，本访客下次访问不再弹 -->
   <el-dialog
      v-model="isVisible"
      width="480"
      align-center
      append-to-body
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :lock-scroll="true"
      class="star-dialog"
   >
      <!-- 标题区：标题 -->
      <template #header="{ titleId }">
         <div class="star-dialog-header">
            <p :id="titleId" class="star-dialog-title">感谢您的 Star</p>
         </div>
      </template>

      <!-- 组件库亮点 -->
      <ul class="star-dialog-features">
         <li>一套代码，同时支持 Android、iOS、鸿蒙、H5 和微信小程序</li>
         <li>70+ 个开箱即用的组件，内置主题定制、暗黑模式、国际化</li>
         <li>永久开源，MIT 协议，无需任何限制</li>
         <li>持续迭代中，欢迎提 Issue / PR 参与共建</li>
      </ul>

      <!-- 点 Star 引导语 -->
      <p class="star-dialog-cta">
         开源不易~ 你的每一个 Star 都能让它被更多开发者看见，也是我持续更新的最大动力
      </p>

      <!-- Star 按钮区：GitHub / Gitee 外链 -->
      <div class="star-dialog-actions">
         <el-button
            class="star-dialog-btn star-dialog-btn--github"
            tag="a"
            href="https://github.com/toothdy/uvx-ui"
            target="_blank"
            rel="noopener noreferrer"
            size="large"
            @click="handleStar"
         >
            <svg class="star-dialog-btn-icon" viewBox="0 0 16 16" aria-hidden="true">
               <path :d="GITHUB_ICON_PATH" fill="currentColor" />
            </svg>
            GitHub
         </el-button>
         <el-button
            class="star-dialog-btn star-dialog-btn--gitee"
            tag="a"
            href="https://gitee.com/toothdy/uvx-ui"
            target="_blank"
            rel="noopener noreferrer"
            size="large"
            @click="handleStar"
         >
            <svg class="star-dialog-btn-icon" viewBox="0 0 1024 1024" aria-hidden="true">
               <path :d="GITEE_ICON_PATH" fill="currentColor" />
            </svg>
            Gitee
         </el-button>
      </div>
   </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { inBrowser, useRoute } from "vitepress";

// GitHub 品牌 SVG 路径
const GITHUB_ICON_PATH =
   "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z";
// Gitee 品牌 SVG 路径
const GITEE_ICON_PATH =
   "M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.267-25.267z";

// localStorage 标记键：存在即表示已点过 Star，本访客不再弹
const STORAGE_KEY = "uvx-star-dialog-shown";

// 弹窗是否可见
const isVisible = ref(false);

/**
 * 点击 Star 按钮：写入标记并关闭弹窗，下次访问不再弹出
 * @returns null
 */
const handleStar = (): void => {
   localStorage.setItem(STORAGE_KEY, "1");
   isVisible.value = false;
};

// 延时弹出定时器 id，路由切换时清理
let popTimer: number | null = null;

// 当前路由
const route = useRoute();

/**
 * 当前是否在组件文档页（弹窗只在 /components/ 下弹出）
 * @param path 路由路径
 * @returns boolean
 */
const isComponentsPage = (path: string): boolean => {
   return path.startsWith("/components/");
};

/**
 * 监听路由：仅在组件文档页延迟弹出 Star 引导弹窗，离开时取消定时器并关闭
 * @returns null
 */
watch(
   () => route.path,
   (path) => {
      // SSG 预渲染阶段无浏览器环境，直接跳过
      if (!inBrowser) return;
      // 路由变化先清掉未触发的定时器
      if (popTimer != null) {
         window.clearTimeout(popTimer);
         popTimer = null;
      }
      // 离开组件文档页：关闭弹窗
      if (!isComponentsPage(path)) {
         isVisible.value = false;
         return;
      }
      // 已点过 Star 的访客不再弹
      if (localStorage.getItem(STORAGE_KEY) != null) return;
      popTimer = window.setTimeout(() => {
         popTimer = null;
         isVisible.value = true;
      }, 100);
   },
   { immediate: true },
);
</script>

<style lang="scss">
// append-to-body 把弹窗传送到 body，scoped 样式够不到 el-dialog 结构，这里用唯一前缀的全局样式覆盖
.star-dialog {
   // 小屏时不超过视口宽度
   max-width: calc(100vw - 32px);
   border-radius: 16px;

   // 头部交给自定义插槽排版，清掉默认内边距
   .el-dialog__header {
      padding: 0;
      margin: 0;
   }

   .el-dialog__body {
      padding: 0 24px 24px;
   }
}

// 标题区：标题
.star-dialog-header {
   padding: 26px 24px 0;

   .star-dialog-title {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      line-height: 1.3;
      text-align: center;
      color: var(--el-text-color-primary);
   }
}

// 组件库亮点清单
.star-dialog-features {
   margin: 18px 0 0;
   padding: 0;
   list-style: none;

   li {
      position: relative;
      margin: 0;
      padding: 4px 0 4px 18px;
      font-size: 13px;
      line-height: 1.7;
      color: var(--el-text-color-regular);
      text-align: left;

      // 金色星形符号，呼应星标主题
      &::before {
         content: "✦";
         position: absolute;
         left: 0;
         color: #f7ba2a;
      }
   }
}

// 点 Star 引导语：金色浅底强调条，比正文更醒目
.star-dialog-cta {
   margin: 14px 0 0;
   padding: 10px 12px;
   font-size: 13px;
   line-height: 1.7;
   color: var(--el-text-color-primary);
   background: rgba(247, 186, 42, 0.12);
   border-radius: 8px;
}

// Star 按钮区
.star-dialog-actions {
   display: flex;
   gap: 12px;
   margin: 18px 0 0;

   .star-dialog-btn {
      flex: 1;
      margin: 0;
      font-weight: 600;

      // 按钮 svg 图标与文字对齐
      .star-dialog-btn-icon {
         width: 16px;
         height: 16px;
         margin-right: 6px;
      }
   }

   // GitHub 品牌色
   .star-dialog-btn--github {
      --el-button-bg-color: #24292f;
      --el-button-hover-bg-color: #3a4149;
      --el-button-hover-border-color: #3a4149;
      --el-button-active-bg-color: #4d565f;
      --el-button-active-border-color: #4d565f;
      --el-button-text-color: #fff;
      --el-button-hover-text-color: #fff;
   }

   // Gitee 品牌色
   .star-dialog-btn--gitee {
      --el-button-bg-color: #c71d23;
      --el-button-hover-bg-color: #e03e44;
      --el-button-hover-border-color: #e03e44;
      --el-button-active-bg-color: #e85a5f;
      --el-button-active-border-color: #e85a5f;
      --el-button-text-color: #fff;
      --el-button-hover-text-color: #fff;
   }
}
</style>
