import BaseContract from './BaseContract';

export class VoterRegistrationContract extends BaseContract{

    constructor(){
        super()
        this.contract = new window.web3.eth.Contract(this.config.voter_registration.abi_interface, this.config.voter_registration.address);
    }


    register(election_id, voter){
        return this.contract.methods.registerVoter(election_id, voter).send({from: window.ethereum.selectedAddress, gas: 5000000});
    }

    getTurnout(election_id){
        return this.contract.methods.getTurnout(election_id).send({from: window.ethereum.selectedAddress, gas: 1000000})
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