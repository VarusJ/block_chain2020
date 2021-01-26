const { exportRtr } = require('../utils')
const ContractCtrl = require('../controllers/contract')

const Router = require("koa-express-router");
const router = new Router();
module.exports = exportRtr(router)

router
  .route('/')
  .post(ContractCtrl.deploy)
  .get(ContractCtrl.getAllContract)


