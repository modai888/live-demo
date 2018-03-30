<template>
    <div id="app" class="layout">
        <header class="layout__header">
            <div class="header-inner inner">
                <div class="brand">
                    <img class="logo" src="https://cn.vuejs.org/images/logo.png">
                    <span>LOGO</span>
                </div>
            </div>
        </header>
        <div class="layout__content">
            <div class="inner">
                <Breadcrumb separator=">" class="breadcrumb">
                    <BreadcrumbItem to="/">首页</BreadcrumbItem>
                    <BreadcrumbItem >计算机 大数据</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="inner" style="display: none">
                <div class="course-description">
                    <div class="left">
                        <img class="c-img"
                             src="https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=998022623,1884659479&fm=202&mola=new&crop=v1">
                        <a class="video-play-btn abs-center">
                            <span class="status start"></span>
                        </a>
                    </div>
                    <div class="right">
                        <h2>关于大数据那点事</h2>

                    </div>
                </div>
            </div>

            <div class="inner swipe-pics">
                <img src="http://www.datafountain.cn/projects/cmc/image/banner/banner_fullscreen_01.jpg">
            </div>

            <!--课程列表-->
            <div class="inner">
                <div class="course-card-category">
                    <h3>计算机技术</h3>
                    <a class="more">更多</a>
                </div>
                <div class="course-card-container">
                    <ul class="course-card__list">
                        <li class="course-card__item">
                            <a class="course-thumb">
                                <img src="https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=998022623,1884659479&fm=202&mola=new&crop=v1">
                            </a>
                            <section class="course-info">
                                <h3 class="title">视频直播测试-视频直播测试-视频直播测试-视频直播测试</h3>
                                <p>
                                    <span class="time">2018-08-08 12:30</span>
                                    <span class="teacher">授课教师</span>
                                </p>
                            </section>
                            <div class="mask-play"></div>
                        </li>
                        <li class="course-card__item">
                            <a class="course-thumb">
                                <img src="https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=998022623,1884659479&fm=202&mola=new&crop=v1">
                            </a>
                            <section class="course-info">
                                <h3 class="title">视频直播测试</h3>
                                <p>
                                    <span class="time">2018-08-08 12:30</span>
                                    <span class="teacher">授课教师</span>
                                </p>
                            </section>
                            <div class="mask-play"></div>
                        </li>
                        <li class="course-card__item">
                            <a class="course-thumb">
                                <img src="https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=998022623,1884659479&fm=202&mola=new&crop=v1">
                            </a>
                            <section class="course-info">
                                <h3 class="title">视频直播测试</h3>
                                <p>
                                    <span class="time">2018-08-08 12:30</span>
                                    <span class="teacher">授课教师</span>
                                </p>
                            </section>
                            <div class="mask-play"></div>
                        </li>
                        <li class="course-card__item">
                            <a class="course-thumb">
                                <img src="https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=998022623,1884659479&fm=202&mola=new&crop=v1">
                            </a>
                            <section class="course-info">
                                <h3 class="title">视频直播测试</h3>
                                <p>
                                    <span class="time">2018-08-08 12:30</span>
                                    <span class="teacher">授课教师</span>
                                </p>
                            </section>
                            <div class="mask-play"></div>
                        </li>
                        <li class="course-card__item">
                            <a class="course-thumb">
                                <img src="https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=998022623,1884659479&fm=202&mola=new&crop=v1">
                            </a>
                            <section class="course-info">
                                <h3 class="title">视频直播测试</h3>
                                <p>
                                    <span class="time">2018-08-08 12:30</span>
                                    <span class="teacher">授课教师</span>
                                </p>
                            </section>
                        </li>
                        <li class="course-card__item">
                            <a class="course-thumb">
                                <img src="https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=998022623,1884659479&fm=202&mola=new&crop=v1">
                            </a>
                            <section class="course-info">
                                <h3 class="title">视频直播测试</h3>
                                <p>
                                    <span class="time">2018-08-08 12:30</span>
                                    <span class="teacher">授课教师</span>
                                </p>
                            </section>
                        </li>
                        <li class="course-card__item">
                            <a class="course-thumb">
                                <img src="https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=998022623,1884659479&fm=202&mola=new&crop=v1">
                            </a>
                            <section class="course-info">
                                <h3 class="title">视频直播测试</h3>
                                <p>
                                    <span class="time">2018-08-08 12:30</span>
                                    <span class="teacher">授课教师</span>
                                </p>
                            </section>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
        <footer class="layout__footer"></footer>
    </div>
</template>

<script>
    // 导入全局样式
    import logo from "assets/img/logo.png";
    import modal from "components/modal.vue";


    export default {
        components: {
            modal
        },
        data() {
            return {
                msg: "Use Vue 2.0 Today!",
                logoImg: logo
            };
        },
        methods: {
            gogogo() {
                location.assign("../customer/home.html");
            },
            tototo() {
                location.assign("../user/login.html");
            },
            netLive() {
                location.assign("../net-live/zhibo.html");
            }
        }
    };
</script>

<style lang="scss">
    .index-card {
        width: 800px;
        margin: 100px auto;
    }
</style>
