import BaseContract from './BaseContract';

export class VotingBoothContract extends BaseContract{

    constructor(){
        super()
        this.contract = new window.web3.eth.Contract(this.config.voting_booth.abi_interface, this.config.voting_booth.address);
    }


    submitEncryptedMessages(election_id, messages){
        console.log(messages)
        return this.contract.methods.submitEncryptedMessages(election_id, messages ).send({from: window.ethereum.selectedAddress, gas: 5000000});
    }

    getEncryptedMessages(election_id){
        return this.contract.methods.getEncryptedMessages(election_id).call();
    }

    clearEncryptedMessages(election_id){
        return this.contract.methods.clearEncryptedMessages(election_id).send({from: window.ethereum.selectedAddress, gas: 1000000})
    }


}

export class EncryptedMessage{
    constructor( message, blockchain_address){
        this.blockchain_address = blockchain_address
        this.message = message
    }
}