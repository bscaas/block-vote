export default class WalletUtil{
    constructor(){

    }

    getPublicKey(){
      return new Promise((r)=>{window.web3.eth.getAccounts().then((accounts)=>{
        window.ethereum.request({
          method: 'eth_getEncryptionPublicKey',
          params: [accounts[0]], // you must have access to the specified account
        }).then((x)=>r(x))
      })})
        
    }

    encrypt(){

    }

    decrypt(){

    }
}