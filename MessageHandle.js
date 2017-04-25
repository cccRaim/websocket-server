const socketIo = require('socket.io');

const MessageHandle = {
  init(server) {
    this.io = socketIo(server);
    this.ioListen();
    return this.io;
  },

  ioListen() {
    this.io.on('connection', function (socket) {
      console.log('新的连接已连接到系统');
      socket.emit('news', { hello: 'world' });
      socket.on('my other event', function (data) {
        console.log(data);
      });
    });
  }
};

module.exports = MessageHandle;