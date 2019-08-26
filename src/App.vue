<template>
  <div>
    <router-view></router-view>
    <footGuide></footGuide>
  </div>
</template>

<script>
import footGuide from "./components/footGuide/footGuide";

export default {
  mounted() {
    //获取用户详情
    this.$store.dispatch("getUserInfo");
  },

  components: {
    footGuide
  }
};
</script>



<style lang="stylus" scoped></style>
