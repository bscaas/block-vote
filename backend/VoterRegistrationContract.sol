pragma solidity ^0.8.0;
import "./ElectionRewardBearer.sol";
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
    ElectionRewardBearer rewardBearer;
    
    
    constructor() public {
    }
    
    function registerVoter (string memory election_id, Voter memory voter) public {
        require(!blockchain_address_exists[election_id][msg.sender], "Blockchain address already exists");
        blockchain_address_exists[election_id][msg.sender] = true;
        voter.blockchain_address = msg.sender;
        string memory voter_nin = voter.nin;
        require (RegistrationUtility.luhnCheck(voter_nin), "Invalid Nation Identity Number");
        bytes memory bytesVoter_nin = bytes(voter.nin);
        require(!nins_exists[election_id][voter_nin], "Voter National Identity Number already exists ");
        nins_exists[election_id][voter_nin] = true;
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
        return blockchain_address_exists[election_id][msg.sender];
    }
}
