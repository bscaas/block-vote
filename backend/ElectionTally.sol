pragma solidity ^0.8.0;
import "./VotingBoothContract.sol";

contract ElectionTally {
    bool public votingEnded;
    uint public totalCandidateVotes;
    mapping (bytes32 => uint256) private votesReceived;

    constructor(bytes32[] memory _vote) public {
        votesReceived = _vote;
    }

    function submitVoteFragments(string election_id, VoteFragment[] fragments) private view returns (uint256) {
        
        for (uint i = 0; i < fragments.length; i++) {
            VoteFragment fragment = fragments[i];
            Vote vote = votes[fragment.vote_id];
            if (!vote) {
                vote = new Vote();
            }

            vote.candidate_key [fragment.index] = fragment.candidate_key_fragment;
            votes[frgment.vote_id] = vote;
        
        }

        require(!votingEnded);
        require(validCandidate());
        require(votesReceived[vote] < ~uint256(0));
        require(totalCandidateVotes < ~uint256(0));

        votesReceived[vote] += 1;
        totalCandidateVotes[vote.candidate_key] += 1;
        return votesReceived;

    }

    function validCandidate (voteFragment[] fragments) private view returns (bool) {
        vote.candidate_key[fragment.index] == fragment.candidate_key_fragment;
    }


    function getTotalCandidateVotes(voteFragment[] fragments) view public returns (uint256) {
        require(votingEnded);

        return totalCandidateVotes;
    }

    
    function clearVotesFragments(string memory vote) public{
        delete messages[vote_id][msg.sender];
    }
  
    
}