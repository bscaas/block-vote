pragma solidity ^0.8.0;

contract VoteTally {
    bytes32[] public candidateNames;

    bool public votingEnded;

    uint256 public totalVotes;

    mapping (bytes32 => uint256) private votesReceived;

    constructor(bytes32[] memory _candidateNames) public {
        candidateNames = _candidateNames;
    }

    function stringToBytes32(string memory _candidateNames) public pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(_candidateNames);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(_candidateNames, 32))
        }
    }



    function voteTally(bytes32 candidate) public {
        require(!votingEnded);
        require(validCandidate(candidate));
        require(votesReceived[candidate] < ~uint256(0));
        require(totalVotes < ~uint256(0));

        votesReceived[candidate] += 1;
        totalVotes += 1;
    }

    function totalVotes(bytes32 candidate) view public returns (uint256) {
        require(validCandidate(candidate));
        require(votingEnded); 
        return votesReceived[candidate];
    }

    function TotalCandidates() view public returns(uint count) {
        return candidateNames.length;
    }

    function validCandidate(bytes32 candidate) view public returns (bool) {
        for(uint i = 0; i < candidateNames.length; i++) {
            if (candidateNames[i] == candidate) {
                return true;
            }
        }
        return false;
    }


}