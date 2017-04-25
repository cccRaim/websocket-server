const router = require('koa-router')();

router
  .get('/', function *(next) {
    this.body = 'it\'s index page!';
  })
  .post('/ws', function *(next) {
    // ...
  });

module.exports = router;