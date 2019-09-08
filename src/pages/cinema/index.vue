<template>
    <div class="content">
        <div class="cinema_menu">
            <div class="city_switch">
                全城 <i class="iconfont icon-lower-triangle"></i>
            </div>
            <div class="brand_swtich">
                品牌 <i class="iconfont icon-lower-triangle"></i>
            </div>
            <div class="feature_switch">
                特色 <i class="iconfont icon-lower-triangle"></i>
            </div>
        </div>
        <Loading v-if="isLoading"></Loading>
        <div class="cinema_body" v-else ref="cinemaBody">
            <ul>
                <li v-for="cinema in cinemaList" :key="cinema.id">
                    <div>
                        <span>{{cinema.nm}}</span>
                        <span class="q"><span class="price">{{cinema.sellPrice}}</span> 元起</span>
                    </div>
                    <div class="address">
                        <span>{{cinema.addr}}</span>
                        <span>{{cinema.distance}}</span>
                    </div>
                    <div class="card">
                        <div v-for="(value,key) in cinema.tag" v-if="value===1" v-bind:class="key|formatClass">
                            {{key|formatCard}}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>

</template>
<script>
    import {mapState} from 'vuex'
    import BScroll from 'better-scroll'

    export default {
        name: 'cinema',
        data() {
            return {
                cinemaList: [],
                isLoading: true,
                prevCityId: -1
            }
        },
        computed: {
            ...mapState(['city']),
        },
        methods: {
            async getCinemaList() {
                const {id} = this.city.cityInfo
                const response = await this.$axios.get(`/api/cinemaList?cityId=${id}`)
                this.isLoading = false
                this.prevCityId = id
                this.cinemaList = response.data.data.cinemas
                this.$nextTick(() => {
                    new BScroll(this.$refs.cinemaBody)
                })
            }
        },
        created() {
            this.getCinemaList()
        },
        filters: {
            formatCard(key) {
                let value = ''
                const card = [
                    {key: 'allowRefund', value: '改签'},
                    {key: 'endorse', value: '可退'},
                    {key: 'sell', value: '折扣卡'},
                    {key: 'snack', value: '小吃'}
                ]
                card.some(item => {
                    if (item.key === key) {
                        value = item.value
                        return true
                    }
                })
                return value
            },
            formatClass(key){
                let value = ''
                const card = [
                    {key: 'allowRefund', value: 'or'},
                    {key: 'endorse', value: 'or'},
                    {key: 'sell', value: 'bl'},
                    {key: 'snack', value: 'bl'}
                ]
                card.some(item => {
                    if (item.key === key) {
                        value = item.value
                        return true
                    }
                })
                return value
            }
        },
        activated() {
            const {id} = this.city.cityInfo
            if (id === this.prevCityId) {
                return
            }
            this.isLoading = true
            this.getCinemaList()
        }
    }
</script>
<style scoped>
    .content {
        flex: 1;
        overflow: auto;
        margin-bottom: 50px;
        position: relative;
        display: flex;
        flex-direction: column;
        margin-top: 50px;
    }

    .cinema_menu {
        width: 100%;
        height: 45px;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: white;
    }

    .cinema_body {
        flex: 1;
        overflow: auto;
    }

    .cinema_body ul {
        padding: 20px;
    }

    .cinema_body li {
        border-bottom: 1px solid #e6e6e6;
        margin-bottom: 20px;
    }

    .cinema_body div {
        margin-bottom: 10px;
    }

    .cinema_body .q {
        font-size: 11px;
        color: #f03d37;
    }

    .cinema_body .price {
        font-size: 18px;
    }

    .cinema_body .address {
        font-size: 13px;
        color: #666;
    }

    .cinema_body .address span:nth-of-type(2) {
        float: right;
    }

    .cinema_body .card {
        display: flex;
    }

    .cinema_body .card div {
        padding: 0 3px;
        height: 15px;
        line-height: 15px;
        border-radius: 2px;
        color: #f90;
        border: 1px solid #f90;
        font-size: 13px;
        margin-right: 5px;
    }

    .cinema_body .card div.or {
        color: #f90;
        border: 1px solid #f90;
    }

    .cinema_body .card div.bl {
        color: #589daf;
        border: 1px solid #589daf;
    }
</style>