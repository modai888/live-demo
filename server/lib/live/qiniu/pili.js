/**
 * 七牛直播云服务访问接口
 *
 * author: wangxuebo
 * */

'use strict'

const axios = require('axios')

const request = axios.create({
    baseUrl: 'http://pili.qiniuapi.com'
});


/**
 * 创建直播流
 * */
exports.createStream = function (hub, streamTitle) {
    let data = { key: streamTitle }
}
