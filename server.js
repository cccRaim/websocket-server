//处理websocket连接服务端
const fs = require('fs');
const Koa = require('koa');
const redisStore = require('koa-redis');
const colors = require('colors');
const app = new Koa();
const serve = require('koa-static');
const messageHandle = require('./MessageHandle');
const port = 8080;
const store = redisStore({
  // Options specified here
});

let readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, {'encoding': 'utf8'}, function(error, data) {
      if (error) reject(error);
      resolve(data);
    });
  });
};

app.use(serve('./dist'));

const server = require('http').Server(app.callback());

const io = messageHandle.init(server);

server.listen(port);

console.log(`WebSocket服务器已在localhost:${port}上部署`.green);