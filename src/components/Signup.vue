<template>
  <div class="root">
    <div class="loginWrap">
      <div class="loginRow">
        <div class="logo">
          <img src="../assets/imgs/w.png" alt="wwwung" class="logoImg">
        </div>
      </div>
      <div class="loginRow">
        <input type="text" class="loginInput" placeholder="用户名">
      </div>
      <div class="loginRow">
        <input type="text" class="loginInput" placeholder="密码">
      </div>
      <div class="loginRow">
        <input type="text" class="loginInput" placeholder="重复密码">
      </div>
      <div class="loginRow">
        <input type="text" class="loginInput" placeholder="验证码">
      </div>
      <div class="loginRow">
        <button class="signup">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  methods: {
    checkData() {
      var namelength = this.global.stringLength(this.user.name)
      if (namelength > 16) {
        this.$message({
                showClose: true,
                message: '用户名过长',
                type: 'error'
              })
        return false
      }
      if (namelength < 5) {
        this.$message({
                showClose: true,
                message: '用户名过短',
                type: 'error'
              })
        return false
      }
      if (this.user.password.length < 6) {
        this.$message({
                showClose: true,
                message: '密码过短',
                type: 'error'
              })
        return false
      }
      if (this.user.password.length < 6) {
        this.$message({
                showClose: true,
                message: '密码过长',
                type: 'error'
              })
        return false
      }
      return true
    }
  }
}

</script>
<style scoped>
.root {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  min-height: 500px;
}
.loginWrap {
  background-color: #fff;
  border-radius: 4px;
  padding: 20px 0 40px 0;
  border: 1px solid #d8dee2;
}
.loginRow {
  margin-top: 20px;
  padding: 0 20px;
}
.loginInput {
  height: 48px;
  border-bottom: 1px solid #ddd;
  width: 432px;
  text-indent: 10px;
}
.signup {
  width: 352px;
  line-height: 36px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  background-color: #28a745;
  border-radius: 3px;
  display: block;
  margin: 0 auto;
  cursor: pointer;
}
.signup:hover {
  background-color: #269f42;
}
.logoImg {
  width: 60px;
  height: 60px;
  display: block;
  margin: 0 auto;
}
</style>