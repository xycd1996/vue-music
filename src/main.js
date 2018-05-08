import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload';
import store from './store'

import '@/common/stylus/index.styl'

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  // preLoad: 1,// 预加高度比例
  // error: require('./common/image/default.png'),// 失败加载图片
  loading: require('./common/image/default.png'),// 加载图像
  // attempt: 1// 尝试加载次数
})

fastClick.attach(document.body)
// 推荐用法，使body下的按钮点击无300ms延迟

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
