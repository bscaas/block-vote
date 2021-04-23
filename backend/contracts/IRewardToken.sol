pragma solidity ^0.8.0;
import "./IRewardBearer.sol";

interface IRewardToken{
    function fund(IRewardBearer bearer, uint amount, bytes memory options) external returns(bool);
    function transfer(address _to, uint _value) external returns (bool success);
}