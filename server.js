const server = require('./server/app');

/**
 * 获取一些启动配置选项
 */

const port = process.env.LIVE_DEMO_PORT || 2333;



/**
 *  Event: beforeStart
 *  执行一些应用启动前的操作，比如根据当前开发环境添加不同的处理中间件
 *  server.app.use();
 */

server.on('beforeStart', () => {
  console.log('log::beforeStart');

  // server.app.use(async ctx => {
  //   ctx.body = 'hello';
  // })
});


/**
 * start the server;
 */

(async () => {
  await server.start(port);
  console.log('The app is runing on port:' + port);
})();

