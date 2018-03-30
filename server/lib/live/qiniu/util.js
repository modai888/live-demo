'use strict'

const crypto = require('crypto')
const debug = require('debug')('Qiniu-api')

// Hmac-sha1 Crypt
exports.hmacSha1 = function (encodedFlags, secretKey) {
    /*
     *return value already encoded with base64
     * */
    var hmac = crypto.createHmac('sha1', secretKey);
    hmac.update(encodedFlags);
    return hmac.digest('base64');
}

exports.base64ToUrlSafe = function(v) {
    return v.replace(/\//g, '_').replace(/\+/g, '-');
}

// 创建 AccessToken 凭证
// @param mac            AK&SK对象
// @param requestURI     请求URL
// @param reqMethod      请求方法，例如 GET，POST
// @param reqContentType 请求类型，例如 application/json 或者  application/x-www-form-urlencoded
// @param reqBody        请求Body，仅当请求的 ContentType 为 application/json 或者
//                       application/x-www-form-urlencoded 时才需要传入该参数
exports.generateAccessTokenV2 = function (mac, requestURI, reqMethod, reqContentType, reqBody) {
    let u = url.parse(requestURI);
    let path = u.path;
    let query = u.query;
    let host = u.host;
    let port = u.port;

    let access = reqMethod.toUpperCase() + ' ' + path;
    if ( query ) {
        access += '?' + query;
    }
    // add host
    access += '\nHost: ' + host;
    // add port
    if ( port ) {
        access += ':' + port;
    }

    // add content type
    if ( reqContentType && (reqContentType === "application/json" || reqContentType === "application/x-www-form-urlencoded") ) {
        access += '\nContent-Type: ' + reqContentType;
    }

    access += '\n\n';

    // add reqbody
    if ( reqBody ) {
        access += reqBody;
    }

    debug('access token: %s', access)

    let digest = exports.hmacSha1(access, mac.secretKey);
    let safeDigest = exports.base64ToUrlSafe(digest);
    return 'Qiniu ' + mac.accessKey + ':' + safeDigest;
}