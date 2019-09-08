<template>
        <Loading v-if="isLoading"></Loading>
        <div class="city_body" v-else>
            <div class="city_list">
                <div ref="cityList" style="height: 100%">
                    <div>
                        <div class="city_hot">
                            <h2>热门城市</h2>
                            <ul class="clearfix">
                                <li v-for="city in hotList " :key="city.id" @tap="changeCity(city.nm,city.id)">{{city.nm}}</li>
                            </ul>
                        </div>
                        <div class="city_sort" ref="citySort">
                            <div v-for="item in cityList " :key="item.letter">
                                <h2>{{item.letter}}</h2>
                                <ul>
                                    <li v-for="city in item.list" :key="city.id" @tap="changeCity(city.nm,city.id)">
                                        {{city.nm}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="city_index">
                <ul>
                    <li v-for="(item,index) in cityList" :key="item.letter" @click="toCity(index)">{{item.letter}}</li>
                </ul>
            </div>
        </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        name: "city",
        data() {
            return {
                hotList: [],
                cityList: [],
                isLoading: true
            }
        },

        created() {
            this.getCityInfo()
        },
        methods: {
            async getCityInfo() {
                let cityList = JSON.parse(localStorage.getItem('cityList'))
                let hotList = JSON.parse(localStorage.getItem('hotList'))
                if (cityList && hotList) {
                    this.hotList = hotList
                    this.cityList = cityList
                    this.isLoading = false
                    this.$nextTick(() => {
                        this.scroll = new BScroll(this.$refs.cityList, {tap: true})
                    })
                } else {
                    const ret = await this.$axios.get('/api/cityList')
                    let cities = ret.data.data.cities
                    let cityList = []
                    let hotList = []
                    let flag
                    let letter
                    cities.forEach(city => {
                        flag = false
                        letter = city.py.slice(0, 1).toUpperCase()
                        cityList.some(item => {
                            if (item.letter == letter) {
                                item.list.push(city)
                                flag = true
                                return true
                            }
                        })
                        if (!flag) {
                            cityList.push({letter, list: [city]})
                        }
                        if (city.isHot) {
                            hotList.push(city)
                        }
                    })
                    cityList.sort((c1, c2) => {
                        return c1.letter.charCodeAt() - c2.letter.charCodeAt()
                    })
                    localStorage.setItem('cityList', JSON.stringify(cityList))
                    localStorage.setItem('hotList', JSON.stringify(hotList))
                    this.hotList = hotList
                    this.cityList = cityList
                    this.isLoading = false
                    this.$nextTick(() => {
                        this.scroll = new BScroll(this.$refs.cityList, {tap: true})
                    })
                }

            },
            toCity(index) {
                let h2 = this.$refs.citySort.getElementsByTagName('h2')[index]
                this.scroll.scrollTo(0, -h2.offsetTop, 300)

            },
            changeCity(nm, id) {
                this.$store.commit('city/changeCity', {nm, id})
                this.$router.push('/movie/nowplaying')
            }


        },
    }
</script>

<style scoped>
    .city_body {
        margin-top: 45px;
        display: flex;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
    }

    .city_body .city_list {
        flex: 1;
        overflow: hidden;
        background: #FFF5F0;
    }

    .city_body .city_list::-webkit-scrollbar {
        background-color: transparent;
        width: 0;
    }

    .city_body .city_hot {
        margin-top: 20px;
    }

    .city_body .city_hot h2 {
        padding-left: 15px;
        line-height: 30px;
        font-size: 14px;
        background: #F0F0F0;
        font-weight: normal;
    }

    .city_body .city_hot ul li {
        float: left;
        background: #fff;
        width: 29%;
        height: 33px;
        margin-top: 15px;
        margin-left: 3%;
        padding: 0 4px;
        border: 1px solid #e6e6e6;
        border-radius: 3px;
        line-height: 33px;
        text-align: center;
        box-sizing: border-box;
    }


    .city_body .city_sort div {
        margin-top: 20px;
    }

    .city_body .city_sort h2 {
        padding-left: 15px;
        line-height: 30px;
        font-size: 14px;
        background: #F0F0F0;
        font-weight: normal;
    }

    .city_body .city_sort ul {
        padding-left: 10px;
        margin-top: 10px;
    }

    .city_body .city_sort ul li {
        line-height: 30px;
        line-height: 30px;
    }

    .city_body .city_index {
        width: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        border-left: 1px #e6e6e6 solid;
    }
</style>