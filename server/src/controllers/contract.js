const { async } = require("rxjs");
const { deploy, call, getAllContract } = require("../services/api");
const { sendData } = require("../utils");


module.exports = {
  deploy: async (ctx, next) => {
    const { contract, parameters } = ctx.request.body;
    let res = await deploy(contract, parameters)
    return sendData(ctx, res, 'OK', 'Contract deployed!', 200)
  },

  call: async (ctx, next) => {
    const argv = ctx.request.body;
    let res = await call(argv)
    return sendData(ctx, res, 'OK', 'Action excuted!', 200)
  },

  getAllContract: async (ctx, next) => {
    const res = await getAllContract();
    return sendData(ctx, res, 'OK', 'All contracts deployed!', 200)
  }
}