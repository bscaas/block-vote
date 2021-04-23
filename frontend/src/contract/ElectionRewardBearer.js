import BaseContract from "./BaseContract";

export default class ElectionRewardBearerContract extends BaseContract{
    constructor(){
        super()
        this.contract = new window.web3.eth.Contract(this.config.contract.election_reward.abi_interface, this.config.contract.election_reward.address);

    }

    balance(election_id){
        return this.contract.methods.balanceOf(election_id).call();
    }
    
    fundsRewarded(election_id){
        return this.contract.methods.fundsRewarded(election_id).call();
    }
    


}