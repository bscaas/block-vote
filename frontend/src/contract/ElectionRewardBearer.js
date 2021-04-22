import BaseContract from "./BaseContract";

export default class ElectionRewardBearerContract extends BaseContract{
    constructor(){
        super()
        this.contract = new window.web3.eth.Contract(this.config.reward_bearer.abi_interface, this.config.reward_bearer.address);

    }


    fund(election_id, amount){
        return this.contract.methods.fundElection(election_id, amount).send({from: window.ethereum.selectedAddress, gas: 5000000})
    }
}