import VueRouter from 'vue-router';
import Vue from 'vue';
Vue.use(VueRouter);

//引入组件
import home from '../pages/home/home.vue';
import search from '../pages/search/search.vue';
import order from '../pages/order/order.vue';
import profile from '../pages/profile/profile.vue';
import login from '../pages/login/login.vue';

import shopGoods from '../pages/shop/subShop/shopGoods.vue';
import shopInfo from '../pages/shop/subShop/shopInfo.vue';
import shopRating from '../pages/shop/subShop/shopRating.vue';
import shop from '../pages/shop/shop.vue';



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
