import BaseContract from './BaseContract';

export class VoterRegistrationContract extends BaseContract{

    constructor(){
        super()
        this.contract = new window.web3.eth.Contract(this.config.contract.voter_registration.abi_interface, this.config.contract.voter_registration.address);
    }


    register(election_id, voter){
        return this.contract.methods.registerVoter(election_id, voter).send({from: window.ethereum.selectedAddress, gas: 5000000});
    }

    getTurnout(election_id){
        return this.contract.methods.getTurnout(election_id).call()
    }

    getVoters(election_id, ids){
        return this.contract.methods.getVoters(election_id, ids).call()
    }

    setRewardBearer(address){
        return this.contract.methods.setRewardBearer(address).send({from: window.ethereum.selectedAddress, gas: 5000000});
    }

}

export class Voter{
    constructor(reg_num, blockchain_address, nin, voted,){
        this.id = reg_num 
        this.blockchain_address = blockchain_address
        this.nin = nin
        this.voted = voted
    }
}