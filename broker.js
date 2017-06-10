//处理接受广播消息的服务端
const redisStore = require('koa-redis');
const Koa = require('koa');
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const colors = require('colors');
const config = require('./config');

const port = config.broker.port;

const app = new Koa();

app.use(cors());

const store = redisStore({
  // Options specified here
  host: '10.154.209.125',
  port: 6379
});

app.use(bodyParser());

app.use(async (ctx, next) => {
  switch (ctx.path) {
    case '/':
      ctx.body = '欢迎访问消息推送系统';
      break;
    case '/push':
      console.log(ctx.method, ctx.request.body);
      if(push(ctx)) {
        ctx.body = '推送成功';
      } else {
        ctx.body = '推送失败';
      }
      break;
    default:
      ctx.body = '404 页面不存在';
      break;
  }

});

function push(ctx) {
  const body = ctx.request.body;
  let message = {
    data: body.data || '',
    event: body.event || 'default',
    time: new Date()
  };
  return store.client.publish("messages", JSON.stringify(message));
}

app.listen(config.broker.processPort[0]);
console.log(`推送系统服务器已部署在localhost:${port}`.green);
