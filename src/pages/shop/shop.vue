<template>
  <div>
    <shopHead></shopHead>

    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/Goods" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/Rating" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/Info" replace>商家</router-link>
      </div>
    </div>
    <!-- <food></food> -->

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import shopHead from "./shopHead";

export default {
  mounted() {
    this.$store.dispatch("getShopInfo");
  },

  components: {
    shopHead
    // food
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/mixins.styl';

.tab {
  height: 40px;
  line-height: 40px;
  background: #fff;
  bottom-border-1px(rgba(7, 17, 27, 0.1));

  .tab-item {
    float: left;
    width: 33.33333%;
    text-align: center;
    font-size: 14px;
    color: rgb(77, 85, 93);

    a {
      display: block;
      position: relative;

      &.router-link-active {
        color: #02a774;

        &::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 1px;
          width: 35px;
          height: 2px;
          transform: translateX(-50%);
          background: #02a774;
        }
      }
    }
  }
}
</style>