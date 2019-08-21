import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import router from './router/router';






new Vue({
  el:"#app",
  render:c=>c(App),
  router
})