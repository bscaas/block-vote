pragma solidity ^0.8.0;
import "./IRewardBearer.sol";
import "./RegistrationUtility.sol";

struct Voter {
    uint id;
    address blockchain_address; 
    string nin;
    bool voted;
}
    
contract VoterRegistrationContract {
    
    mapping(string=>uint) voter_counts;
    mapping(string => mapping(uint => Voter)) voters;
    mapping(string=>mapping(string=>bool)) private nins_exists;
    mapping(string => mapping(address=>bool)) private blockchain_address_exists;
    IRewardBearer reward_bearer;
    
    
    constructor() public {
    }
    
    function registerVoter (string memory election_id, Voter memory voter) public {
        require(!blockchain_address_exists[election_id][msg.sender], "Blockchain address already exists");
        blockchain_address_exists[election_id][msg.sender] = true;
        voter.blockchain_address = msg.sender;
        string memory voter_nin = voter.nin;
        require (RegistrationUtility.luhnCheck(voter_nin), "Invalid Nation Identity Number");
        require(!nins_exists[election_id][voter.nin], "Voter National Identity Number already exists ");
        nins_exists[election_id][voter_nin] = true;
        uint next_id = voter_counts[election_id] + 1;
        voter.id = next_id;
        voters[election_id][next_id] = voter;
        voter_counts[election_id] += 1;

        //claim reward
        reward_bearer.claimReward(0, msg.sender, bytes(election_id));
    }
    
    function setRewardBearer(IRewardBearer bearer) public {
        reward_bearer = bearer;
    }

    function getTurnout(string memory election_id) public view returns(uint) {
        return voter_counts[election_id];
    }

    function isRegistered(string memory election_id, address addr) public view returns(bool){
        return blockchain_address_exists[election_id][addr];
    }
}
