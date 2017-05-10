//处理WebSocket连接服务端
const fs = require('fs');
const Koa = require('koa');
const redisStore = require('koa-redis');
const colors = require('colors');
const app = new Koa();
const messageHandle = require('./MessageHandle');
const port = process.argv[2];
const store = redisStore({
  // Options specified here
});

const server = require('http').Server(app.callback());

const io = messageHandle.init(server);

//Redis的sub/pub处理
store.client.on("message", handleRedisMessage);
store.client.subscribe("messages"); //订阅messages频道的消息，与broker发送的频道一致
/**
 * 处理Redis的消息
 * @param channel
 * @param message
 */
function handleRedisMessage(channel, message) {
  message = JSON.parse(message);
  console.log("sub channel " + channel + ": " + message.data + " - " + message.event);
  io.emit(message.event, message);
}

server.listen(port);

console.log(`pid: ${process.pid} - WebSocket服务器已在localhost:${port}上部署`.green);
