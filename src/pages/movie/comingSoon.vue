<template>
    <div class="movie_body" ref="movieBody">
        <Loading v-if="isLoading"></Loading>
        <ul v-else>
            <li v-for="movie in comingList " :key="movie.id">
                <div class="pic_show" @tap="$router.push(`/movie/detail/${movie.id}`)"><img :src="movie.img|setWH('128.180')"></div>
                <div class="info_list" @tap="$router.push(`/movie/detail/${movie.id}`)">
                    <h2>{{movie.nm}} <img src="@/assets/maxs.png" alt="" v-if="movie.version"></h2>
                    <p><span class="person">{{movie.wish}}</span> 人想看</p>
                    <p>主演: {{movie.star}}</p>
                    <p>{{movie.showInfo}}</p>
                </div>
                <div class="btn_pre">
                    预售
                </div>
            </li>

        </ul>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {mapState} from 'vuex'

    export default {
        name: "comingSoon",
        data() {
            return {
                comingList: [],
                isLoading: true,
                prevCityId: -1
            }
        },
        methods: {
            async getMovieList() {
                const {id} = this.city.cityInfo
                const response = await this.$axios.get(`/api/movieComingList?cityId=${id}`)
                this.prevCityId = id
                this.comingList = response.data.data.comingList
                this.isLoading = false
                this.$nextTick(() => {
                    this.scroll = new BScroll(this.$refs.movieBody, {
                        probeType: 2,
                        tap: true,
                    })
                })
            }
        },
        created() {
            this.getMovieList()
        },
        computed: {
            ...mapState(['city'])
        },
        activated() {
            const {id} = this.city.cityInfo
            if (id === this.prevCityId) {
                return
            }
            this.isLoading = true
            this.getMovieList()
        }

    }
</script>

<style scoped>
    .movie_body {
        flex: 1;
        overflow: auto;
    }

    .movie_body ul {
        margin: 0 12px;
        overflow: hidden;
    }

    .movie_body ul li {
        margin-top: 12px;
        display: flex;
        align-items: center;
        border-bottom: 1px #e6e6e6 solid;
        padding-bottom: 10px;
    }

    .movie_body .pic_show {
        width: 64px;
        height: 90px;
    }

    .movie_body .pic_show img {
        width: 100%;
    }

    .movie_body .info_list {
        margin-left: 10px;
        flex: 1;
        position: relative;
    }

    .movie_body .info_list h2 {
        font-size: 17px;
        line-height: 24px;
        width: 150px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .movie_body .info_list p {
        font-size: 13px;
        color: #666;
        line-height: 22px;
        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .movie_body .info_list .grade {
        font-weight: 700;
        color: #faaf00;
        font-size: 15px;
    }

    .movie_body .info_list img {
        width: 50px;
        position: absolute;
        right: 10px;
        top: 5px;
    }

    .movie_body .btn_mall, .movie_body .btn_pre {
        width: 47px;
        height: 27px;
        line-height: 28px;
        text-align: center;
        background-color: #f03d37;
        color: #fff;
        border-radius: 4px;
        font-size: 12px;
        cursor: pointer;
    }

    .movie_body .btn_pre {
        background-color: #3c9fe6;
    }

</style>