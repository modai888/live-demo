'use strict';


module.exports = {
    name: 'live',
    version: '',

    register(server, options) {
        // 注册路由
        return [
            {
                path: '/rooms',
                get: (ctx) => { ctx.body = 'get live/rooms' },
                post: (ctx) => { ctx.body = 'post live/rooms' }
            },
            {
                path: '/zhibo',
                get: (ctx) => { ctx.body = 'get live/zhibo' }
            }
        ]
    }
}