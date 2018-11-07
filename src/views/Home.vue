<template>
  <div class="home">
    <div class="topBannerWrap">
      <TopBanner name="wwwung"/>
    </div>
    <div class="contentWrap">
      <Types />
      <Titles />
    </div>
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
    this.isLogin()
  },
  methods: {
    isLogin () {
      var l = this.$loading()
      if (!this.$store.state.isLogin) {
        this.invoke("/api/user.api", "isLogin", null).then(d => {
          if (d.code) {
            this.$router.push("/signin")
          } else {
            this.$store.commit("setName", d.data)
          }
          l.close()
        })
      }
    }
  }
}
</script>
<style scoped>
.contentWrap {
  display: flex;
}
</style>

