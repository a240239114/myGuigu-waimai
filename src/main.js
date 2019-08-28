import Vue from 'vue';
import App from './App.vue';

//导入路由插件
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//导入MUI
import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css'


import router from './router';
//自动登录
// import {reqUserInfo} from './api/index'
// reqUserInfo();


//导入JQ
import $ from 'jquery';
window.jquery = window.$ =$;


//懒加载
import VueLazyload from "vue-lazyload"
import loading from "./common/imgs/loading.gif"
Vue.use(VueLazyload,{
  loading
})


//导入filter
import './filters'
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