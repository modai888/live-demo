'use strict';


module.exports = {
    name: 'api-users',
    version: '1.0.0',

    register(server, options) {
        // 注册路由
        return [
            {
                path: '/',
                get: (ctx) => { ctx.body = 'get user list' },
                put: (ctx) => { ctx.body = 'add a user' }
            },
            {
                path: '/:user',
                get: (ctx) => { ctx.body = 'get a user named :' + ctx.params.user },
                post: ctx => { ctx.body = 'update a user named :' + ctx.params.user}
            }
        ]
    }
}