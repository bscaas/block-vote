pragma solidity ^0.8.0;
// Import contracts for both Dapp and DAI token.
import "./IRewardBearer.sol";
import "./IRewardToken.sol";
import "./VoterRegistrationContract.sol";

contract ElectionRewardBearer is IRewardBearer{

    uint total_rewards = 0;

    IRewardToken token;
    VoterRegistrationContract voter_registration;

    mapping(string => mapping(address => mapping(uint => uint))) claimed_rewards;

    mapping(string=>uint) election_funds;

    constructor(IRewardToken _token){
        token = _token;
    }

    function eligibleForReward(uint8 reward_id, address receiver, bytes memory options) external view override returns(uint){
        string memory election_id = string(options);
        if(claimed_rewards[election_id][receiver][reward_id] > 0 ) return 0; // already claimed
        uint voter_turnout = voter_registration.getTurnout(election_id);
        uint reward = ((total_rewards/voter_turnout)/2); //TODO: More sophisticated rewarding, currently evenly distributed across reward items

        uint sum_reward = 0;

        if(reward_id == 0){ //registration reward
            //ensure did register
            if(voter_registration.isRegistered(election_id)){
                sum_reward = reward; 
            }
        }
        else if(reward_id == 1){ //vote reward
            //ensure did vote

        }
        
        return reward;
    }

    function claimReward(uint8 reward_id, bytes memory options) external override returns(uint){
        uint reward = this.eligibleForReward(reward_id, msg.sender, options);
        require(reward == 0, "No reward to claim.");

        string memory election_id = string(options);
        claimed_rewards[election_id][msg.sender][reward_id] = reward;


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

    function grantReward(string memory election_id, uint8 reward_id) public{
        token.grantReward(this, reward_id, bytes(election_id));
    }
    

}
