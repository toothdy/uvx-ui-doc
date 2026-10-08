<template>
   <!-- H5 手机预览 -->
   <section class="h5-preview" :aria-label="title">
      <div class="h5-preview-content">
         <div v-if="isLoading && hasSource" class="h5-preview-loading">
            <span class="h5-preview-spinner"></span>
         </div>
         <iframe
            v-if="hasSource"
            class="h5-preview-iframe"
            :title="title"
            :src="previewSrc"
            scrolling="auto"
            frameborder="0"
            @load="handleLoad"
         />
         <div v-else class="h5-preview-empty">
            示例部署后，将在这里展示真实的运行效果
         </div>
      </div>
   </section>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

type H5PreviewProps = {
   src?: string;
   title?: string;
};

const H5_BASE_URL = "https://h5.uvxui.cn/";

const props = withDefaults(defineProps<H5PreviewProps>(), {
   src: H5_BASE_URL,
   title: "uvx-ui H5 示例",
});

// iframe 是否正在加载
const isLoading = ref(true);

/**
 * H5 示例完整地址
 * @returns string
 */
const previewSrc = computed((): string => {
   const source = props.src.trim();
   return source.length > 0 ? new URL(source, H5_BASE_URL).toString() : "";
});

/**
 * 是否配置了 H5 示例地址
 * @returns boolean
 */
const hasSource = computed((): boolean => previewSrc.value.length > 0);

/**
 * 结束 H5 示例加载状态
 * @returns null
 */
const handleLoad = (): void => {
   isLoading.value = false;
};
</script>

<style lang="scss" scoped>
// 以 375px 移动端视口排版，再缩放至 304px 手机内容区
.h5-preview-iframe {
   width: 123.36%;
   height: 123.36%;
   transform: scale(0.8107);
   transform-origin: left top;
}

// 加载指示环，颜色跟随容器文字色
.h5-preview-spinner {
   width: 28px;
   height: 28px;
   border: 3px solid rgba(94, 109, 130, 0.25);
   border-top-color: currentColor;
   border-radius: 50%;
   animation: h5-preview-spin 0.8s linear infinite;
}

@keyframes h5-preview-spin {
   to {
      transform: rotate(360deg);
   }
}
</style>
