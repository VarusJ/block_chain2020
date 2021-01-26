const TransactionCtrl = require('../controllers/transaction')

const { exportRtr } = require('../utils')
const Router = require("koa-express-router");
const router = new Router();
module.exports = exportRtr(router)

router.route('/').post(TransactionCtrl.executeTransaction)
router.route('/byhash').get(TransactionCtrl.getTransactionByHash)
router.route('/byblockhashandindex').get(TransactionCtrl.getTransactionByBlockHashAndIndex)

