const socketIo = require('socket.io');
const colors = require('colors');
const MessageHandle = {
  init(server) {
    this.io = socketIo(server);
    this.ioListen();
    return this.io;
  },

  ioListen() {
    this.io.on('connection', function (socket) {
      console.log(`新的连接已连接到系统${socket.id}`.blue);
      socket.emit('news', { hello: 'world' });
      socket.on('test', function (data) {
        console.log(data);
      });
    });
  }
};

module.exports = MessageHandle;