/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const chalk = require('chalk');
const isJSON = require('is-json');
const fs = require('fs');
const path = require('path');

module.exports.produceSubCommandInfo = function (subCommand, handler) {
  let subCommandInfo = {
    name: subCommand.name,
    describe: subCommand.describe,
    handler: (argv) => {
      try {
        let ret = handler(argv);
        if (ret) {
          if (ret instanceof Promise) {
            ret.then((result) => {
              if (result instanceof Object) {
                if (isJSON(result, true)) {
                  result = JSON.stringify(result);
                }
              }
              console.log(result);
            }).catch(reason => {
              process.exitCode = -1;

              if (reason instanceof Error) {
                console.error(chalk.red(reason.stack));
              } else {
                if (reason instanceof Object) {
                  if (isJSON(reason, true)) {
                    reason = JSON.stringify(reason);
                  }
                }
                console.error(chalk.red(reason));
              }
            });
          }
          else {
            console.log(ret);
          }
        }
      } catch (error) {
        process.exitCode = -1;
        console.error(chalk.red(error.stack));
      }
    }
  };

  if (subCommand.args) {
    subCommand.args.forEach((value, index) => {
      value.options.describe = chalk.green(value.options.describe);
      if (value.options.flags) {
        if (index !== (subCommand.args.length - 1)) {
          console.error(chalk.red(`[ERROR]:register \`${subCommand.name}\` sub-command failed, ` +
            `variadic/optional parameter \`${value.name}\` must be at last position!`));
          process.exit(-1);
        }
      }
    });
    subCommandInfo.args = subCommand.args;
  }

  return subCommandInfo;
};

module.exports.FLAGS = {
  OPTIONAL: 0x1,
  VARIADIC: 0x2
};

const compareInputs = (inputsAbi, inputs) => {
  if (inputsAbi.length !== inputs.length) {
    return false;
  }

  for (let i = 0; i < inputsAbi.length; ++i) {
    if (inputs[i] !== inputsAbi[i].type) {
      return false;
    }
  }

  return true;
};

module.exports.getAbi = function (contractName, functionName, inputs, ContractsOutputDir) {
  if (contractName.endsWith('.sol')) {
    contractName = path.basename(contractName, '.sol');
  }

  let outputDir = ContractsOutputDir
  let abiPath = path.join(outputDir, `${contractName}.abi`);

  if (!fs.existsSync(abiPath)) {
    return null;
  }

  let abi = JSON.parse(fs.readFileSync(abiPath));
  if (functionName) {
    if (inputs && inputs.length > 0) {
      return abi.find((item) => {
        return item.type === 'function' && item.name === functionName && compareInputs(item.inputs, inputs);
      });
    } else {
      return abi.find((item) => {
        return item.type === 'function' && item.name === functionName;
      });
    }
  }

  return abi;
};