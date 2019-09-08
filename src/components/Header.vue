<template>
    <div class="header">
        <h1>{{title||'喵喵电影'}}</h1>
       <i class="icon-right iconfont" v-if="title==='电影详情'" @touchstart="$router.back()"></i>
    </div>
</template>
<script>
    export default {
        props:['show','title']
    }
</script>
<style lang='less' type='text/less' scoped>
    .header {
        width: 100%;
        height: 50px;
        color: #fff;
        background: #e54847;
        border-bottom: 1px solid #e54847;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
    }

    .header h1 {
        font-size: 18px;
        text-align: center;
        line-height: 50px;
        font-weight: normal;
    }

    .header i {
        position: absolute;
        left: 5px;
        top: 50%;
        margin-top: -13px;
        font-size: 26px;
    }
</style>