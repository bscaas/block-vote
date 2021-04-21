pragma solidity ^0.8.0;

interface IRewardBearer{
    function eligibleForReward(uint8 reward_id, address receiver, bytes memory options) external view  returns(uint);
    function fund(uint reward) external returns(bool );
    function claimReward(uint8 reward_id, bytes memory options) external returns(uint);
}