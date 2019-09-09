<template>
    <div class="password_body">
        <div class="password_email">
            邮箱：<input v-model="email" class="password_text" type="text">
            <button @touchstart="handleToVerify" :disabled="flag">{{verifyInfo}}</button>
        </div>
        <div>
            新密码：<input v-model="password" class="password_text" type="password">
        </div>
        <div>
            验证码：<input v-model="verify" class="password_text" type="text">
        </div>
        <div class="password_btn">
            <button @touchstart="handleToPassword">修改</button>
        </div>
        <div class="password_link">
            <router-link to="/mine/login">立即登录</router-link>
            <router-link to="/mine/register">立即注册</router-link>
        </div>
    </div>
</template>

<script>
    import messageBox from "./messageBox/index";

    export default {
        name: "Repassword",
        data() {
            return {
                email: '',
                password: '',
                verify: "",
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
            async handleToPassword() {
                const {email, password, verify} = this
                const response = await this.$axios.post('/users/newpassword', {email, password, verify})
                const result = response.data
                if (result.code === 0) {
                    const that = this
                    messageBox({
                        title: '修改信息',
                        content: result.msg,
                        ok: '确定',
                        handleOk() {
                            that.$router.push('/mine/login')
                        }
                    })
                } else if (result.code === -1||result.code === -2) {
                    messageBox({
                        title: '修改信息',
                        content: result.msg,
                        ok: '确定',
                    })
                }

            }
        }
    }
</script>

<style scoped>
    .password_body {
        width: 100%;
    }

    .password_body .password_text {
        width: 100%;
        height: 40px;
        border: none;
        border-bottom: 1px #ccc solid;
        margin-bottom: 5px;
        outline: none;
        text-indent: 10px;
    }

    .password_body .password_btn {
        height: 50px;
        margin: 10px;
    }

    .password_body .password_email {
        position: relative;
    }

    .password_body .password_email button {
        position: absolute;
        right: 10px;
        top: 10px;
        height: 30px;
        border-radius: 3px;
        border: none;
        padding: 5px;
    }

    .password_body .password_btn button {
        width: 100%;
        height: 100%;
        background: #e54847;
        border-radius: 3px;
        border: none;
        display: block;
        color: white;
        font-size: 20px;
    }

    .password_body .password_link {
        display: flex;
        justify-content: space-between;
    }

    .password_body .password_link a {
        text-decoration: none;
        margin: 0 5px;
        font-size: 12px;
        color: #e54847;
    }
</style>