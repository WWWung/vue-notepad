<template>
  <div>
    <Signin v-if="isSignin" />
    <Signup v-else />
  </div>
</template>

<script>
import Signin from '@/components/Signin.vue'
import Signup from '@/components/Signup.vue'
export default {
  data () {
    return {
      isSignin: true
    }
  },

  components: {
    Signin,
    Signup
  },

  computed: {},

  mounted () {},

  methods: {
    
  }
}

</script>
<style scoped>
</style>