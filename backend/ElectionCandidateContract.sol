pragma solidity >= 0.8.0;
    pragma experimental ABIEncoderV2;
   
   
   contract ElectionCandidateContract{

      struct CandidateInfo {
        string Candidate_Name;
        string Candidate_ID;
        string Candidate_Key;
        string Election_ID;
        bytes Profile_Image;
        string Profile_Image_Hash;
        string url;
    }

    mapping (string => mapping (string => CandidateInfo)) public candidates;
       
    function createCandidate(string memory _election_id, CandidateInfo memory _candidateinfo) public {
        candidates[_election_id][ _candidateinfo.Candidate_ID] = _candidateinfo;
        
    }

    function readCandidate(string memory _election_id, string memory _candidate_id)public view returns (CandidateInfo memory){
       return candidates[_election_id][_candidate_id];
    }
    
    function updateCandidate(string memory _election_id, CandidateInfo memory _candidateinfo) public{
           candidates[_election_id][_candidateinfo.Candidate_ID]= _candidateinfo;
         }


    function deleteCandidate(string memory _election_id, string memory _candidate_id)public{
           delete candidates[_election_id][_candidate_id];
    }


}




