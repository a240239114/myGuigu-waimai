<template>
  <div class="cartcontrol">
    <transition name="my">
      <div class="iconfont icon-remove_circle_outline" @click.stop="IsAdd(false)" v-if="food.count"></div>
    </transition>

    <div class="cart-count" v-if="food.count">{{food.count}}</div>
    <div class="iconfont icon-add_circle" @click.stop="IsAdd(true)"></div>
  </div>
</template>

<script>
// import {mapActions} from

export default {
  props: {
    food: Object
  },

  methods: {
    IsAdd(isAdd) {
      const food = this.food;
      //  console.dir("food=========>"+food)count
      this.$store.dispatch("updateFoodCount", { isAdd, food });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../../../common/stylus/mixins';

.cartcontrol {
  font-size: 0;

  .cart-decrease {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }

  .icon-remove_circle_outline {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: $green;

    &.move-enter-active, &.move-leave-active {
      transition: all 0.3s;
    }

    &.move-enter, &.move-leave-to {
      opacity: 0;
      transform: translateX(15px) rotate(180deg);
    }
  }

  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .icon-add_circle {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: $green;
  }

  .my-enter,
  .my-leave-to{
      opacity :0;
      transform :translateX(45px) rotate(180deg);
      // transform :rotate(180deg);
  }

  .my-enter-active,
  .my-leave-active{
      transition :all 0.3s ease; 
  }
}
</style>
