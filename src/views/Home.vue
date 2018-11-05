<template>
  <div class="home">
    <div class="topBannerWrap">
      <TopBanner />
    </div>
    <div class="contentWrap">
      <Types />
    </div>
    <!-- <Titles /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import TopBanner from '@/components/TopBanner.vue'
import Types from '@/components/Types.vue'
import Titles from '@/components/Titles.vue'

export default {
  name: 'home',
  components: {
    TopBanner,
    Types,
    Titles
  },
  mounted () {
    if (!this.$store.state.isLogin) {
      this.$router.push("/signin")
    }
  }
}
</script>
<style scoped>
.contentWrap {
  display: flex;
}
</style>

