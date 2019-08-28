<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <li
            class="menu-item"
            :class="[{'current':index == currentIndex}]"
            v-for="(good, index) in goods"
            :key="index"
            @click="goToDetile"
          >
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon" />
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>

      <div class="foods-wrapper">
        <ul>
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>

            <ul>

              <li
                class="food-item bottom-border-1px"
                v-for="(food, index) in good.foods"
                :key="index"
                @click.stop="toggleFoodShow(index)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>

                  <div class="cartcontrol-wrapper">
                    <shopCount :food="food"></shopCount>
                  </div>
                </div>

                <!-- 父组件给子组件分发事件,让子组件的isShow发生变化 -->
                <Food :food="food" ref="food"></Food>
                  
                
              </li>


            </ul>
          </li>
        </ul>
      </div>

      <!-- 购物车 -->
      <shopCar></shopCar>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import BScroll from "better-scroll";
import shopCount from "./subComponent/shopCount.vue";
import shopCar from "./subComponent/shopCar.vue";

import Food from "./subComponent/food";

export default {
  data() {
    return {
      scrollY: 0, //foodsScroll向上滚动出去的值
      foodsScroll: "",
      foodsItemDis: [0], //保存的是每个ITEM到顶部的距离,一共有五个值
      // food:{}
    };
  },

  mounted() {
    this.$store.dispatch("getShopGoods", () => {
      // console.log(this);

      // nextTick
      this.$nextTick(() => {
        //下一次DOM渲染之后,执行初始化代码

        //初始化滚动条
        this._menuScrollInit();
        this._foodsScrollInit();

        //初始化距离数组
        this._foodsItemDisInit();

        // console.log($(".menu-item"));

        // 侧边栏添加点击事件
        this._menuClickInit();

        // this.foodsScroll.scrollTo(0,this.scrollY,300);
      });
    });
  },

  computed: {
    ...mapState(["goods"]),

    currentIndex() {
      // let currentIndex = 1;
      const { foodsItemDis, scrollY } = this;
      let index;

      if (scrollY < foodsItemDis[0]) {
        index = 0;
      } else {
        index = foodsItemDis.findIndex((item, index) => {
          return scrollY >= item && scrollY < foodsItemDis[index + 1];
        });
      }

      return index;
    }
  },

  methods: {
    _menuScrollInit() {
      let menuScroll = new BScroll(".menu-wrapper", {
        probeType: 2,
        click: true
      });
    },

    _foodsScrollInit() {
      this.foodsScroll = new BScroll(".foods-wrapper", {
        probeType: 2,
        click: true
      });

      //收集向上滑动的值ScrollY
      this.foodsScroll.on("scroll", ({ x, y }) => {
        //  console.log(x,y);
        this.scrollY = -Math.ceil(y);
        // console.log("this.scrollY===========>" + this.scrollY);
      });
    },

    _foodsItemDisInit() {
      let distanceTop = 0;
      $(".food-list-hook").map((index, item) => {
        distanceTop = distanceTop + $(item).height();
        // console.log(distanceTop);
        this.foodsItemDis.push(distanceTop);
      });

      // console.log(this.foodsItemDis);
    },

    _menuClickInit() {
      // const {foodsItemDis,foodsScroll}  = this;

      // console.log(this.scrollY);

      let that = this;

      $(".menu-item").map((index, item) => {
        // console.log(item);
        $(item).click(function() {
          // console.log("111111");
          // console.log(index);
          // currentIndex = index;
          index = parseInt(index);

          const y = that.foodsItemDis[index];

          // console.log(that.scrollY);
          console.log(y);
          that.scrollY = y;

          // console.log("scrollY=====>"+scrollY);

          // scrollY = y;
          // this.foodsScroll.scrollTo(0,y);
          that.foodsScroll.scrollTo(0, -that.scrollY, 300);
          // console.log(currentIndex);
        });
      });
    },

    goToDetile() {},

    toggleFoodShow(index) {
      // this.food = food;  
       console.log(this.$refs.food[index]);  
      //让子组件的ishow发生改变
      this.$refs.food[index].toggleShow();
    }
  },

  components: {
    shopCount,
    shopCar,
    Food
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../../common/stylus/mixins.styl';

.goods {
  display: flex;
  position: absolute;
  top: 195px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
