import VueRouter from 'vue-router';
import Vue from 'vue';
Vue.use(VueRouter);

//引入组件
import home from '../pages/home/home.vue';
import search from '../pages/search/search.vue';
import order from '../pages/order/order.vue';
import profile from '../pages/profile/profile.vue';
import login from '../pages/login/login.vue';


export default new VueRouter({
  routes: [
    {path: '/home',component:home},
    {path: '/search',component:search},
    {path: '/order',component:order},
    {path: '/profile',component:profile},
    {path: '/login',component:login}
  ]
})
