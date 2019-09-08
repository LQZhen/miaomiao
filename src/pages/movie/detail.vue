<template>
    <Loading v-if="isLoading"></Loading>
    <div class="contentDetail " v-else>
        <div class="detail_list">
            <div class="detail_list_bg" :style="{'background-image':`url(${movieDetail.img.replace(/w\.h/,'148.208')})`}"></div>
            <div class="detail_list_filter"></div>
            <div class="detail_list_content">
                <div class="detail_list_img">
                    <img :src="movieDetail.img|setWH('148.208')" alt="">
                </div>
                <div class="detail_list_info">
                    <h2>{{movieDetail.nm}}</h2>
                    <p>{{movieDetail.enm}}</p>
                    <p>{{movieDetail.sc}}</p>
                    <p>{{movieDetail.cat}}</p>
                    <p>{{movieDetail.src}} / {{movieDetail.dur}}分钟</p>
                    <p>{{movieDetail.pubDesc}}</p>
                </div>
            </div>
        </div>
        <div class="detail_intro">
            <p>
                {{movieDetail.dra}}</p>
        </div>
    </div>
</template>

<script>

    export default {
        name: "detail",
        data() {
            return {
                movieDetail: {},
                isLoading: true,
                prevId: -1
            }
        },
        props: ['id'],
        methods: {
            async getMovieDetail() {
                const response = await this.$axios.get(`/api/detailmovie?movieId=${this.id}`)
                this.isLoading = false
                this.prevId = this.id
                this.movieDetail = response.data.data.detailMovie
            }
        },
        created() {
            this.getMovieDetail()

        },
        activated() {
            if (this.prevId === this.id) {
                return
            }
            this.isLoading = true
            this.getMovieDetail()

        }
    }
</script>

<style scoped>
    .contentDetail {
        margin-bottom: 50px;
        position: relative;
        display: flex;
        flex-direction: column;
        margin-top: 50px;
    }

    .detail_list {
        height: 200px;
        width: 100%;
        position: relative;
        overflow: hidden;
    }

    .detail_list .detail_list_bg {
        width: 100%;
        height: 100%;
        background: 0 40%;
        filter: blur(20px);
        background-size: cover;
        position: absolute;
        left: 0;
        top: 0;
    }

    .detail_list .detail_list_filter {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: #40454d;
        opacity: .55;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
    }

    .detail_list .detail_list_content {
        display: flex;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
    }

    .detail_list .detail_list_img {
        width: 108px;
        height: 150px;
        border: solid 1px #f0f2f3;
        margin: 20px;
    }

    .detail_list .detail_list_img img {
        width: 100%;
        height: 100%;
    }

    .detail_list .detail_list_info {
        margin-top: 20px;
    }

    .detail_list .detail_list_info h2 {
        font-size: 20px;
        color: white;
        font-weight: normal;
        line-height: 40px;
    }

    .detail_list .detail_list_info p {
        color: white;
        line-height: 20px;
        font-size: 14px;
        color: #ccc;
    }

</style>