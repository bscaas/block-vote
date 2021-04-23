import BaseContract from './BaseContract'
export default class ElectionContract extends BaseContract{
    constructor(){
        super()
        this.contract = new window.web3.eth.Contract(this.config.contract.election.abi_interface, this.config.contract.election.address);
    }

    create(election){
        return this.contract.methods.createElection(election).send({from: window.ethereum.selectedAddress, gas: 5000000})
    }

    read(election_id){
        return this.contract.methods.readElection(election_id).send({from: window.ethereum.selectedAddress, gas: 5000000})
    }

    delete(election_id){
        return this.contract.methods.deleteElection(election_id).send({from: window.ethereum.selectedAddress, gas: 5000000})
    }

    list(){
        return this.contract.methods.listElections().call()
    }

    listIds(){
        return this.contract.methods.listElectionIds().call()
    }

    endCandidate(election_id){
        return this.contract.methods.endCandidate(election_id).send({from: window.ethereum.selectedAddress, gas: 5000000})
    }
    endRegistration(election_id){
        return this.contract.methods.endRegistration(election_id).send({from: window.ethereum.selectedAddress, gas: 5000000})

    }
    endVoting(election_id){
        return this.contract.methods.endVoting(election_id).send({from: window.ethereum.selectedAddress, gas: 5000000})
    }

    endTally(election_id){
        return this.contract.methods.endTally(election_id).send({from: window.ethereum.selectedAddress, gas: 5000000})
    }
}

export class Election{
    constructor(id, name, phase="Candidate", election_candidate_id="", image_cid){
        this.id = id
        this.name = name
        this.phase = phase
        this.elected_candidate_id = election_candidate_id
        this.image_cid = image_cid
    }
}
