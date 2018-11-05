<template>
  <div class="root">
    <div class="loginWrap">
      <div class="loginRow">
        <div class="logo">
          <img src="../assets/imgs/w.png" alt="wwwung" class="logoImg">
        </div>
      </div>
      <div class="loginRow">
        <input type="text" class="loginInput" placeholder="用户名" v-model="user.name" @keydown="keyDown">
      </div>
      <div class="loginRow">
        <input type="password" class="loginInput" placeholder="密码" v-model="user.password" @keydown="keyDown">
      </div>
      <div class="loginRow">
        <button class="signin" @click="signIn">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'signin',
  data () {
    return {
      user: {
        name: "",
        password: ""
      }
    }
  },

  components: {},

  computed: {},

  methods: {
    signIn() {
      if (!this.checkData()) {
        return
      }
      this.invoke("/api/user.api", "login", {
          data: this.user
        }).then(d => {
        if (d.code) {
          this.$message.error(d.data)
          return
        }
        if (d.data === "账号不存在") {
          this.$confirm("账号不存在，是否注册该账号？", "提示", {
            confirmButtonText: "确定",
            concelButtonText: "取消"
          }).then(() => {
            this.signUp()
          })
        } else {
          this.$store.commit("setName", d.data)
          this.$router.push('/')
        }
      })
    },
    signUp() {
      this.invoke("/api/user.api", "add", {
        data: this.user
      }).then(d => {
        if (d.code) {
          this.$message.error(d.data)
          return
        }
        this.$store.commit("setName", d.data)
        this.$router.push('/')
      })
    },
    keyDown(e) {
      if (e.keyCode === 13) {
        this.signIn()
      }
    },
    checkData() {
      if (!this.user.name) {
        this.$message.error('请输入用户名')
        return false
      }
      if (!this.user.password) {
        this.$message.error('请输入密码')
        return false
      }
      var namelength = this.global.stringLength(this.user.name)
      if (namelength > 16) {
        this.$message.error('用户名过长')
        return false
      }
      if (namelength < 5) {
        this.$message.error('用户名过短')
        return false
      }
      if (this.user.password.length < 6) {
        this.$message.error('密码过短')
        return false
      }
      if (this.user.password.length < 6) {
        this.$message.error('密码过长')
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
.signin {
  width: 352px;
  line-height: 36px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  background-color: #0084ff;
  border-radius: 3px;
  display: block;
  margin: 0 auto;
  cursor: pointer;
}
.signin:hover {
  background-color: #0077e6;
}
.logoImg {
  width: 60px;
  height: 60px;
  display: block;
  margin: 0 auto;
}
</style>