<template>
    <div class="register_body">
        <div class="register_email">
            邮箱：<input v-model="email" class="register_text" type="text">
            <button @touchstart="handleToVerify" :disabled="flag">{{verifyInfo}}</button>
        </div>
        <div>
            用户名：<input v-model="username" class="register_text" type="text">
        </div>
        <div>
            密码：<input v-model="password" class="register_text" type="password">
        </div>
        <div>
            确认密码：<input class="register_text" type="password">
        </div>
        <div>
            验证码：<input v-model="verify" class="register_text" type="text">
        </div>
        <div class="register_btn">
            <button @touchstart="handleToRegister">注册</button>
        </div>
        <div class="register_link">
            <router-link to="/mine/login">立即登录</router-link>
            <router-link to="/mine/repassword">找回密码</router-link>
        </div>
    </div>
</template>

<script>
    import messageBox from "./messageBox/index";

    export default {
        name: "Register",
        data() {
            return {
                email: '',
                username: '',
                password: '',
                verify: '',
                verifyInfo:'发送验证码',
                flag:false
            }

        },
        methods: {
            async handleToVerify() {
                if(this.flag){
                    return  true
                }
                this.flag=true
                let time=60
                this.setIntervalId=setInterval(()=>{
                    this.verifyInfo=`${time}s`
                    time--
                    if(time<=0){
                        this.verifyInfo='发送验证码'
                        clearInterval(this.setIntervalId)
                        this.flag=false
                    }

                },1000)
                const {email} = this
                const response = await this.$axios.get('/users/verify', {
                    params: {email}
                })
                const result = response.data
                if (result.code === 0) {
                    messageBox({
                        title: '验证码',
                        content: '验证码发送成功',
                        ok: '确定'
                    })
                } else {
                    messageBox({
                        title: '验证码',
                        content: '验证码发送失败',
                        ok: '确定'
                    })
                }


            },
            async handleToRegister() {
                const {username, password, email, verify} = this
                const response = await this.$axios.post('/users/register', {username, password, email, verify})
                const result = response.data
                if (result.code === -1||result.code === -2) {
                    return messageBox({
                        title: '注册信息',
                        content: result.msg,
                        ok: '确定'
                    })
                } else if (result.code === 1) {
                    return messageBox({
                        title: '注册信息',
                        content: result.msg,
                        ok: '确定'
                    })
                } else if (result.code === 0) {
                    const that = this
                    return messageBox({
                        title: '注册信息',
                        content: result.msg,
                        ok: '确定',
                        handleOk() {
                            that.$router.push('/mine/login')
                        }
                    })
                }

            }
        }
    }
</script>

<style scoped>
    .register_body {
        width: 100%;
    }

    .register_body .register_text {
        width: 100%;
        height: 40px;
        border: none;
        border-bottom: 1px #ccc solid;
        margin-bottom: 5px;
        outline: none;
        text-indent: 10px;
    }

    .register_body .register_btn {
        height: 50px;
        margin: 10px;
    }

    .register_body .register_email {
        position: relative;
    }

    .register_body .register_email button {
        position: absolute;
        right: 10px;
        top: 10px;
        height: 30px;
        border-radius: 3px;
        border: none;
        padding: 5px;
    }

    .register_body .register_btn button {
        width: 100%;
        height: 100%;
        background: #e54847;
        border-radius: 3px;
        border: none;
        display: block;
        color: white;
        font-size: 20px;
    }

    .register_body .register_link {
        display: flex;
        justify-content: space-between;
    }

    .register_body .register_link a {
        text-decoration: none;
        margin: 0 5px;
        font-size: 12px;
        color: #e54847;
    }
</style>