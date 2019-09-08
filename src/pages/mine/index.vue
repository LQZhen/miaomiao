<template>
    <div class="content">
  <router-view></router-view>
    </div>

</template>
<script>


    export default {
        name:'mine',
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
    }
</style>