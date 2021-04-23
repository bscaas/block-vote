pragma solidity ^0.8.0;
// Import contracts for both Dapp and DAI token.
import "./VoterRegistrationContract.sol";
import "./IRewardToken.sol";
import "./IRewardBearer.sol";

contract ElectionRewardBearer is IRewardBearer{

    IRewardToken token;
    VoterRegistrationContract voter_registration;

    mapping(string => mapping(address => mapping(uint => uint))) claimed_rewards;

    mapping(string=>uint) election_funds;
    mapping(string=>uint) funds_rewarded;

    constructor(IRewardToken _token){
        token = _token;
    }

    function eligibleForReward(uint8 reward_id, address receiver, bytes memory options) external view returns(uint){
        string memory election_id = string(options);
        if(claimed_rewards[election_id][receiver][reward_id] > 0 ) return 0; // already claimed
        uint voter_turnout = voter_registration.getTurnout(election_id);
        uint reward = ((election_funds[election_id]/voter_turnout)/2); //TODO: More sophisticated rewarding, currently evenly distributed across reward items

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

    function fundProvided(uint amount, bytes memory options) external override returns(bool){
        string memory election_id = string(options);

        election_funds[election_id] += amount;
        return true;
    }

    function claimReward(uint8 reward_id, address receiver, bytes memory options) override external returns (bool){
        string memory election_id = string(options);
        uint reward = this.eligibleForReward(reward_id, receiver, options);
        
        require(reward == 0, "No reward to claim.");
        if(reward > 0){
            bool success = token.transfer(receiver, reward);

            if(success){
                claimed_rewards[election_id][receiver][reward_id] = reward;
                funds_rewarded[election_id] += reward;
                election_funds[election_id] -= reward;
                return true;
            }
        }
        return false;
    }
    

    function balanceOf(string memory election_id) public view returns(uint){
        return election_funds[election_id];
    }

    function fundsRewarded(string memory election_id) public view returns(uint){
        return funds_rewarded[election_id]; 
    }

}
