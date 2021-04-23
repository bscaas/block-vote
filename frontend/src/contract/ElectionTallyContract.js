import BaseContract from './BaseContract'
export default class ElectionTallyContract extends BaseContract{
    constructor(){
        super()
        this.contract = new window.web3.eth.Contract(this.config.contract.election_tally.abi_interface, this.config.contract.election_tally.address);
    }

    submitVoteFragments(election_id, vote_fragments){

        if(vote_fragments.length == 0){
            return Promise.resolve()
        }
        return this.contract.methods.submitVoteFragments(election_id, vote_fragments).send({from: window.ethereum.selectedAddress, gas: 5000000})
    }

    getTally(election_id){
        return this.contract.methods.getTally(election_id).call()
    }
}

export class VoteFragment{
    constructor(vid, position, fragment){
        this.election_id=""
        this.vote_id = vid
        this.candidate_key_fragment_position = position
        this.candidate_key_fragment = fragment
    }
}