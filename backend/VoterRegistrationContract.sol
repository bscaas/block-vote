pragma solidity ^0.8.0;
import "./ElectionRewardBearer.sol";

struct Voter {
    uint id;
    address blockchain_address; 
    string nin;
    bool voted;
}
    
contract VoterRegistrationContract {
    
    mapping(string=>uint) voter_counts;
    mapping(string => mapping(uint => Voter)) voters;
    mapping(string=>mapping(address=>bool)) registered;
    ElectionRewardBearer rewardBearer;
    
    
    constructor() public {
    }
    
    function registerVoter (string memory election_id, Voter memory voter) public {
        uint next_id = voter_counts[election_id];
        voter.id = next_id;
        voters[election_id][next_id] = voter;
        voter_counts[election_id] += 1;

        //claim reward
        rewardBearer.grantReward(election_id, 1);
    }
    
    
    function getTurnout(string memory election_id) public view returns(uint) {
        return voter_counts[election_id];
    }

    function isRegistered(string memory election_id) public view returns(bool){
        return registered[election_id][msg.sender];
    }
}
