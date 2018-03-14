'use strict';

let _server;

module.exports = function routes(server) {
    _server = server;

    return [
        {
            path: '/install',
            get: installPlugin
        }
    ]
}


async function installPlugin(ctx) {
    let mockplug = {
        name: 'dynamic-plugin',
        version: '1.0.0',

        register(server, options) {
            // 注册路由
            server.setRoutes('/dynamic', [
                {
                    path: '/',get:(ctx)=>{ctx.body='this page is from dynamic route'}
                }
            ]);
        }
    }

    await _server.install(mockplug);
    ctx.body = 'install success'
}