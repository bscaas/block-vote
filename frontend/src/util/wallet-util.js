const sigUtil = require('eth-sig-util')
const ethUtil = require('ethereumjs-util')


export default class WalletUtil{
    // constructor(){

    // }

    static getPublicKey(){
      return new Promise((r)=>{
        window.ethereum.request({
          method: 'eth_getEncryptionPublicKey',
          params: [window.ethereum.selectedAddress], // you must have access to the specified account
        }).then((x)=>r(x))
      })
        
    }

    static encrypt(msg, encryptionPublicKey){
      const encryptedMessage = ethUtil.bufferToHex(
        Buffer.from(
          JSON.stringify(
            sigUtil.encrypt(
              encryptionPublicKey,
              { data: msg },
              'x25519-xsalsa20-poly1305'
            )
          ),
          'utf8'
        )
      );

      return encryptedMessage;
    }

    /*
      TODO: Decrypt multiple messages simultaneously
    */
   static decrypt(encrypted_msg){
      return window.ethereum
      .request({
        method: 'eth_decrypt',
        params: [encrypted_msg, window.ethereum.selectedAddress],
      })
    }
}
