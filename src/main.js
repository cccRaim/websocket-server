// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueTimeago from 'vue-timeago'
import '@/assets/css/index.scss'

Vue.config.productionTip = false

Vue.use(VueTimeago, {
  name: 'TimeAgo', // component name, `timeago` by default
  locale: 'zh-CN',
  locales: {
    // you will need json-loader in webpack 1
    'zh-CN': require('vue-timeago/locales/zh-CN.json')
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
