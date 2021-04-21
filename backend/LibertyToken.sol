pragma solidity >= 0.8.0;

import "./IRewardBearer.sol";
import "./IRewardToken.sol";

contract LibertyToken is IRewardToken{
    string public name = "Liberty";
    string public symbol = "LBTY";
    uint256 public totalSupply = 500000000000000;
    uint8 public decimals = 4;


    event Transfer(
      address indexed _from,
      address indexed _to,
      uint256 _value
    );

    event Approval (
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256)public balances;
    mapping(address=>mapping(address=>uint256))public allowed;

    mapping(address=>mapping(IRewardBearer => uint256))public locked;
    mapping(address=>IRewardBearer[]) reward_locks;
    mapping(IRewardBearer=>address[]) reward_providers;

    constructor() public {
        balances[msg.sender] = totalSupply;
    }  
   
   function totalsupply() public view returns(uint256){
       return totalSupply;
   }

   function balanceOf(address _owner) public view returns (uint256){
       return balances[_owner];
   }

   function transfer(address _to, uint256 _value) public returns(bool success){
       uint total_locked = 0;
       IRewardBearer[] memory locks = reward_locks[msg.sender];
       for(uint i=0; i < locks.length; i++){
           total_locked += locked[msg.sender][locks[i]];
       }
       
       require(balances[msg.sender]>= (_value + total_locked));
       balances[msg.sender] -= _value;
       balances[_to] += _value;
       emit Transfer(msg.sender, _to, _value);
       return true;
   }
    
    function approve(address _spender, uint256 _value) public returns(bool success){
       allowed[msg.sender][_spender] = _value;
       emit Approval(msg.sender, _spender, _value);
       return true;
    }

    function lockedApprove(IRewardBearer bearer, uint256 _value) external override returns(bool success){
        require(locked[msg.sender][bearer] < _value, "Only able to increase locked funds.");
        if(locked[msg.sender][bearer] == 0){ //if bearer not already provided allowance 
            reward_locks[msg.sender].push(bearer);
        }

        locked[msg.sender][bearer] = _value;

        return true;
    }
   

    function transferFrom(address _from, address _to, uint256 _value) public returns(bool success){
       uint total_locked = 0;
       IRewardBearer[] memory locks = reward_locks[msg.sender];
       for(uint i=0; i < locks.length; i++){
           total_locked += locked[msg.sender][locks[i]];
       }
       
        require((_value + total_locked) <= balances[_from]);
        require((_value + total_locked) <= allowed[_from][msg.sender]);
        balances[_from] -= _value;
        balances[_to] += _value;
        allowed[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    function allowance(address _owner, address _spender) public view returns(uint256){
        return allowed[_owner][_spender];
    }

    function grantReward(IRewardBearer bearer, uint8 reward_id, bytes memory options) external override returns(bool){
        require(reward_providers[bearer].length > 0, "No reward providers for this bearer");

        uint reward = bearer.eligibleForReward(reward_id, msg.sender, options);
        require(reward > 0, "You are not eligible for rewards from this bearer or the reward was zero.");
       
       uint total_locked = 0;
       IRewardBearer[] memory locks = reward_locks[msg.sender];
       for(uint i=0; i < locks.length; i++){
           total_locked += locked[msg.sender][locks[i]];
       }

        require(total_locked > reward, "Insufficient reward provision. Wait for more providers to claim this reward.");

        while(reward > 0){
            address provider = reward_providers[bearer][0];

            if(locked[provider][bearer] > reward){
                balances[provider] -= reward;
                balances[msg.sender] += reward;
                locked[provider][bearer] -= reward;
            }
            else{
                balances[provider] -= locked[provider][bearer];
                balances[msg.sender] += locked[provider][bearer];
                
                delete locked[provider][bearer];

                for(uint i=0; i < reward_providers[bearer].length; i++){
                    if(reward_providers[bearer][i] == provider ){
                        delete reward_providers[bearer];
                    }
                }

                for(uint i=0; i < reward_locks[provider].length; i++){
                    if(reward_locks[provider][i] == bearer){
                        delete reward_locks[provider][i];
                    }
                }
                reward -= locked[provider][bearer];
                
            }
        }

        bearer.claimReward(reward_id, options);
        return true;

    }

    function getTotalRewards(IRewardBearer bearer) external override returns(uint){

        uint total_locked;
        address[] memory providers = reward_providers[bearer];

        for(uint i=0; i < providers.length; i++){
            total_locked += locked[providers[i]][bearer];
        }

        return total_locked;
    }


}
