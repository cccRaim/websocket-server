//处理websocket连接服务端
const Koa = require('koa');

const app = new Koa();

const server = require('http').Server(app.callback());

const io = require('socket.io')(server);

const router = require('./routes');

app.listen(8080);

io.on('connection', function (socket) {
  console.log('新的连接已连接到系统');
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});