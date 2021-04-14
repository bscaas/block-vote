pragma solidity >= 0.8.0;

contract LibertyToken {
    string public name = "Liberty Token";
    string public symbol = "LBT";
    uint256 public totalSupply = 50000000000;
    uint8 public decimals = 4;

    event Transfer(
      address indexed _from,
      address indexed _to,
      uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256)public balances;
    mapping(address=>mapping(address=>uint256))public allowed;

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
       require(balances[msg.sender]>= _value);
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
   
    function transferFrom(address _from, address _to, uint256 _value) public returns(bool success){
        require(_value <= balances[_from]);
        require(_value <= allowed[_from][msg.sender]);
        balances[_from] -= _value;
        balances[_to] += _value;
        allowed[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    function allowance(address _owner, address _spender, uint256 _value) public view returns(uint256){
        return allowed[_owner][_spender];
    }

}
