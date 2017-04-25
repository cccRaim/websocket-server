//处理接受广播消息的服务端
const redisStore = require('koa-redis');
const redis = require('redis');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const colors = require('colors')

const port = 3000;

const app = new Koa();
const store = redisStore({
  // Options specified here
});

app.use(bodyParser());

app.use(async (ctx, next) => {
  switch (ctx.path) {
    case '/':
      ctx.body = '欢迎访问消息推送系统';
      break;
    case '/push':
      console.log(ctx.method, ctx.request.body);
      if(push(ctx.request.body)) {
        ctx.body = '推送成功';
      } else {
        ctx.body = '推送失败';
      }
      break;
    case '/get':
      ctx.body = ctx.body || '';
      await get(ctx).then((arr) => {
        arr.forEach(function (value) {
          ctx.body += `message: ${value.data} event: ${value.event}\n`;
        });
      });

      break;
    case '/clear':
      await regenerate(ctx);
      break;
    default:
      ctx.body = '404 页面不存在';
      break;
  }

});

function push(body) {
  let message = {
    data: body.data || '',
    event: body.event || 'default',
    time: new Date()
  };
  return store.client.rpush('queue', JSON.stringify(message));
}

async function get(ctx) {
  const result = await store.client.lrange('queue', 0, -1);
  return result.map((value) => JSON.parse(value));
}

async function regenerate(ctx) {
  await store.client.ltrim('queue', 1, 0);
  ctx.body = '队列已清空';
}

app.listen(port);
console.log(`Server is started at localhost:${port}`.green);