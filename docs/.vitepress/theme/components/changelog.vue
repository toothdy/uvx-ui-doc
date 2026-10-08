<template>
   <!-- 更新日志内容 -->
   <div class="release-timeline">
      <slot />
   </div>
</template>

<style lang="scss" scoped>
// 更新日志时间线
.release-timeline {
   position: relative;
   padding: 18px 0 12px 30px;

   // 时间线
   &::before {
      position: absolute;
      top: 28px;
      bottom: 20px;
      left: 10px;
      width: 2px;
      background: var(--vp-c-divider);
      content: "";
   }

   // 日期
   :deep(h2) {
      position: relative;
      margin: 0 0 8px !important;
      padding: 0;
      border: 0;
      color: var(--vp-c-text-3);
      font-family: var(--vp-font-family-mono);
      font-size: 13px;
      font-weight: 400;
      letter-spacing: 0;
      line-height: 22px;

      // 时间线节点
      &::before {
         position: absolute;
         top: 6px;
         left: -24px;
         z-index: 1;
         width: 10px;
         height: 10px;
         border: 2px solid var(--vp-c-brand-1);
         border-radius: 50%;
         background: var(--vp-c-bg);
         content: "";
      }

      // 后续记录间距
      &:not(:first-child) {
         margin-top: 28px !important;
      }
   }

   // 记录标题
   :deep(h3) {
      margin: 0 0 12px;
      color: var(--vp-c-text-1);
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 0;
      line-height: 26px;
   }

   // 更新列表
   :deep(ul) {
      margin: 0;
      padding-left: 0;
      list-style: none;
   }

   // 更新内容
   :deep(li) {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      margin: 8px 0;
      color: var(--vp-c-text-2);
      font-size: 14px;
      line-height: 22px;
      list-style: none;
   }

   // 更新类型标签
   :deep(strong[data-type]) {
      display: inline-flex;
      flex: 0 0 auto;
      align-items: center;
      height: 20px;
      margin-top: 1px;
      padding: 0 8px;
      border: 1px solid currentColor;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      line-height: 18px;
   }

   // 新增标签
   :deep(strong[data-type="feat"]) {
      background: var(--vp-c-success-soft);
      color: var(--vp-c-success-1);
   }

   // 优化标签
   :deep(strong[data-type="perf"]) {
      background: var(--vp-c-brand-soft);
      color: var(--vp-c-brand-1);
   }

   // 修复标签
   :deep(strong[data-type="fix"]) {
      background: var(--vp-c-danger-soft);
      color: var(--vp-c-danger-1);
   }

   // 隐藏标题锚点
   :deep(.header-anchor) {
      display: none;
   }
}

// 移动端内容间距
@media (max-width: 640px) {
   .release-timeline {
      padding-left: 26px;

      // 时间线位置
      &::before {
         left: 8px;
      }

      // 节点位置
      :deep(h2::before) {
         left: -23px;
      }

      // 更新内容间距
      :deep(li) {
         gap: 6px;
      }
   }
}
</style>
