// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueTimeago from 'vue-timeago'
import { Form, Select, Switch, Button, Option, Input, FormItem } from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '@/assets/css/index.scss'

Vue.config.productionTip = false;

Vue.use(VueResource);

Vue.use(VueTimeago, {
  name: 'TimeAgo', // component name, `timeago` by default
  locale: 'zh-CN',
  locales: {
    // you will need json-loader in webpack 1
    'zh-CN': require('vue-timeago/locales/zh-CN.json')
  }
});

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Switch);
Vue.use(Button);
Vue.use(Option);
Vue.use(Input);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
