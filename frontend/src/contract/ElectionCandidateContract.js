import BaseContract from './BaseContract';

export default class ElectionCandidateContract extends BaseContract{
    contract = null

    constructor(){
        super()
        this.contract = new window.web3.eth.Contract(this.config.contract.election_candidate.abi_interface, this.config.contract.election_candidate.address);
    }

    createCandidate(election_id, candidate){
        return this.contract.methods.createCandidate(election_id, candidate ).send({from: window.ethereum.selectedAddress, gas: 1000000});
    }


    updateCandidate(election_id, candidate){
        return this.contract.methods.updateCandidate(election_id, candidate ).send({from: window.ethereum.selectedAddress, gas: 1000000});
    }


    readCandidate(election_id, candidate_id){
        return this.contract.methods.readCandidate(election_id, candidate_id ).call();
    }


    deleteCandidate(election_id, candidate_id){
        return this.contract.methods.deleteCandidate(election_id, candidate_id ).send({from: window.ethereum.selectedAddress, gas: 1000000});
    }

    list(election_id){
        return this.contract.methods.listCandidates(election_id).call().then((candidates)=>{
            return Promise.resolve(candidates.map((c)=>new ElectionCandidate(...c)))
        });
    }
    listIds(election_id){
        return this.contract.methods.listCandidateIds(election_id).call();
    }

}

export class ElectionCandidate{

    constructor( id, name,  election_id, key, profile_image_hash, profile_image_url){
        this.id = id;
        this.name = name;
        this.election_id = election_id;
        this.key = key;
        this.profile_image_hash = profile_image_hash;
        this.profile_image_url = profile_image_url
    }
}



