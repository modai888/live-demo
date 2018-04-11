/**
 * 插件化路由，基于koa-router
 *
 *
 * */
const path = require('path');
const Router = require('koa-router');
const compose = require('koa-compose');
const glob = require('glob');
const debug = require('debug')('pluginRouter');

const _installedPlugins = {};
const _installedRouters = [];

exports = module.exports = pluginRouter;

async function pluginRouter(app, opts) {
    opts = opts || {};

    // 实现插件动态化路由的核心中间件
    let _routerMiddleware = (ctx, next) => {
        next()
    }, _pluginRouters = [];

    // 插件存放目录，绝对路径表示
    opts.pluginDir = path.resolve(process.cwd(), opts.pluginDir || "server/plugins");
    opts.pluginFile = opts.pluginFile || 'plugin.js';

    // 初始化加载已经存在的插件
    let pluginPath = path.normalize(opts.pluginDir + '/**/' + opts.pluginFile);
    let plugins = glob.sync(pluginPath);
    for (let plugin of plugins) {
        // get plugin base path
        plugin = plugin.replace(/\//g, path.sep);
        let pluginPrefix = plugin.split(opts.pluginDir)[1].split(opts.pluginFile)[0];
        let pluginFile = path.resolve('.', plugin);

        try {
            // require plugin.js file
            let plug = require(pluginFile);
            // 插件访问前缀
            plug.prefix = plugin.prefix || pluginPrefix;
            // install plugin
            await registerPlugin(plug);
        } catch (e) {
            debug('plugin %s 注册失败 %O', plugin, e);
            console.log(`plugin: ${plugin} 注册失败: ` + e);
        }
    }

    return async function (ctx, next) {
        // 挂载
        // ctx.installPlugin
        return _routerMiddleware(ctx, next)
    };

    // 注册单个插件
    async function registerPlugin(plugin) {
        if (!plugin || typeof plugin !== 'object') {
            return
        }

        // 如果已经安装
        if (_installedPlugins[plugin.name]) return;

        // 调用插件的注册方法，获取插件路由
        if (typeof plugin.register === 'function') {
            // 定义插件请求服务的前缀
            let prefix = plugin.prefix || plugin.name;

            let routes = await plugin.register.call(plugin, prefix);

            // 为插件生成独立路由
            generateRouterForPlugin(prefix, routes);
        }

        _installedPlugins[plugin] = true;
    }

    function generateRouterForPlugin(prefix, routes) {
        if (!routes.length) return;

        prefix = prefix.replace(/\\/g, '/');
        if (prefix && prefix.slice(0, 1) !== '/') {
            prefix = '/' + prefix;
        }

        if (prefix && prefix.slice(-1) === '/') {
            prefix = prefix.slice(0, -1);
        }

        let router = new Router({ prefix });

        let keys = ['use', 'all'].concat(router.methods);
        routes.forEach(route => {
            let path = route.path || '';
            keys.forEach(m => {
                m = m.toLowerCase();
                if (route[m]) {
                    router[m].call(router, path, route[m]);
                }
            })
        });

        // 组合成新的中间件
        _pluginRouters.push(router);
        _routerMiddleware = compose([].concat.apply([],
            _pluginRouters.map((r) => {
                return [r.routes(), r.allowedMethods()];
            })
        ));
    }
}

