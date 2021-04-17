import BaseContract from './BaseContract'
export default class ElectionTallyContract extends BaseContract{
    constructor(){
        super()
        this.contract = new window.web3.eth.Contract(this.config.election_tally.abi_interface, this.config.election_tally.address);
    }

    submitVoteFragments(election_id, vote_fragments){
        return this.contract.methods.submitVoteFragments(election_id, vote_fragments).send({from: window.ethereum.selectedAddress, gas: 5000000})
    }

    getTally(election_id){
        return this.contract.methods.getTally(election_id).send({from: window.ethereum.selectedAddress, gas: 5000000})
    }
}