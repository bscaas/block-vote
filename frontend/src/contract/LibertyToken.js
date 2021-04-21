import BaseContract from './BaseContract'
export default class LibertyToken extends BaseContract{
    constructor(){
        super()
        this.contract = new window.web3.eth.Contract(this.config.liberty_token.abi_interface, this.config.liberty_token.address);
    }

    totalSupply(){
        return this.contract.methods.totalSupply().call();
    }

    balanceOf(owner){
        return this.contract.methods.balanceOf(owner).call();
    }

    transfer(to, value){
        return this.contract.methods.transfer(to, value).send({from: window.ethereum.selectedAddress, gas: 5000000});
    }

    approve(spender, value){
        return this.contract.methods.approve(spender, value).send({from: window.ethereum.selectedAddress, gas: 5000000});
    }

    transferFrom(from, to, value){
        return this.contract.methods.transferFrom(from, to, value).send({from: window.ethereum.selectedAddress, gas: 5000000});
    }

    allowance(owner, spender){
        return this.contract.methods.allowance(owner, spender).call()
    }
   
}
