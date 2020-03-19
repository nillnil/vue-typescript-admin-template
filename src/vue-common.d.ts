import Vue from 'vue'

// @/utils/vue-common.ts
declare module 'vue/types/vue' {
  interface Vue {
    // 设置跨域的地址
    $baseApi: string,
    /**
     * @param backPosition 返回到顶部的距离，默认0
     * @param speed 速度，默认16.7，越大越慢，太大会卡顿
     */
    $backToTop: Function
  }
}
