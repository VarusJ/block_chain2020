const {
  Web3jService, Configuration, ConsensusService,
  SystemConfigService,
  CompileService,
} = require('../packages/api/index')

const { async } = require("rxjs");
const path = require('path')
const configFile = path.join(process.cwd(), 'packages/cli/conf/config.json');
const config = new Configuration(configFile);

module.exports = {
  getAllAccounts: async () => {
    return config.accounts;
  }
}