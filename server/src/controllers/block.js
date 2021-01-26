const { sendData } = require("../utils");
const { getBlockByHash, getBlockByNumber, getBlockHashByNumber } = require('../services/api')

module.exports = {
  getBlockByHash: async (ctx, next) => {
    const { hash, includeTransactions } = ctx.request.query
    let it = includeTransactions == '1' ? true : false
    const res = await getBlockByHash(hash, it)
    return sendData(ctx, res, 'OK', '获取根据区块哈希查询得到的区块信息', 200)
  },
  getBlockByNumber: async (ctx, next) => {
    const { blockNumber, includeTransactions } = ctx.request.query
    let it = includeTransactions == '1' ? true : false
    console.log(ctx.request.query)
    const res = await getBlockByNumber(blockNumber, it)
    return sendData(ctx, res, 'OK', '获取根据区块高度查询的区块信息', 200)
  },
  getBlockHashByNumber: async (ctx, next) => {
    const { blockNumber } = ctx.request.query
    const res = await getBlockHashByNumber(blockNumber)
    return sendData(ctx, res, 'OK', '根据区块高度查询区块哈希', 200)
  },
}