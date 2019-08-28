<template>
  <section class="search">
    <HeaderTop tittle="搜索" />
    <form class="search_form" @submit.prevent="search">
      <input type="search" placeholder="请输入商家名称" class="search_input" v-model="keyword" />
      <input type="submit" class="search_submit" />
    </form>


    <section class="list" v-if="!noSearchShops">
      <ul class="list_container">
        <!--:to="'/shop?id='+item.id"-->
        <router-link
          :to="{path:'/shop', query:{id:item.id}}"
          tag="li"
          v-for="item in SearchShops"
          :key="item.id"
          class="list_li"
        >
          <section class="item_left">
            <img :src="imgBaseUrl + item.image_path" class="restaurant_img" />
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{item.name}}</span>
              </p>
              <p>月售 {{item.month_sales||item.recent_order_num}} 单</p>
              <p>{{item.delivery_fee||item.float_minimum_order_amount}} 元起送 / 距离{{item.distance}}</p>
            </div>
          </section>
        </router-link>
      </ul>
    </section>

    <div class="search_none" v-else>很抱歉！无搜索结果</div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import HeaderTop from "../../components/headGuide/headGuide";
export default {
  data() {
    return {
      keyword: "",
      imgBaseUrl: "http://cangdu.org:8001/img/",
      noSearchShops: false,
      showList:true
    };
  },

  mounted() {
    this.$store.dispatch("getShops");
  },

  computed: {
    ...mapState(["shops"]),

    SearchShops() {
      /**
       * const keyword = this.keyword.trim();
       *
       * const {shops} =this;
       *
       * 条件 : shops.filter((shop)=>{
       *       return shop.name.indexOf(keyword) != -1;
       *  })
       */

      const keyword = this.keyword.trim();
      const { shops } = this;

      if (keyword != "") {
        return shops.filter(shop => {
          return shop.name.indexOf(keyword) != -1;
        });
      }
    }
  },

  methods: {
    search() {
      this.noSearchShops = true;
    }
  },

  components: {
    HeaderTop
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl';

.header { // 头部公共css
  background-color: #02a774;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 45px;

  .header_search {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 10%;
    height: 50%;

    .iconfont {
      font-size: 22px;
      color: #fff;
    }
  }

  .header_title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30%;
    color: #fff;
    font-size: 22px;
    text-align: center;
  }
}

.header_title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  color: #fff;
  text-align: center;

  .header_title_text {
    font-size: 20px;
    color: #fff;
    display: block;
  }
}

.search { // 搜索
  width: 100%;

  .search_form {
    clearFix();
    margin-top: 45px;
    background-color: #fff;
    padding: 12px 8px;

    input {
      height: 35px;
      padding: 0 4px;
      border-radius: 2px;
      font-weight: bold;
      outline: none;

      &.search_input {
        float: left;
        width: 79%;
        border: 4px solid #f2f2f2;
        font-size: 14px;
        color: #333;
        background-color: #f2f2f2;
      }

      &.search_submit {
        float: right;
        width: 18%;
        border: 4px solid #02a774;
        font-size: 16px;
        color: #fff;
        background-color: #02a774;
      }
    }
  }
}
</style>