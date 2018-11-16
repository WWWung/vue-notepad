<template>
  <div class="home">
    <div class="topBannerWrap">
      <TopBanner name="wwwung"/>
    </div>
    <div class="contentWrap">
      <Types />
      <Titles />
      <div class="inputWrap">
        <Editor />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TopBanner from '@/components/TopBanner.vue'
import Types from '@/components/Types.vue'
import Titles from '@/components/Titles.vue'
import Editor from '@/components/Editor.vue'

export default {
  name: 'home',
  components: {
    TopBanner,
    Types,
    Titles,
    Editor
  },
  mounted () {
    this.isLogin()
  },
  methods: {
    isLogin () {
      // var l = this.$loading()
      if (!this.$store.state.isLogin) {
        this.invoke("/api/user.api", "isLogin", null).then(d => {
          if (d.code) {
            // l.close()
            this.$router.push("/signin")
          } else {
            // l.close()
            this.$store.commit("setName", d.data)
          }
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
.inputWrap {
  flex: 1;
}
</style>

