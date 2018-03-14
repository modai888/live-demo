'use strict';


module.exports = {
    name: 'api-orders',
    version: '1.0.0',

    register(server, options) {
        // 注册路由
        return [
            {
                path: '/',
                get: (ctx) => { ctx.body = 'get order list' },
                put: (ctx) => { ctx.body = 'add an order' }
            },
            {
                path: '/:order',
                get: (ctx) => { ctx.body = 'get an order named :' + ctx.params.order },
                post: ctx => { ctx.body = 'update an order named :' + ctx.params.order }
            }
        ]
    }
}