pragma solidity ^0.8.0;

interface IRewardBearer{
    function claimReward(uint8 reward_id, address receiver,bytes memory options) external returns(bool);
    function fundProvided(uint amount, bytes memory options) external returns(bool );
}