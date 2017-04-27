module.exports = {
  server: {
    port: 3000
  },
  ws: {
    port: 8001,
    processPort: [
      8001,
      8002,
      8003,
      8004,
    ]
  },
  broker: {
    port: 9000
  }
};