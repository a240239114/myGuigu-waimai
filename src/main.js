import Vue from 'vue';
import App from './App.vue';

//导入路由插件
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//导入MUI
// import MintUI from 'mint-ui'
import { Button } from 'mint-ui';
// import 'mint-ui/lib/style.css'
Vue.component(Button.name, Button);
// Vue.use(MintUI)


import router from './router';

//自动登录
import {reqUserInfo} from './api/index'
reqUserInfo();


//导入mock
import './mock/mock'


//导入Store
import store from './store'







new Vue({
  el:"#app",
  render:c=>c(App),
  router,
  store
})