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

    totalFunds(election_id){
        return this.contract.methods.totalFunds(election_id).call();
    }

    setVoterRegistrationContract(address){
        return this.contract.methods.setVoterRegistrationContract(address).send({from: window.ethereum.selectedAddress, gas: 5000000});

    }

    eligibleForReward(reward_id, election_id){
        return this.contract.methods.eligibleForReward(reward_id, window.ethereum.selectedAddress, Buffer.from(election_id)).call();
    }
    


}