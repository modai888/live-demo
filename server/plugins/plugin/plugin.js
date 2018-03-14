'use strict';

const routes = require('./routes');

module.exports = {
    name: 'plugin',
    version: '1.0.0',

    register(server, options) {
        // 自定义注册逻辑

        // 返回本插件的路由数据
        return routes(server);
    }
}