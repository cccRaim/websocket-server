const socketIo = require('socket.io');

const MessageHandle = {
  init(server) {
    this.io = socketIo(server);
    this.ioListen();
    return this.io;
  },

  ioListen() {
    this.io.on('connection', function (socket) {
      console.log('新的连接已连接到系统' + socket.id);
      socket.emit('news', { hello: 'world' });
    });
  }
};

module.exports = MessageHandle;