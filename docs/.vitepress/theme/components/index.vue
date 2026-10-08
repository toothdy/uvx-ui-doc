<template>
   <div>
      <!-- 页面主体 -->
      <div class="main-content container">
         <!-- 顶部 Banner -->
         <div class="banner">
            <div class="desc">
               <h1>
                  多平台快速开发UI框架
               </h1>
               <h2 class="desc-text">
                  基于 uni-app x 原生渲染，无虚拟 DOM，一套代码同时运行于 Android、iOS、鸿蒙、H5 与微信小程序，组件丰富，开箱即用。
               </h2>
               <div class="banner-img">
                  <img
                     alt="uvx-ui"
                     src="https://www.uvui.cn/index/banner_1920x1080.png"
                     style="max-width: 90%;margin: 0 auto;"
                  />
               </div>
            </div>
         </div>

         <!-- 四大利器 -->
         <div class="card-box components">
            <p class="card-title">四大利器，为您保驾护航</p>
            <ul class="row">
               <li class="col-md-3 col-sm-12">
                  <div class="card-item">
                     <img src="/index/guide.png" />
                     <h3>
                        指南
                     </h3>
                     <p>
                        涵盖 uni-app x 开发方方面面，给您方向指导和设计理念，让您茅塞顿开，一马平川
                     </p>
                  </div>
               </li>
               <li class="col-md-3 col-sm-12">
                  <div class="card-item">
                     <img src="/index/components.png" />
                     <h3>
                        组件
                     </h3>
                     <p>
                        组件覆盖开发过程的各类需求，原生渲染、多端兼容，让您快速集成，开箱即用
                     </p>
                  </div>
               </li>
               <li class="col-md-3 col-sm-12">
                  <div class="card-item">
                     <img src="/index/js.png" />
                     <h3>
                        工具库
                     </h3>
                     <p>
                        众多的贴心小工具，是您开发过程中召之即来的利器，让您飞镖在手，百步穿杨
                     </p>
                  </div>
               </li>
               <li class="col-md-3 col-sm-12">
                  <div class="card-item">
                     <img src="/index/layout.png" />
                     <h3>
                        布局
                     </h3>
                     <p>
                        收集众多的常用页面和布局，减少开发者的重复工作，让您专注逻辑，事半功倍
                     </p>
                  </div>
               </li>
            </ul>
         </div>

         <!-- 多端发布平台 -->
         <div class="card-box support">
            <p class="card-title">一次编写，多端发布</p>
            <ul class="row">
               <li class="col-md-3 col-sm-6 col-xs-6">
                  <div class="card-item">
                     <img src="/index/android.png" />
                     <h3>
                        安卓
                     </h3>
                     <span class="alias">Android</span>
                  </div>
               </li>
               <li class="col-md-3 col-sm-6 col-xs-6">
                  <div class="card-item">
                     <img src="/index/ios.png" />
                     <h3>
                        Apple
                     </h3>
                     <span class="alias">IOS</span>
                  </div>
               </li>
               <li class="col-md-3 col-sm-6 col-xs-6">
                  <div class="card-item">
                     <img src="/index/weixin.png" />
                     <h3>
                        微信小程序
                     </h3>
                     <span class="alias">Mini Program</span>
                  </div>
               </li>
               <li class="col-md-3 col-sm-6 col-xs-6">
                  <div class="card-item">
                     <img src="/index/h5.png" />
                     <h3>
                        H5
                     </h3>
                     <span class="alias">Mobile Web</span>
                  </div>
               </li>
            </ul>
         </div>

         <!-- 友情链接 -->
         <div class="card-box friend-link">
            <p class="card-title">友情链接</p>
            <div class="row friend-link">
               <!-- <div class="col-md-2 col-sm-2 col-xs-4 friend-link__wrap">
                  <a
                     target="_blank"
                     class="friend-link__wrap__item"
                     href="https://www.uviewui.com/"
                     title="uView UI，是uni-app生态最优秀的UI框架，全面的组件和便捷的工具会让您信手拈来，如鱼得水"
                  >
                     <img src="https://mp-31ed6237-7b7b-4597-8448-a53d6d6031cf.cdn.bspapp.com/uvuidoc/imgs/uview.png" />
                  </a>
               </div>
               <div class="col-md-2 col-sm-2 col-xs-4 friend-link__wrap">
                  <a
                     target="_blank"
                     class="friend-link__wrap__item"
                     href="https://uqrcode.cn/doc"
                     title="uQRCode是一款基于Javascript环境开发的二维码生成插件，适用所有Javascript运行环境的前端应用和Node.js"
                  >
                     <img src="https://mp-31ed6237-7b7b-4597-8448-a53d6d6031cf.cdn.bspapp.com/uvuidoc/imgs/uqrcode.png" />
                  </a>
               </div>
               <div class="col-md-2 col-sm-2 col-xs-4 friend-link__wrap">
                  <a
                     target="_blank"
                     class="friend-link__wrap__item"
                     href="https://www.quanzhan.co/luch-request/"
                     title="基于Promise开发的uni-app跨平台请求库"
                  >
                     <img src="https://mp-31ed6237-7b7b-4597-8448-a53d6d6031cf.cdn.bspapp.com/uvuidoc/imgs/luch-request.jpg" />
                  </a>
               </div> -->
            </div>
         </div>
      </div>

      <!-- 页脚版权 -->
      <div class="foot">
         Copyright {{ year }} uvx-ui | <a target="_blank" href="http://beian.miit.gov.cn">桂ICP备2025076625号-1</a>
      </div>
   </div>
</template>

<script lang="ts" setup>
// 版权年份
const year = new Date().getFullYear();
</script>

<style lang="scss" scoped>
// 首页字体(全局字体栈已移除,文档页用默认主题字体)
.main-content,
.foot {
   font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
}

// 列表基础样式
ul,
ol {
   padding-left: 0;
}

li {
   list-style: none;
}

// ===== 栅格(Bootstrap 3 数值,仅保留首页用到的类) =====
// 栅格容器
.container {
   padding-right: 15px;
   padding-left: 15px;
   margin-right: auto;
   margin-left: auto;
}

// 行:负外边距 + 清除浮动
.row {
   margin-right: -15px;
   margin-left: -15px;

   &::before,
   &::after {
      display: table;
      content: " ";
   }

   &::after {
      clear: both;
   }
}

// 列基础
.col-xs-4,
.col-xs-6,
.col-sm-2,
.col-sm-6,
.col-sm-12,
.col-md-2,
.col-md-3 {
   position: relative;
   min-height: 1px;
   padding-right: 15px;
   padding-left: 15px;
   float: left;
}

// xs 排列(默认)
.col-xs-4 {
   width: 33.33333333%;
}

.col-xs-6 {
   width: 50%;
}

// sm 排列(平板)
@media (min-width: 768px) {
   .container {
      width: 750px;
   }

   .col-sm-12 {
      width: 100%;
   }

   .col-sm-6 {
      width: 50%;
   }

   .col-sm-2 {
      width: 16.66666667%;
   }
}

// md 排列(桌面)
@media (min-width: 992px) {
   .container {
      width: 970px;
   }

   .col-md-3 {
      width: 25%;
   }

   .col-md-2 {
      width: 16.66666667%;
   }
}

// 大屏容器宽度
@media (min-width: 1200px) {
   .container {
      width: 1170px;
   }
}

// ===== Banner 区块 =====
.banner {
   text-align: center;
   margin-top: 4rem;

   .desc {
      h1 {
         font-weight: 700;
         color: var(--vp-c-text-1);
         font-size: 2rem;
         // VitePress reset 清零了标题 margin,补回旧版浏览器默认间距
         margin-bottom: 0.67em;
      }

      .desc-text {
         color: var(--vp-c-text-2);
         font-size: 1.1rem;
         border: none;
         line-height: 1.7;
         // 描述与下方大图的间距(旧版来自浏览器默认 margin)
         margin-bottom: 0.83em;
      }
   }
}

// ===== 卡片区块(四大利器 / 多端发布 / 友情链接) =====
.card-box {
   text-align: center;
   margin-top: 3.5em;

   // 卡片条目
   .card-item {
      margin-bottom: 30px;
   }

   // 区块标题
   .card-title {
      color: var(--vp-c-text-1);
      font-size: 24px;
      margin-bottom: 50px;
   }

   // 卡片列内边距
   li {
      padding: 0 20px;
      box-sizing: border-box;
   }

   // 卡片配图(仅四大利器与多端发布,友情链接图片尺寸独立)
   &.components,
   &.support {
      img {
         width: 160px;
         margin: 40px auto 20px;
      }
   }

   h3 {
      color: var(--vp-c-text-2);
      font-size: 18px;
   }

   p {
      font-size: 14px;
      color: var(--vp-c-text-3);
      padding: 0 25px;
      margin-bottom: 40px;
   }
}

// 四大利器:边框 + hover 上浮阴影
.card-box.components {
   div {
      border: 1px solid var(--vp-c-divider);
      border-radius: 5px;
      transition: bottom 0.4s;
      position: relative;
      bottom: 0;
   }

   div:hover {
      bottom: 6px;
      box-shadow: 0 6px 18px 0 rgba(232, 237, 250, 0.5);
   }

   // 暗色下浅色阴影不可见,改用深色阴影
   .dark & div:hover {
      box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.3);
   }
}

// 多端发布:小尺寸配图 + hover 放大
.card-box.support {
   img {
      width: 100px;
      transform: scale(1);
      transition: all 0.4s;
      margin-bottom: 0;
   }

   h3 {
      margin-bottom: 5px;
   }

   .card-item span {
      font-size: 14px;
      color: var(--vp-c-text-3);
   }

   img:hover {
      transform: scale(1.2);
   }
}

// ===== 友情链接 =====
.friend-link {
   &__wrap {
      margin-top: 8px;

      &__item {
         border-radius: 5px;
         overflow: hidden;
         display: inline-block;
      }
   }
}

// ===== 页脚版权 =====
.foot {
   padding: 30px 0;
   color: var(--vp-c-text-2);
   text-align: center;
   font-size: 14px;

   a {
      color: var(--vp-c-text-2);
   }
}

// 中小屏适配
@media (max-width: 992px) {
   .banner {
      margin-top: 2rem;
   }

   .banner .desc h1 {
      font-size: 24px;
   }

   .banner .desc-text {
      font-size: 15px;
   }

   .card-box .card-title {
      font-size: 20px;
      margin-bottom: 25px;
   }
}
</style>
