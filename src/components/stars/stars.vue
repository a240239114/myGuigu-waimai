<template>
  <div :class="'star star-'+size">
    <span class="star-item" v-for="(item,index) in scoreArr" :key="index" :class="item"></span>
  </div>
</template>

<script>
import { debug } from "util";
const STAR_ON = "on";
const STAR_HALF = "half";
const STAR_OFF = "off";

export default {
  props: ["score", "size"],
  computed: {
    // 3.5 3个STAR_ON 1个STAR_HALF 1个STAR_OFF
    //3.2  3个STAR_ON 2个1个STAR_OFF

    scoreArr() {
      const arr = [];
      const { score } = this;

      //scroe向下取整
      let int = Math.floor(score);
      //添加全星
      for (let i = 0; i < int; i++) {
        arr.push(STAR_ON);
      }
      //添加半星
      const xiaoshu = score - int;
      if (xiaoshu * 10 > 5) {
        arr.push(STAR_HALF);
      }
      //添加灰心
      while (arr.length < 5) {
        arr.push(STAR_OFF);
      }

      return arr;
    }
  }
};
</script>



<style lang='stylus' scoped>
@import '../../common/stylus/mixins.styl';

.star { // 2x图 3x图
  float: left;
  font-size: 0;

  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }

  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/stars/star48_on');
      }

      &.half {
        bg-image('./images/stars/star48_half');
      }

      &.off {
        bg-image('./images/stars/star48_off');
      }
    }
  }

  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/stars/star36_on');
      }

      &.half {
        bg-image('./images/stars/star36_half');
      }

      &.off {
        bg-image('./images/stars/star36_off');
      }
    }
  }

  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/stars/star24_on');
      }

      &.half {
        bg-image('./images/stars/star24_half');
      }

      &.off {
        bg-image('./images/stars/star24_off');
      }
    }
  }
}
</style>