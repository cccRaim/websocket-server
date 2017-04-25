//处理接受广播消息的服务端
const Koa = require('koa');

const app = new Koa();

/*
app.use(function *(){
  this.body = 'Hello World';
});
*/

io.on('connection', function(socket) {
  socket.emit('news', { hello: 'world' });
  console.log('it works.');
});


app.listen(3000);