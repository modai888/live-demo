'use strict';

const { EventEmitter } = require('events');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');
const staticCache = require('koa-static-cache');
const compose = require('koa-compose');
const { Nuxt, Builder } = require('nuxt');
const pluginRouter = require('./lib/router');

// global koa instance
const app = new Koa();

// catch global exception
app.on('error', (error) => {
    // 添加错误响应的自定义header
    // error.headers = {};
    // 用户可在此定制错误信息，error.expose
    // error.code
    // error.status
    // error.message
    // error.expose

    console.error('globa error: ' + error);
})

class Server extends EventEmitter {
    /**
     * 构造器
     */
    constructor(opts) {
        super();
    }

    get app() {
        return app;
    }

    async start(port) {
        this.emit('beforeStart');

        // 托管静态资源
        if ( process.env.NODE_ENV !== 'development' ) {
            app.use(staticCache({
                dir: path.join(__dirname, '..', 'dist')
            }))
        }

        // add nuxt support
        const config = require('../nuxt.config.js')
        config.dev = !(app.env === 'production')

        // Instantiate nuxt.js
        const nuxt = new Nuxt(config)

        // Build in development
        if ( config.dev ) {
            const builder = new Builder(nuxt);
            await builder.build()
        }

        app.use(async (ctx, next) => {
            await next();

            if ( ctx.body === undefined ) {
                ctx.status = 200; // koa defaults to 404 when it sees that status is unset
                return new Promise((resolve, reject) => {
                    ctx.res.on('close', resolve);
                    ctx.res.on('finish', resolve);
                    nuxt.render(ctx.req, ctx.res, promise => {
                        // nuxt.render passes a rejected promise into callback on error.
                        promise.then(resolve).catch(reject)
                    })
                })
            }
        });

        // 注册一个插件路由入口
        app.use(await pluginRouter({
            pluginDir: 'server/plugins',
            pluginFile: 'plugin.js'
        }));

        await new Promise((resolve) => {
            app.listen(port, resolve);
        })

        // try {
        //
        // } catch ( e ) {
        //     /**
        //      * 拦截系统抛出的异常错误，进行日志记录，并给予合适的响应。
        //      * */
        //     console.error();
        //     console.error(e);
        //     console.error();
        // }
    }

}


module.exports = new Server();