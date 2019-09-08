<template>
    <div>
        <h2 style="text-align: center">个人中心</h2>
        <p>欢迎 {{user.username}}</p>
        <button @touchstart="logout"
                :style="{width:'100%',height:'50px',lineHeight: '50px',border:'none',background:'#e54847',color:'#fff',borderRadius:'4px',marginTop:'8px'}">
            退出
        </button>
    </div>
</template>

<script>
    import axios from 'axios'
    import {mapState} from 'vuex'
    import messageBox from "../../components/messageBox/index";

    export default {
        name: "center",
        methods: {
            async logout() {
                const response = await this.$axios.get('/users/logout')
                const result = response.data
                if (result.code === 0) {
                    const that = this
                    messageBox({
                        title: '退出信息',
                        content: result.msg,
                        ok: '确定',
                        handleOk() {
                            that.$router.push('/mine/login')
                        }
                    })
                }
            }
        },
        computed: {
            ...mapState(['user'])
        },
        async beforeRouteEnter(to, form, next) {
            const response = await axios.get('/users/getUser')
            const result = response.data
            if (result.code === 0) {
                const {_id, username} = result.user
                next(vm => {
                    vm.$store.commit('user/getUser', {_id, username})
                })
            } else if (result.code === 1) {
                next('/mine/login')
            }
        }
    }
</script>

<style scoped>

</style>