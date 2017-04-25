//处理接受广播消息的服务端
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const redis = require('redis');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
app.keys = ['keys', 'keykeys'];
const store = redisStore({
  // Options specified here
});

app.use(bodyParser());

app.use(session({
  store: store
}));

app.use(function *() {
  switch (this.path) {
    case '/':
      this.body = '欢迎访问消息推送系统';
      break;
    case '/push':
      console.log(this.method, this.request.body);
      if(push(this.request.body)) {
        this.body = '推送成功';
      } else {
        this.body = '推送失败';
      }
      break;
    case '/get':
      let _this = this;
      _this.body = _this.body || '';
      let getList = get.call(_this);
      yield getList.then((arr) => {
        arr.forEach(function (value) {
          _this.body += `message: ${value.data} event: ${value.event}\n`;
        });
      });

      break;
    case '/clear':
      yield regenerate.call(this);
      break;
    default:
      this.body = '404 页面不存在';
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

async function get() {
  const length = await store.client.llen('queue');
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(JSON.parse(await store.client.lindex('queue', i)));
  }
  return arr;
}

function *regenerate() {
  //yield this.regenerateSession();
  this.body = '队列已清空';
}

app.listen(3000);