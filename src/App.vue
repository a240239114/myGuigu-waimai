<template>
  <div>
    <router-view></router-view>
    <footGuide v-if="showFootFlag"></footGuide>
    <!-- <mt-button type="danger" style="width: 100%">退出登陆</mt-button> -->
  </div>
</template>

<script>
import footGuide from "./components/footGuide/footGuide";

export default {
  mounted() {
    //获取用户详情
    this.$store.dispatch("getUserInfo");

    console.log(this.$route.path);
  },

  computed: {
    showFootFlag() {
      if (
        this.$route.path == "/home" ||
        this.$route.path == "/order" ||
        this.$route.path == "/profile" ||
        this.$route.path == "/search"
      ) {
        return true;
      } else {
        return false;
      }
    }
  },

  components: {
    footGuide
  }
};
</script>



<style lang="stylus" scoped></style>
