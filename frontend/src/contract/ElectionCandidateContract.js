import BaseContract from './BaseContract';

export class ElectionCandidateContract extends BaseContract{
    contract = null

    constructor(){
        super()
        this.contract = new window.web3.eth.Contract(this.config.election_candidate.abi_interface, this.config.election_candidate.address);
    }

    createCandidate(election_id, candidate){
        return this.contract.methods.createCandidate(election_id, candidate ).send({from: window.ethereum.selectedAddress, gas: 1000000});
    }


    updateCandidate(election_id, candidate){
        return this.contract.methods.updateCandidate(election_id, candidate ).send({from: window.ethereum.selectedAddress, gas: 1000000});
    }


    readCandidate(election_id, candidate_id){
        return this.contract.methods.readCandidate(election_id, candidate_id ).send({from: window.ethereum.selectedAddress, gas: 1000000});
    }


    deleteCandidate(election_id, candidate_id){
        return this.contract.methods.deleteCandidate(election_id, candidate_id ).send({from: window.ethereum.selectedAddress, gas: 1000000});
    }

}

export class ElectionCandidate{

    constructor( name, id, key, election_id, profile_image_hash, profile_image_url){
        this.name = name;
        this.id = id;
        this.key = key;
        this.election_id = election_id;
        this.profile_image_hash = profile_image_hash;
        this.profile_image_url = profile_image_url
    }
}



