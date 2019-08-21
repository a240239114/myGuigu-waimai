<template>
  <div>
    <router-view></router-view>
    <footGuide></footGuide>
  </div>
</template>

<script>
import footGuide from "./components/footGuide/footGuide";

export default {
  components: {
    footGuide
  }
}
</script>



<style lang="stylus" scoped></style>
