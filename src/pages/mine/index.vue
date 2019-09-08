<template>
    <div class="content">
        <Login></Login>
    </div>

</template>
<script>
    import Login from "../../components/Login";

    export default {
        name:'mine',
        components: {
            Login
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
    }
</style>