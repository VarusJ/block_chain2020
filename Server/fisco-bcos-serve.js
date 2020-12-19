const {
    CONTRACT_ABI,
    CONTRACT_ADDRESS,
    getPrivateKey,
    sendRawTransactionUsingCustomCredentials,
  } = require('./utils')

 async function sendTransaction(
    publicKey,
    privateKey,
    func,
    params,
  ) {
    try {
      const ret = await sendRawTransactionUsingCustomCredentials(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        publicKey,
        getPrivateKey(privateKey),
        func,
        params,
      );

      return ret;
    } catch (err) {
        return err
    }
  }

  module.exports = {
    sendTransaction
  }