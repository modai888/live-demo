<template>
    <div class="df-page df-page-home">
        <div class="df-banners-wrapper" style="height: 360px;background-color: #ffcc66">

        </div>

        <div class="container df-container">
            <div class="df-container__inner" style="height: 360px;">
                <h2 class="title">
                    热门竞赛展示
                </h2>
                <nuxt-link class="button" to="/about">
                    更多比赛
                </nuxt-link>
            </div>
        </div>

        <div class="container df-container">
            <div class="df-container__inner" style="height: 360px;">
                <h2 class="title">
                    热门竞赛展示
                </h2>
                <nuxt-link class="button" to="/about">
                    更多比赛
                </nuxt-link>
            </div>
        </div>

        <div class="container df-container">
            <div class="df-container__inner" style="height: 360px; ">
                <!--<img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />-->
                <h1 class="title">
                    Universal Vue.js Application Framework
                </h1>
                <nuxt-link class="button" to="/about">
                    About page
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Home'
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    /**首页内联样式*/
    @import '../styles/home';
</style>