const colors = require('colors');
const childProcess = require('child_process');
const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const config = require('./config');

app.use(serve('./dist'));

config.ws.processPort.forEach((value) => {
  const child = childProcess.fork('./service.js', [value]);
  console.log('child pid: ' + child.pid);
});

console.log(`进程已创建完毕`.blue);

app.listen(config.server.port);
console.log(`web服务器已经部署在localhost:${config.server.port}`.blue);

