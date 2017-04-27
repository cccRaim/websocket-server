module.exports = {
  /**
   * Before connection (optional, just for faye)
   * @param {client} client connection
   */
  beforeConnect : function(client) {
    // Example:
    // client.setHeader('Authorization', 'OAuth abcd-1234');
    // client.disable('websocket');
  },

  /**
   * On client connection (required)
   * @param {client} client connection
   * @param {done} callback function(err) {}
   */
  onConnect : function(client, done) {
    console.log(client.id + '开始连接');
    //client.emit('test', { hello: 'world' });
    done();
  },

  /**
   * Send a message (required)
   * @param {client} client connection
   * @param {done} callback function(err) {}
   */
  sendMessage : function(client, done) {
    client.emit('test', { hello: 'world', id: client.id });
    done();
  }
};