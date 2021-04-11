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

    modifier candidateNotExists(string memory _election_id, string memory _candidate_id ){
         bytes memory _candidateIDbytes = bytes(_candidate_id);
         require(bytes(candidates[_election_id][_candidate_id].Candidate_ID).length == 0, "Candidate ID Already Exists");
         require(_candidateIDbytes.length > 0, "Candidate ID was not passed");
         _;
     }
      modifier candidateExists(string memory _election_id, string memory _candidate_id ){
          bytes memory _candidateIDbytes = bytes(_candidate_id);
         require(bytes(candidates[_election_id][_candidate_id].Candidate_ID).length > 0, "Candidate ID Doesn't Exists");
         require(_candidateIDbytes.length > 0, "Candidate ID was not passed");
         _;
      }


   
    function createCandidate(string memory _election_id, CandidateInfo memory _candidateinfo) public candidateNotExists(_election_id, _candidateinfo.Candidate_ID ) {
     candidates[_election_id][ _candidateinfo.Candidate_ID] = _candidateinfo;
        
    }

    function readCandidate(string memory _election_id, string memory _candidate_id)public view candidateExists(_election_id, _candidate_id) returns (CandidateInfo memory){
       return candidates[_election_id][_candidate_id];
    }
    
    function updateCandidate(string memory _election_id, CandidateInfo memory _candidateinfo) public candidateExists(_election_id, _candidateinfo.Candidate_ID){
           candidates[_election_id][_candidateinfo.Candidate_ID]= _candidateinfo;
         }


    function deleteCandidate(string memory _election_id, string memory _candidate_id)public candidateExists(_election_id, _candidate_id){
           delete candidates[_election_id][_candidate_id];
    }


}




