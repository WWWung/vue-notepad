<template>
  <div class="hello">
    <input type="text" v-model="user.name">
    <input type="text" v-model="user.password">
    <img :src="src" alt="">
    <button @click="loginIn">登录</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      src: "",
      user: {
        name: "5443",
        password: "3445"
      }
    }
  },
  mounted() {
    this.invoke("/api/captcha.api", "captcha", {}).then(d => {
      this.src = d.data.Base64
    })
  },
  methods: {
    loginIn() {
      this.invoke("/api/user.api", "add", {data: this.user}).then(d => {
        console.log(d)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
