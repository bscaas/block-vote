pragma solidity ^0.5.16;

contract registerAccount {
    
    uint public numAccount;
    
    constructor() public {
        numAccount = 0;
    }
    
    struct Voter {
        address addr; 
        string name;
        string email;
    }
    
    mapping(uint => Voter) public accounts;
    
    
    
    function register (string memory _name, string memory _email) public {
        accounts[numAccount].addr = msg.sender;
        accounts[numAccount].name = _name;
        accounts[numAccount].email = _email;
        numAccount++;
    }
    
    
    function getInfo(uint numAccount) public view returns(string memory) {
        return accounts[numAccount].name;
    }
}
