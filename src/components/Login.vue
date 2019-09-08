<template>
    <div class="login_body">
        <div>
            <input class="login_text" type="text" placeHolder="请输入账户名" v-model="username">
        </div>
        <div>
            <input class="login_text" type="password" placeHolder="请输入您的密码" v-model="password">
        </div>
        <div class="login_btn">
            <input type="submit" value="登录" @touchstart.prevent="handleLogin">
        </div>
        <div class="login_link">
            <router-link to="/mine/register">立即注册</router-link>
            <router-link to="/mine/repassword">找回密码</router-link>
        </div>
    </div>
</template>

<script>
    import messageBox from "./messageBox/index";

    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            async handleLogin() {
                const {username, password} = this
                const response = await this.$axios.post('/users/login', {username, password})
                const result = response.data
                const that = this
                this.username = ''
                this.password = ''
                if (result.code === 0) {
                    messageBox({
                        title: '登陆信息',
                        content: result.msg,
                        ok: '确定',
                        handleOk() {
                            that.$router.push('/mine/center')
                        }
                    })
                } else if (result.code === 1) {
                    messageBox({
                        title: '登陆信息',
                        content: result.msg,
                        ok: '确定',
                    })

                }

            }

        }
    }
</script>

<style scoped>
    .login_body {
        width: 100%;
    }

    .login_body .login_text {
        width: 100%;
        height: 40px;
        border: none;
        border-bottom: 1px #ccc solid;
        margin-bottom: 5px;
        outline: none;
        text-indent: 10px;
    }

    .login_body .login_btn {
        height: 50px;
        margin: 10px;
    }

    .login_body .login_btn input {
        width: 100%;
        height: 100%;
        background: #e54847;
        border-radius: 3px;
        border: none;
        display: block;
        color: white;
        font-size: 20px;
    }

    .login_body .login_link {
        display: flex;
        justify-content: space-between;
    }

    .login_body .login_link a {
        text-decoration: none;
        margin: 0 5px;
        font-size: 12px;
        color: #e54847;
    }
</style>