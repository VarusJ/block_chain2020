const path = require('path');
const Configuration = require('../nodejs-sdk/packages/api/common/configuration').Configuration;
const utils = require('../nodejs-sdk/packages/api/common/utils')
const web3Utils = require('../nodejs-sdk/packages/api/common/web3lib/utils')
const PEM = require('../nodejs-sdk/node_modules/pem-file')

Configuration.setConfig(path.join(__dirname, '../../nodejs-sdk/packages/cli/conf/config.json'));
const Web3jService = require("../nodejs-sdk/packages/api/web3j").Web3jService;
const web3jService = new Web3jService();

const CONTRACT_ADDRESS = '0x48b62d37c2052dc04df35ef5ca6fab524328209a';
const CONTRACT_ABI = [
    {
      "constant": false,
      "inputs": [
        {
          "name": "addr",
          "type": "address"
        },
        {
          "name": "creditLevel",
          "type": "uint256"
        }
      ],
      "name": "addOrganization",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "debtor",
          "type": "address"
        }
      ],
      "name": "payback",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "numOfOrganizations",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "organizations",
      "outputs": [
        {
          "name": "isValid",
          "type": "bool"
        },
        {
          "name": "addr",
          "type": "address"
        },
        {
          "name": "creditLevel",
          "type": "uint256"
        },
        {
          "name": "amount",
          "type": "uint256"
        },
        {
          "name": "bond_amount",
          "type": "uint256"
        },
        {
          "name": "debt_amount",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "creditTable",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "A",
          "type": "address"
        },
        {
          "name": "C",
          "type": "address"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "debtee",
          "type": "address"
        },
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "signature",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "finance",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "getAmount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "addr",
          "type": "address"
        },
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "addAmount",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "bankAddr",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "ret",
          "type": "int256"
        },
        {
          "indexed": false,
          "name": "addr",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "creditLevel",
          "type": "uint256"
        }
      ],
      "name": "AddOrganizationEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "ret",
          "type": "int256"
        },
        {
          "indexed": false,
          "name": "addr",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "AddAmountEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "addr",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "bond",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "debt",
          "type": "uint256"
        }
      ],
      "name": "GetAmountEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "debtor",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "debtee",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "SignatureEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "ret",
          "type": "int256"
        },
        {
          "indexed": false,
          "name": "sponsor",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "src",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "dest",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amout",
          "type": "uint256"
        }
      ],
      "name": "TransferEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "ret",
          "type": "int256"
        },
        {
          "indexed": false,
          "name": "sponsor",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "FinanceEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "ret",
          "type": "int256"
        },
        {
          "indexed": false,
          "name": "debtor",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "debtee",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "PaybackEvent",
      "type": "event"
    }
  ]

// 前缀：-----BEGIN EC PRIVATE KEY-----。
const EC_PRIVATE_KEY_PREFIX = '30740201010420';
// 前缀：-----BEGIN PRIVATE KEY-----
const PRIVATE_KEY_PREFIX =
  '308184020100301006072a8648ce3d020106052b8104000a046d306b0201010420';

  /**
 * 从 PEM 证书中解析出私钥字符串内容。
 * @param pem 证书
 */
function decodePem(pem) {
    let privateKey = '';
    if (pem.startsWith(EC_PRIVATE_KEY_PREFIX)) {
      // -----BEGIN EC PRIVATE KEY-----
      privateKey = pem.substring(
        EC_PRIVATE_KEY_PREFIX.length,
        EC_PRIVATE_KEY_PREFIX.length + 64,
      );
    } else if (pem.startsWith(PRIVATE_KEY_PREFIX)) {
      // -----BEGIN PRIVATE KEY-----
      privateKey = pem.substring(
        PRIVATE_KEY_PREFIX.length,
        PRIVATE_KEY_PREFIX.length + 64,
      );
    } else {
      throw new Error('expected `EC PRIVATE KEY` or `PRIVATE KEY`');
    }
    return privateKey;
}

/**
 * 根据 PEM 文本内容计算私钥。
 * @param raw PEM 文件文本内容
 */
function getPrivateKey(raw) {
    const encodedPem = Buffer.from(raw);
    const decodedPem = (PEM.decode(encodedPem)).toString('hex');
    return decodePem(decodedPem);
}

/**
 * 根据私钥生成公钥地址。
 * @param privateKey 私钥
 */
function privateKeyToPublicKey(privateKey) {
    return `0x${web3Utils.privateKeyToAddress(privateKey).toString('hex')}`;
}

function sendRawTransactionUsingCustomCredentials(
    address,
    abi,
    publicKey,
    privateKey,
    func,
    params,
  ) {
    let item = '';
    // 函数签名。
    let funcSignature = '';
  
    for (const iter of abi) {
      if (iter.name === func && iter.type === 'function') {
        if (iter.inputs.length !== params.length) {
          throw new Error('wrong number of parameters for function');
        }
        item = iter;
        funcSignature = utils.spliceFunctionSignature(iter);
        break;
      }
    }
  
    return new Promise((resolve, reject) => {
      web3jService
        .sendRawTransactionUsingCustomCredentials(
          publicKey,
          privateKey,
          address,
          funcSignature,
          params,
        )
        .then(result => {
          const transactionHash = result.transactionHash;
          const status = result.status;
          const output = result.output;
          const ret = {
            transactionHash,
            status,
            output: '',
          };
          if (output !== '0x') {
            ret.output = JSON.parse(JSON.stringify(web3Utils.decodeParams(item.outputs, output)));
          }
          resolve(ret);
        })
        .catch(reject);
    });
  }

module.exports = {
    CONTRACT_ABI,
    CONTRACT_ADDRESS,
    getPrivateKey,
    sendRawTransactionUsingCustomCredentials,
}
