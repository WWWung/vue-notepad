<template>
    <div>
        <div class="topBanner">
            <div class="topBannerLogo">
                {{name}}
            </div>
            <div class="signout">
                <el-button type="danger" @click="signOut" size="mini">退出登录</el-button>
                <el-button type="info" size="mini">联系作者</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TopBanner",
    props: {
        name: ""
    },
    data () {
        return {
        }
    },

    components: {},

    computed: {},

    mounted () {},

    methods: {
        signOut() {
            this.invoke("/api/user.api", "signOut", null).then(d => {
                if (d.code) {
                    this.$message.error(d.data);
                    return
                }
                this.$router.push("/signin")
            })
        }
    }
}

</script>
<style scoped>
.topBanner {
    height: 55px;
    background-color: #398dee;
    width: 100%;
    display: flex;
    position: relative;
}
.topBannerLogo {
    height: 100%;
    line-height: 55px;
    padding: 0 10px;
    margin-left: 40px;
    font-size: 20px;
    color: #fff;
}
.signout {
    position: absolute;
    right: 25px;
    top: 14px;
}
</style>