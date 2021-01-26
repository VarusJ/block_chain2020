const BlockCtrl = require('../controllers/block')
const { exportRtr } = require('../utils')

const Router = require("koa-express-router");
const router = new Router();
module.exports = exportRtr(router)

router.route('/byhash').get(BlockCtrl.getBlockByHash)
router.route('/bynumber').get(BlockCtrl.getBlockByNumber)
router.route('/hash').get(BlockCtrl.getBlockHashByNumber)