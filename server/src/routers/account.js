const { exportRtr } = require('../utils')
const AccountRtr = require('../controllers/account')
const Router = require("koa-express-router");

const router = new Router();
module.exports = exportRtr(router)

router.route('/').get(AccountRtr.getAccounts)
router.route('/register').post(AccountRtr.register)



