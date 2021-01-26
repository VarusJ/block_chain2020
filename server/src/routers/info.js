const { exportRtr } = require('../utils')
const StageOneCtrl = require('../controllers/info')
const Router = require("koa-express-router");

const router = new Router();
module.exports = exportRtr(router)

router.route('/blocknumber').get(StageOneCtrl.getBlockNumber)

router.route('/observelist').get(StageOneCtrl.getObserveList)

router.route('/sealerlist').get(StageOneCtrl.getSealerList)

router.route('/consensusstatus').get(StageOneCtrl.getConsensusStatus)

router.route('/syncstatus').get(StageOneCtrl.getSyncStatus)

router.route('/clientversion').get(StageOneCtrl.getClientVersion)

router.route('/nodeidlist').get(StageOneCtrl.getNodeIDList)

router.route('/grouppeers').get(StageOneCtrl.getGroupPeers)

router.route('/grouplist').get(StageOneCtrl.getGroupList)

router.route('/blockinfobyhash').get(StageOneCtrl.getBlockByHash)

router.route('/blockinfobynumber').get(StageOneCtrl.getBlockByNumber)

router.route('/blockhashbynumber').get(StageOneCtrl.getBlockHashByNumber)

router.route('/transinfobyhash').get(StageOneCtrl.getTransactionByHash)

router.route('/transinfobyhashandindex').get(StageOneCtrl.getTransactionByBlockHashAndIndex)


