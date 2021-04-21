pragma solidity ^0.8.0;

interface IRewardBearer{
    function eligibleForReward(uint8 reward_id, address receiver) external view  returns(uint);
}