const io = require('socket.io-client');
const config = require('../config');

const socket = io(`ws://server.com:${config.ws.port}`, {
  "transports": ['websocket', 'polling']
});
console.log('开始获取推送');
socket.on('danmaku', function (data) {
  console.log(data);
});