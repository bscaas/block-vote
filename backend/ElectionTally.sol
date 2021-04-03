pragma solidity ^0.8.0;
import "./VotingBoothContract.sol";

contract ElectionTally {
    bool public votingEnded;
    uint public totalCandidateVotes;
    mapping (bytes32 => uint256) private votesReceived;

    constructor(bytes32[] memory _votesRecieved) public {
        votesReceived = _votesRecieved;
    }

    function submitVoteFragments(String election_id, VoteFragment[] fragments) private view returns (uint256) {
        require(!votingEnded);
        require(validCandidate());
        require(votesReceived[] < ~uint256(0));
        require(totalCandidateVotes < ~uint256(0));

        votesReceived[] += 1;
        totalCandidateVotes[] += 1;
    }


    function getTotalCandidateVotes(bytes32 candidate) view public returns (uint256) {
        require(votingEnded); 
        return votesReceived[candidate];
    }  
    
}