<template>
   <div class="icon-list">
      <div
         class="icon-item"
         v-for="item in iconItems"
         :key="item.name"
         :title="`点击复制 ${item.name}`"
         @click="copyName(item.name)"
      >
         <span class="icon-glyph">{{ glyph(item.code) }}</span>
         <span class="icon-name">{{ copied === item.name ? "已复制" : item.name }}</span>
      </div>
   </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

// 与组件源码 icons.uts 保持一致的名称到码点映射
const iconMap: Record<string, string> = {
   level: "e68f",
   "checkbox-mark": "e659",
   folder: "e694",
   movie: "e67c",
   "star-fill": "e61e",
   star: "e618",
   "phone-fill": "e6ac",
   phone: "e6ba",
   "apple-fill": "e635",
   backspace: "e64d",
   attach: "e640",
   "empty-data": "e671",
   "empty-address": "e68a",
   "empty-favor": "e662",
   "empty-car": "e657",
   "empty-order": "e66b",
   "empty-list": "e672",
   "empty-search": "e677",
   "empty-permission": "e67d",
   "empty-news": "e67e",
   "empty-history": "e685",
   "empty-coupon": "e69b",
   "empty-page": "e60e",
   "empty-wifi-off": "e6cc",
   reload: "e627",
   order: "e695",
   "server-man": "e601",
   search: "e632",
   "more-dot-fill": "e66f",
   scan: "e631",
   map: "e665",
   "map-fill": "e6a8",
   tags: "e621",
   "tags-fill": "e613",
   eye: "e664",
   "eye-fill": "e697",
   "eye-off": "e69c",
   "eye-off-outline": "e688",
   mic: "e66d",
   "mic-off": "e691",
   calendar: "e65c",
   trash: "e623",
   "trash-fill": "e6ce",
   "play-left": "e6bf",
   "play-right": "e6b3",
   minus: "e614",
   plus: "e625",
   "info-circle": "e69f",
   "info-circle-fill": "e6a7",
   "question-circle": "e622",
   "question-circle-fill": "e6bc",
   close: "e65a",
   checkmark: "e64a",
   "checkmark-circle": "e643",
   "checkmark-circle-fill": "e668",
   setting: "e602",
   "setting-fill": "e6d0",
   heart: "e6a2",
   "heart-fill": "e68b",
   camera: "e642",
   "camera-fill": "e650",
   "more-circle": "e69e",
   "more-circle-fill": "e684",
   chat: "e656",
   "chat-fill": "e63f",
   bag: "e647",
   "error-circle": "e66e",
   "error-circle-fill": "e655",
   "close-circle": "e64e",
   "close-circle-fill": "e666",
   share: "e629",
   "share-fill": "e6bb",
   "share-square": "e6c4",
   "shopping-cart": "e6cb",
   "shopping-cart-fill": "e630",
   bell: "e651",
   "bell-fill": "e604",
   list: "e690",
   "list-dot": "e6a9",
   "zhifubao-circle-fill": "e617",
   "weixin-circle-fill": "e6cd",
   "weixin-fill": "e620",
   "qq-fill": "e608",
   "qq-circle-fill": "e6b9",
   "moments-circel-fill": "e6c2",
   moments: "e6a0",
   car: "e64f",
   "car-fill": "e648",
   "warning-fill": "e6c7",
   warning: "e6c1",
   "clock-fill": "e64b",
   clock: "e66c",
   "edit-pen": "e65d",
   "edit-pen-fill": "e679",
   email: "e673",
   "email-fill": "e683",
   "minus-circle": "e6a5",
   "plus-circle": "e603",
   "plus-circle-fill": "e611",
   "file-text": "e687",
   "file-text-fill": "e67f",
   pushpin: "e6d1",
   "pushpin-fill": "e6b6",
   grid: "e68c",
   "grid-fill": "e698",
   "play-circle": "e6af",
   "play-circle-fill": "e62a",
   "pause-circle-fill": "e60c",
   pause: "e61c",
   "pause-circle": "e696",
   "gift-fill": "e6b0",
   gift: "e680",
   "kefu-ermai": "e660",
   "server-fill": "e610",
   "coupon-fill": "e64c",
   coupon: "e65f",
   integral: "e693",
   "integral-fill": "e6b1",
   "home-fill": "e68e",
   home: "e67b",
   account: "e63a",
   "account-fill": "e653",
   "thumb-down-fill": "e628",
   "thumb-down": "e60a",
   "thumb-up": "e612",
   "thumb-up-fill": "e62c",
   "lock-fill": "e6a6",
   "lock-open": "e68d",
   "lock-opened-fill": "e6a1",
   lock: "e69d",
   "red-packet": "e6c3",
   "photo-fill": "e6b4",
   photo: "e60d",
   "volume-off-fill": "e6c8",
   "volume-off": "e6bd",
   "volume-fill": "e624",
   volume: "e605",
   download: "e670",
   "arrow-up-fill": "e636",
   "arrow-down-fill": "e638",
   "play-left-fill": "e6ae",
   "play-right-fill": "e6ad",
   "arrow-downward": "e634",
   "arrow-leftward": "e63b",
   "arrow-rightward": "e644",
   "arrow-upward": "e641",
   "arrow-down": "e63e",
   "arrow-right": "e63c",
   "arrow-left": "e646",
   "arrow-up": "e633",
   "skip-back-left": "e6c5",
   "skip-forward-right": "e61f",
   man: "e675",
   woman: "e626",
   twitte: "e607",
   "twitter-circle-fill": "e6cf",
};

const iconItems = computed(() =>
   Object.keys(iconMap).map((name) => ({ name, code: iconMap[name] }))
);

// 复制状态：短暂高亮当前复制的图标名
const copied = ref("");

/**
 * 码点转图标字符
 * @param code 十六进制码点字符串
 * @returns 可渲染的字形字符
 */
const glyph = (code: string): string => String.fromCharCode(parseInt(code, 16));

/**
 * 点击复制图标名称
 * @param name 图标名称
 * @returns null
 */
const copyName = (name: string): void => {
   navigator.clipboard?.writeText(name);
   copied.value = name;
   setTimeout(() => {
      copied.value = "";
   }, 1500);
};
</script>

<style scoped>
.icon-list {
   display: grid;
   grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
   border-top: 1px solid var(--vp-c-divider);
   border-left: 1px solid var(--vp-c-divider);
   margin-top: 16px;
}

.icon-item {
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   height: 100px;
   padding: 8px 4px;
   box-sizing: border-box;
   border-right: 1px solid var(--vp-c-divider);
   border-bottom: 1px solid var(--vp-c-divider);
   cursor: pointer;
   transition: background-color 0.2s;
}

.icon-item:hover {
   background-color: var(--vp-c-bg-soft);
}

/* 图标字形，字体与 uvx-icon 组件内置字体一致 */
.icon-glyph {
   font-family: "uvx-icon-iconfont";
   font-size: 28px;
   line-height: 1;
   color: var(--vp-c-text-1);
}

.icon-name {
   margin-top: 10px;
   font-size: 12px;
   color: var(--vp-c-text-2);
   max-width: 100%;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
}
</style>

<style>
/* 组件内置字体，与 uvx-icon 组件的 uvx-icons.ttf 同源 */
@font-face {
   font-family: "uvx-icon-iconfont";
   src: url("/fonts/uvx-icons.ttf") format("truetype");
   font-display: block;
}
</style>
