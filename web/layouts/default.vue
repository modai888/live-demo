<template>
    <div class="df-layout df-layout-default">
        <div class="df-header">
            <div class="df-brand">
                <nuxt-link class="button" to="/">
                    <img src="~/assets/imgs/logo.png" style="vertical-align: sub"/>
                </nuxt-link>
            </div>
            <nav class="df-nav">
                <li>
                    <nuxt-link class="button" to="/">
                        首页
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link class="button" to="/competitions">
                        全部竞赛
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link class="button" to="/experts">
                        专家库
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link class="button" to="/ask-for-competition">
                        企业办赛
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link class="button" to="/profile">
                        个人主页
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link class="button" to="/help">
                        帮助
                    </nuxt-link>
                </li>
            </nav>
            <div class="df-auth-info">
                <a class="button">登陆</a>
                <a class="button">注册</a>
            </div>
        </div>
        <nuxt/>
        <div class="df-footer"></div>
    </div>
</template>

<style lang="scss">
    @import "../styles/layouts/default";
</style>