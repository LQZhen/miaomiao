<template>
    <div class="search_body">
        <div class="search_input">
            <div class="search_input_wrapper">
                <i class="iconfont icon-sousuo"></i>
                <input type="text" v-model="message">
            </div>
        </div>
        <div class="search_result" v-if="movieList.length">
            <h3>电影/电视剧/综艺</h3>
            <ul>
                <li v-for="movie in movieList " :key="movie.id">
                    <div class="img"><img :src="movie.img|setWH('128.180')"></div>
                    <div class="info">
                        <p><span>{{movie.nm}}</span><span>{{movie.sc}}</span></p>
                        <p>{{movie.enm}}</p>
                        <p>{{movie.cat}}</p>
                        <p>{{movie.pubDesc}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div v-else :style="{marginTop:'20px'}">{{info||'请输入查询的信息'}}</div>
    </div>
</template>

<script>
    export default {
        name: "search",
        data() {
            return {
                message: '',
                movieList: [],
                info: ""
            }
        },
        methods: {
            cancelRequest() {
                if (typeof this.source === 'function') {
                    this.source('终止请求')
                }
            }
        },
        watch: {
            async 'message'(newValue) {
                this.cancelRequest()
                try {
                    const that = this
                    const response = await this.$axios.get(`/api/searchList?cityId=10&kw=${newValue}`, {
                        cancelToken: new this.$axios.CancelToken(function executor(c) {
                            that.source = c;
                        })
                    })
                    const result = response.data
                    if (result.status === 0 && result.data.movies) {
                        this.movieList = result.data.movies.list
                    } else {
                        this.info = '未查询到有效信息'
                    }

                } catch (error) {
                    if (this.$axios.isCancel(error)) {
                        console.log('Rquest canceled', error.message); //请求如果被取消，这里是返回取消的message
                    } else {
                        //handle error
                        console.log(error);
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .search_body {
        flex: 1;
        overflow: auto;
    }

    .search_body .search_input {
        padding: 8px 10px;
        background-color: #f5f5f5;
        border-bottom: 1px solid #e5e5e5;
    }

    .search_body .search_input_wrapper {
        padding: 0 10px;
        border: 1px solid #e6e6e6;
        border-radius: 5px;
        background-color: #fff;
        display: flex;
        line-height: 20px;
    }

    .search_body .search_input_wrapper i {
        font-size: 16px;
        padding: 4px 0;
    }

    .search_body .search_input_wrapper input {
        border: none;
        font-size: 13px;
        color: #333;
        padding: 4px 0;
        outline: none;
        margin-left: 5px;
        width: 100%;
    }

    .search_body .search_result {
    }

    .search_body .search_result h3 {
        font-size: 15px;
        color: #999;
        padding: 9px 15px;
        border-bottom: 1px solid #e6e6e6;
    }

    .search_body .search_result ul {
    }

    .search_body .search_result li {
        border-bottom: 1px #c9c9c9 dashed;
        padding: 10px 15px;
        box-sizing: border-box;
        display: flex;
    }

    .search_body .search_result .img {
        width: 60px;
        float: left;
    }

    .search_body .search_result .img img {
        width: 100%;
    }

    .search_body .search_result .info {
        float: left;
        margin-left: 15px;
        flex: 1;
    }

    .search_body .search_result .info p {
        height: 22px;
        display: flex;
        min-width: 0;
        line-height: 22px;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1) {
        font-size: 18px;
        flex: 1;
    }

    .search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2) {
        font-size: 16px;
        color: #fc7103;
    }

</style>