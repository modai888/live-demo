/**
 * nuxt config file
 * */

const pages = require('./web/pages/router');

module.exports = {
    head: {
        titleTemplate: 'DF,CCF指定专业大数据竞赛平台',
        meta: [
            {charset: 'utf-8'},
            {
                name: 'viewport',
                content: 'width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no'
            },
            {hid: 'description', name: 'description', content: 'DF,CCF指定专业大数据竞赛平台'},
            {httpEquiv: 'X-UA-Compatible', content: 'IE=edge'}
        ]
    },

    srcDir: 'web',
    dir: {
        pages: 'views'
    },

    // 注册nuxt钩子函数
    // hooks: {}
    hooks: (hook) => {
        // 挂载钩子方法
        hook('ready', (nuxt) => {

        });

        // 扩展vue路由
        // 同hook-> build:extendRoutes
        hook('build:extendRoutes', (routes, r) => {
            return routes;
        })

    },

    // webpack build related options
    build: {
        publicPath: '/_df/',
        uglify: false, // 暂时不执行代码压缩
        dll: false,
        templates: [
            {src: './web/client.js', dst: 'client.js'},
            {src: './web/server.js', dst: 'server.js'}
        ],
        vendor: [],
        // extend nuxt webpack config 
        extend: (config, {isDev, isClient, isServer}) => {
            // debugger;

            // 扩展客户端配置
            if (isClient) {

            }

            return config;
        }
    },

    router: {
        // 扩展系统生成的路由
        extendRoutes: (routes, r) => {
            // debugger;
            // routes.push({
            //     name: 'test',
            //     path: '/test',
            //     component: r(__dirname, './web/views/test.vue')
            // });
            return [].concat(routes, pages(r));

        }
    },

    /*
    ** Global CSS
    */
    css: [
        '~/styles/common.scss'
        // 'element-ui/lib/theme-chalk/reset.css',
        // 'element-ui/lib/theme-chalk/index.css'
    ],
    plugins: [
        {src: '~/plugins/element-ui'}
    ]

}