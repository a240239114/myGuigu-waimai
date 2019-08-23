import Vue from 'vue';
import App from './App.vue';

//导入路由插件
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//导入MUI
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import router from './router';




//导入Store
import store from './store'







new Vue({
  el:"#app",
  render:c=>c(App),
  router,
  store
})