const { timer } = require("rxjs");

const logger = async function (ctx, next) {
  let res = ctx.res;
  let url = ctx.url
  // // 拦截操作请求 request
  // console.log(`请求: ${ctx.method} ${ctx.url}`);

  await next();

  // 拦截操作响应 request
  let msg = "";
  if (ctx.response.body != undefined) {
    msg = ctx.response.body.msg;
  }
  res.on('finish', () => {
    console.log(`${ctx.method} ${url} \t ${ctx.response.status} \t ${msg}`);
  });
};

module.exports = logger