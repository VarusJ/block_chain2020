const { sendData } = require("../utils");
const { init } = require('../services/init')
const { getAllAccounts } = require("../services/account");

module.exports = {
  getAccounts: async (ctx, next) => {
    const res = await getAllAccounts();
    return sendData(ctx, res, 'OK', '获取全部账户成功', 200);
  },
  register: async (ctx, next) => {
    const { contractName, contractAddress } = ctx.request.body
    await init(contractName, contractAddress);
    return sendData(ctx, {}, 'OK', '注册成功', 200);
  },
}