<template>
    <div class="content">
            <div class="movie_menu">
                <router-link class="city_name" tag="div" to="/movie/city">
                    <span>{{city.cityInfo.nm}}</span><i class="iconfont icon-lower-triangle"></i>
                </router-link>
                <div class="hot_swtich">
                    <router-link class="hot_item" tag="div" to="/movie/nowplaying">
                        正在热映
                    </router-link>
                    <router-link class="hot_item" tag="div" to="/movie/comingsoon">
                        即将上映
                    </router-link>
                </div>
                <router-link class="search_entry" tag="div" to="/movie/search">
                    <i class="iconfont icon-sousuo"></i>
                </router-link>
            </div>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
    </div>
</template>
<script>
    import messageBox from "../../components/messageBox/index";
    import {mapState} from 'vuex'

    export default {
        name: "movie",
        computed: {
            ...mapState(['city'])
        },
        created() {
            this.getPosition()
        },
        methods: {
            async getPosition() {
                const response = await this.$axios.get('/api/getLocation')
                const {id, nm} = response.data.data
                if (id + '' === this.city.cityInfo.id) {
                    return
                }
                const that = this
                messageBox({title: '定位',
                    content: nm,
                    cancle: '取消',
                    ok: "切换",
                    handleOk() {
                        that.$store.commit('city/changeCity', {nm, id})
                        window.location.reload()
                    }})
            }
        }
    }
</script>
<style lang='less' type='text/less' scoped>
    .content {
        flex: 1;
        overflow: auto;
        margin-top: 50px;
        margin-bottom: 50px;
        position: relative;
        display: flex;
        flex-direction: column;

      .movie_menu {
            width: 100%;
            height: 45px;
            border-bottom: 1px solid #e6e6e6;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: white;
            z-index: 10;

            & > .city_name {
                margin-left: 20px;
                height: 100%;
                line-height: 45px;

                &.router-link-active {
                    color: #ef4238;
                    border-bottom: 2px #ef4238 solid;
                }
            }

            & > .hot_swtich {
                display: flex;
                height: 100%;
                line-height: 45px;

                & > .hot_item {
                    font-size: 15px;
                    color: #666;
                    width: 80px;
                    text-align: center;
                    margin: 0 12px;
                    font-weight: 700;

                    &.router-link-active {
                        color: #ef4238;
                        border-bottom: 2px #ef4238 solid;
                    }
                }
            }

            & > .search_entry {
                margin-right: 20px;
                height: 100%;
                line-height: 45px;

                &.router-link-active {
                    color: #ef4238;
                    border-bottom: 2px #ef4238 solid;
                }

                & > i {
                    font-size: 24px;
                    color: red;
                }

            }
        }
    }

</style>