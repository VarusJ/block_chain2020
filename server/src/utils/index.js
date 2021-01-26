module.exports = {
  sendData: async (ctx, data, status = 'OK', msg = 'OK', code = 200) => {
    ctx.status = code;
    const time = new Date();
    ctx.body = { status, msg, data, time };
  },
  exportRtr: (router) => {
    return router.routes();
  },
  handleError: async (ctx, e) => {
    const { status = 'UNKNOWN_ERROR', msg = '未知错误', code = 500 } = e.info || {};
    if (ctx.paramData) {
      ctx.paramData.extraMsg = getExtraMsg(e);
    }
    report.seErr(ctx, ErrType.CAUGHT, status, msg, e);
    ctx.status = code;
    const time = new Date();
    ctx.body = { status, msg, time };
    if (!isInProd) assign(ctx.body, { stack: e.stack });
  }
}