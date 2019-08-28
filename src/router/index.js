import VueRouter from 'vue-router';
import Vue from 'vue';
Vue.use(VueRouter);

//引入组件
import login from '../pages/login/login.vue';

import shopGoods from '../pages/shop/subShop/shopGoods/shopGoods.vue';
import shopInfo from '../pages/shop/subShop/shopInfo/shopInfo.vue';
import shopRating from '../pages/shop/subShop/shopRating/shopRating.vue';
import shop from '../pages/shop/shop.vue';


const home = ()=> import('../pages/home/home.vue');
const search = ()=> import('../pages/search/search.vue');
const order =()=> import('../pages/order/order.vue');
const profile =()=> import('../pages/profile/profile.vue');


export default new VueRouter({
  routes: [
    { path: '/home', component: home },
    { path: '/search', component: search },
    { path: '/order', component: order },
    { path: '/profile', component: profile },
    { path: '/login', component: login },
    { path: '/', redirect: '/home' },
    {
      path: '/shop', 
      component: shop,
      children:[
        { path: '/shop/Goods', component: shopGoods},
        { path: '/shop/Info', component: shopInfo },
        { path: '/shop/Rating', component: shopRating },
        { path:'/shop',redirect:'/shop/Goods'}
      ] 
    }
  ]
})
