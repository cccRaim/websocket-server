//处理WebSocket连接服务端
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

app.use(serve('./dist'));

const server = require('http').Server(app.callback());

const io = messageHandle.init(server);

store.client.on("message", function (channel, message) {
  message = JSON.parse(message);
  console.log("sub channel " + channel + ": " + message.data + " - " + message.event);
  io.emit(message.event, message);
});
store.client.subscribe("messages");
console.log(`开始处理队列消息`.yellow);

server.listen(port);

console.log(`WebSocket服务器已在localhost:${port}上部署`.green);