pragma solidity ^0.8.0;
// Import contracts for both Dapp and DAI token.
import "./IRewardBearer.sol";
import "./IRewardToken.sol";
import "./VoterRegistrationContract.sol";

contract ElectionRewardBearer is IRewardBearer{

    uint total_rewards = 0;

    IRewardToken token;
    VoterRegistrationContract voter_registration;

    mapping(string=>uint) election_funds;

    constructor(IRewardToken _token){
        token = _token;
    }

    function eligibleForReward(uint8 reward_id, address receiver, bytes memory options) external view override returns(uint){

        string memory election_id = string(options);
        uint voter_turnout = voter_registration.getTurnout(election_id);

        
        return 0;
    }
    
    function fund(uint reward) external override returns(bool success){
        token.lockedApprove(this, reward); 
        return true;
    }

    function fundElection(string memory election_id, uint reward) public returns(bool success){        

        bool success = this.fund(reward);
        if(success){
            election_funds[election_id] += reward;
        }

        return success;
        
    }


    function setTotalRewards() public{
        total_rewards = token.getTotalRewards(this);
    }

    

}
