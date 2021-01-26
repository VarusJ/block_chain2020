const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const { default: route } = require('./routers')
const logger = require('./utils/logger')
const app = new Koa()

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
});
app.use(bodyParser())
app.use(logger)
route(app)
app.listen(8000)
console.log('listening at port 8000')