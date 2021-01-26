const { getTransactionByHash, getTransactionByBlockHashAndIndex, call } = require('../services/api')
const { sendData } = require('../utils/index')
const { async } = require('rxjs')

module.exports = {
  getTransactionByHash: async (ctx, next) => {
    const { transactionHash } = ctx.request.query
    const res = await getTransactionByHash(transactionHash)
    return sendData(ctx, res, 'OK', '根据交易哈希查询交易信息', 200)
  },
  getTransactionByBlockHashAndIndex: async (ctx, next) => {
    const { blockHash, transactionIndex } = ctx.request.query
    const res = await getTransactionByBlockHashAndIndex(blockHash, transactionIndex)
    return sendData(ctx, res, 'OK', '根据区块哈希和交易序号查询的交易信息', 200)
  },
  executeTransaction: async (ctx, next) => {
    const argv = ctx.request.body;
    /**
     * argv = {
     *    "contractAddress": 
     *    "contractName":
     *    "function":
     *    "parameters"
     * }
     */

    console.log(argv)
    const res = await call(argv);
    return sendData(ctx, res, 'OK', 'transaction Action excuted!', 200);
  }
  // sendTransaction: async (ctx, next){
  //   const argv = ctx.request.body;
  //   try {
  //     (publicKey, privateKey, func, params) 
  //     const ret = await sendRawTransactionUsingCustomCredentials(
  //       CONTRACT_ADDRESS,
  //       CONTRACT_ABI,
  //       publicKey,
  //       getPrivateKey(privateKey),
  //       func,
  //       params,
  //     );

  //     return ret;
  //   } catch (err) {
  //       return err
  //   }
  // }
  
}