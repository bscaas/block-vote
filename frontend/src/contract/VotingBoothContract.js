import BaseContract from './BaseContract';

export class VotingBoothContract extends BaseContract{
    contract = null

    constructor(){
        super()
        let Contract = require('web3-eth-contract');
        this.contract = new Contract(this.config.voting_booth.abi_interface, this.config.voting_booth.address);
    }


    submitEncryptedMessages(election_id, messages){
        return this.contract.methods.submitEncryptedMessages(election_id, messages ).send({from: window.ethereum.selectedAddress, gas: 1000000});
    }

    getEncryptedMessages(election_id){
        return this.contract.methods.getEncryptedMessages(election_id).call();
    }

    clearEncryptedMessages(election_id){
        return this.contract.methods.clearEncryptedMessages(election_id).send({from: window.ethereum.selectedAddress, gas: 1000000})
    }


}

export class EncryptedMessage{
    public_key = null
    message = null

    constructor( message, public_key){
        this.public_key = public_key
        this.message = message
    }
}