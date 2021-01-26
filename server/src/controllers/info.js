const { getObserverList, getBlockNumber, getSealerList, getConsensusStatus, getSyncStatus, getClientVersion, getNodeIDList, getGroupList, getBlockByHash, getBlockByNumber, getBlockHashByNumber, getTransactionByHash, getTransactionByBlockHashAndIndex, getGroupPeers } = require("../services/api");
const { init } = require('../services/init')
const { sendData } = require("../utils");


module.exports = {
  getBlockNumber: async (ctx, next) => {
    const res = await getBlockNumber();
    return sendData(ctx, res, 'OK', '获取最新块高成功', 200);
  },
  getObserveList: async (ctx, next) => {
    const res = await getObserverList();
    return sendData(ctx, res, 'OK', '获取观察者节点列表成功', 200);
  },
  getSealerList: async (ctx, next) => {
    const res = await getSealerList();
    return sendData(ctx, res, 'OK', '获取观察者节点列表成功', 200);
  },
  getConsensusStatus: async (ctx, next) => {
    const res = await getConsensusStatus();
    return sendData(ctx, res, 'OK', '获取区块链节点共识标识', 200);
  },
  getSyncStatus: async (ctx, next) => {
    const res = await getSyncStatus();
    return sendData(ctx, res, 'OK', '获取区块链节点同步状态', 200);
  },
  getClientVersion: async (ctx, next) => {
    const res = await getClientVersion();
    return sendData(ctx, res, 'OK', '获取区块链版本信息', 200);
  },
  getNodeIDList: async (ctx, next) => {
    const res = await getNodeIDList()
    return sendData(ctx, res, 'OK', '获取节点及其连接节点的列表', 200)
  },
  getGroupPeers: async (ctx, next) => {
    const res = await getGroupPeers()
    return sendData(ctx, res, 'OK', '获取节点所属的群组的群组ID列表', 200)
  },
  getGroupList: async (ctx, next) => {
    const res = await getGroupList()
    return sendData(ctx, res, 'OK', '获取节点所属的群组的群组ID列表', 200)
  },
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
  getTransactionByHash: async (ctx, next) => {
    const { transactionHash } = ctx.request.query
    const res = await getTransactionByHash(transactionHash)
    return sendData(ctx, res, 'OK', '根据交易哈希查询交易信息', 200)
  },
  getTransactionByBlockHashAndIndex: async (ctx, next) => {
    const { blockHash, transactionIndex } = ctx.request.query
    const res = await getTransactionByBlockHashAndIndex(blockHash, transactionIndex)
    return sendData(ctx, res, 'OK', '根据区块哈希和交易序号查询的交易信息', 200)
  }
}