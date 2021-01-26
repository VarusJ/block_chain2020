const {
  Web3jService, Configuration, ConsensusService,
  SystemConfigService,
  CompileService,
} = require('../packages/api/index')
const decode = require('../packages/api/decoder');

const {
  produceSubCommandInfo,
  FLAGS,
  getAbi
} = require('../packages/cli/interfaces/base');
const {
  check,
  Str,
  Addr,
  Any
} = require('../packages/api/common/typeCheck');

const path = require('path');
const fs = require('fs');
const { call } = require('./api');

const configFile = path.join(process.cwd(), 'packages/cli/conf/config.json');
const config = new Configuration(configFile);
const web3jService = new Web3jService(config);
const consensusService = new ConsensusService(config);
const systemConfigService = new SystemConfigService(config);
const compileService = new CompileService(config);


module.exports = {
  init: async (contractName, contractAddress) => {
    let argv = {}
    argv.contractName = contractName;
    argv.contractAddress = contractAddress;
    let conf = web3jService.config.accounts["微众银行"];
    argv.parameters = [conf.address, "微众银行"];
    argv.function = "registerBank";
    let res = await call(argv);
    console.log(`微众银行: ${conf.address} 注册成功`)

    conf = web3jService.config.accounts["字节跳动"];
    argv.parameters = [conf.address, "字节跳动"];
    argv.function = "registerCompany";
    res = await call(argv);
    console.log(`字节跳动: ${conf.address} 注册成功`)

  }
}