pragma solidity >= 0.8.0;
pragma experimental ABIEncoderV2;

import "./EncryptionDomain.sol";
//EncryptionBufferContract
contract VotingBoothContract{
    mapping(string => mapping(address => EncryptionDomain.EncryptedMessage[])) messages;

    function submitEncryptedMessages(string memory election_id, EncryptionDomain.EncryptedMessage[] memory m) public {

        for(uint8 i =0; i < m.length; i++){
            messages[election_id][m[i].blockchain_address].push(m[i]);
        }
    }

    function getEncryptedMessages(string memory election_id, address sender) public view returns(EncryptionDomain.EncryptedMessage[] memory){
        EncryptionDomain.EncryptedMessage[] memory em = messages[election_id][sender];
        return em;
    }

    function clearEncryptedMessages(string memory election_id) public{
        delete messages[election_id][msg.sender];
    }

}