'use strict';

const { EventEmitter } = require('events');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');
const compose = require('koa-compose');

// global koa instance
const app = new Koa();

// catch global exception
app.on('error', (error) => {
    console.error('globa error: ' + error);
})

class Server extends EventEmitter {
    /**
     * 构造器
     */
    constructor(opts) {
        super();

        this._plugins = {};
        this._routers = [];

        let route = (ctx, next) => { next(); };
        this._pluginRoute = route;
    }

    get app() {
        return app;
    }

    async start(port) {
        try {
            this.emit('beforeStart');
            // 注册插件
            await this.installPlugins();

            // 注册一个插件路由入口
            app.use(async (ctx, next) => {
                return this._pluginRoute(ctx, next);
            });

            await new Promise((resolve) => {
                app.listen(port, resolve);
            })

        } catch (e) {
            console.error(e);
        }
    }

    async installPlugins() {
        let plugins = glob.sync('server/plugins/**/plugin.js')

        for (let plugin of plugins) {
            // get plugin base path
            let pluginPrefix = plugin.split('server/plugins/')[1].split('/plugin.js')[0];
            let pluginFile = path.resolve('.', plugin);

            try {
                // require plugin.js file
                let plug = require(pluginFile);
                // 插件访问前缀
                plug.prefix = plugin.prefix || pluginPrefix;
                // install plugin
                await this.install(plug);
            } catch (e) {
                console.log(`plugin: ${plugin} 注册失败: ` + e);
            }
        }
    }

    async install(plugin) {
        // 判断是否已经安装
        if (this._plugins[plugin.name]) return;

        let prefix = plugin.prefix || plugin.name
        // 注册组件
        let routes = await plugin.register(this, {
            prefix
        });

        // 注册插件路由
        this.setRoutes(prefix, routes)

        this._plugins[plugin] = true;
    }

    setRoutes(prefix, routes) {
        if (!routes.length) return;

        if (prefix && prefix.slice(0, 1) !== '/') {
            prefix = '/' + prefix;
        }

        let router = new Router({
            prefix: prefix || ''
        });

        routes.forEach(route => {
            let path = route.path || '';

            Object.keys(route).forEach((m) => {
                if (typeof router[m] === 'function') {
                    router[m].call(router, path, route[m]);
                }
            })
        });

        // 组合成新的中间件
        this._routers.push(router);
        this._pluginRoute = compose([].concat.apply([],
            this._routers.map((r) => {
                return [r.routes(), r.allowedMethods()];
            })
        ));
    }

}


module.exports = new Server();