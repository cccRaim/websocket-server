//处理websocket连接服务端
const fs = require('fs');
const Koa = require('koa');
const redisStore = require('koa-redis');
const colors = require('colors');
const app = new Koa();
const port = 8080;
const store = redisStore({
  // Options specified here
});

let readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, {'encoding': 'utf8'}, function(error, data) {
      if (error) reject(error);
      resolve(data);
    });
  });
};

const server = require('http').Server(app.callback());

const io = require('./MessageHandle').init(server);

app.use(async (ctx, next) => {
  switch (ctx.path) {
    case '/':
      await render(ctx, 'index.html');
      break;
    case '/app.js':
      await render(ctx, 'app.js');
      break;
    default:

  }
});

async function render (ctx, src) {
  let data = await readFile(__dirname + '/dist/' + src).catch((err) => {
    console.error(err);
    ctx.status = 500;
    ctx.body = 'Error loading index.html';
  });

  if(!data) return;

  ctx.status = 200;
  ctx.body = data;
}

app.listen(port);

console.log(`WebSocket服务器已在localhost:${port}上部署`.green);