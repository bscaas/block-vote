pragma solidity >= 0.8.0;
pragma experimental ABIEncoderV2;

import "./EncryptionDomain.sol";
import "./VoterRegistrationContract.sol";

struct VoterBatch{
    uint[] voter_ids;
}

contract VotingBoothContract{
    mapping(string => mapping(address => EncryptionDomain.EncryptedMessage[])) messages;
    mapping(string => mapping(uint => uint)) batch_for_voter;
    mapping(string => VoterBatch[]) voter_batches;

    address voter_registration_contract;
    uint group_size = 50;
    
    function setVoterRegistrationContract(address addr) public{
        voter_registration_contract = addr;
    }

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

    function prepareVoterBatches(string memory election_id) public{
        VoterRegistrationContract registration = VoterRegistrationContract(voter_registration_contract);

        uint turnout = registration.getTurnout(election_id);
        uint number_of_groups = turnout/group_size + 1;
        

        //TODO: Posilby make fancier randomization? Currently just sequentially distributed into groups, i.e relies on large populations with many groups for randomness
        
        uint[] memory group;
        for(uint i = 1; i <= number_of_groups; i++){
            group = new uint[](group_size);
            //first make group
            for(uint j = 1; j <= group_size; j++){
                group[j-1] = i*j-1;
            }
            //now assign group to each registrant of the group
            for(uint j = 0; j < group_size; j++){
                batch_for_voter[election_id][group[j]] = i-1;
            }

            voter_batches[election_id][i].voter_ids = group;
        }
        

    }

}