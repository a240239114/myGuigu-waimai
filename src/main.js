import Vue from 'vue';
import App from './App.vue';

//导入路由插件
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import router from './router';




//导入Store
import store from './store'

// Vue.http.options.root = 'http://192.168.31.93:3000';

// Vue.http.options.root = 'http://guigu_zhipinjiekou.gjxbewater.cn:8080';





new Vue({
  el:"#app",
  render:c=>c(App),
  router,
  store
})