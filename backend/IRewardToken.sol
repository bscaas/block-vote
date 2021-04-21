pragma solidity ^0.8.0;
import "./IRewardBearer.sol";

interface IRewardToken{
    function grantReward(IRewardBearer bearer, uint8 reward_id, bytes memory options) external returns(bool);
    function lockedApprove(IRewardBearer bearer, uint256 _value) external returns(bool success);
    function getTotalRewards(IRewardBearer bearer) external returns(uint);
}