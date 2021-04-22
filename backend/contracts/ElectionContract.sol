pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;
import "./VotingBoothContract.sol";

contract ElectionContract{

    mapping(string=>Election) elections;
    string[] election_ids;

    address voting_booth_address;

    struct Election{
        string id;
        string name;
        string phase;
        string elected_candidate_id;
        string image_cid;
    }
    
    modifier electionExists(string memory id){
        require(bytes(elections[id].id).length > 0 , "Election does not exist.");
        _;
    }
    
    modifier electionNotExists(string memory id){
        require(bytes(elections[id].id).length == 0 , "Election already exists.");
        _;
    }
    
    function createElection(Election memory election) public electionNotExists(election.id) {
        election.phase = "Candidate";
        elections[election.id] = election;
        election_ids.push(election.id);
    }

    function readElection(string memory election_id) public view electionExists(election_id) returns(Election memory){
        return elections[election_id];
    }

    /*
    We do not do election updates
    function updateElection(Election memory election) public electionExists(election.id) {
        
        
    }
    */

    function deleteElection(string memory election_id) public electionExists(election_id) {
        delete elections[election_id];
    }

    function listElectionIds() public view returns(string[] memory){
        return election_ids;
    }

    function listElections() public view returns(Election[] memory){
        Election[] memory results = new Election[](election_ids.length);
        for(uint i =0; i < election_ids.length; i++){
            results[i] = elections[election_ids[i]];
        }
        return results;
    }

    function endCandidate(string memory election_id) public electionExists(election_id) {
        Election storage election = elections[election_id];
        require(keccak256(bytes(election.phase)) == keccak256("Candidate"), "Not in phase 'Candidate'");
        election.phase = "Registration";
    }

    function endRegistration(string memory election_id) public electionExists(election_id){
        Election storage election = elections[election_id];
        require(keccak256(bytes(election.phase)) == keccak256("Registration"), "Not in phase 'Registration'");
        election.phase = "Voting";

        VotingBoothContract voting_booth = VotingBoothContract(voting_booth_address);

        voting_booth.prepareVoterBatches(election_id);

    }

    function endVoting(string memory election_id) public electionExists(election_id){
        Election storage election = elections[election_id];
        require(keccak256(bytes(election.phase)) == keccak256("Voting"), "Not in phase 'Voting'");
        election.phase = "Tally";

    }

    function endTally(string memory election_id) public electionExists(election_id){
        Election storage election = elections[election_id];
        require(keccak256(bytes(election.phase)) == keccak256("Tally"), "Not in phase 'Tally'");
        election.phase = "Ended";
    }

    function setVotingBoothAddress(address addr) public {
        voting_booth_address = addr;
    }



}