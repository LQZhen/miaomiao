<template>
    <div id="app">
        <Header :title="$route.meta.title"></Header>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <Footer></Footer>
    </div>
</template>

<script>
    import Footer from '@/components/Footer.vue'
    import Header from '@/components/Header.vue'
    export default {
        components:{
            Footer,
            Header
        }
    }
</script>

<style>
    #app {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>
