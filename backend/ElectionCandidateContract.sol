pragma solidity >= 0.8.0;
    pragma experimental ABIEncoderV2;
   
   
   contract ElectionCandidateContract{

      struct CandidateInfo {
        string id;
        string name;
        string election_id;
        string key;
        string profile_image_hash;
        string profile_image_url;
    }

     mapping (string => mapping (string => CandidateInfo)) public candidates;

    modifier candidateNotExists(string memory _election_id, string memory _candidate_id ){
         bytes memory _candidateIDbytes = bytes(_candidate_id);
         require(_candidateIDbytes.length > 0, "Candidate ID was not passed");
         require(bytes(candidates[_election_id][_candidate_id].id).length == 0, "Candidate ID Already Exists");
         _;
     }
      modifier candidateExists(string memory _election_id, string memory _candidate_id ){
          bytes memory _candidateIDbytes = bytes(_candidate_id);
         require(_candidateIDbytes.length > 0, "Candidate ID was not passed");
         require(bytes(candidates[_election_id][_candidate_id].id).length > 0, "Candidate ID Doesn't Exists");
         _;
      }
   
    function createCandidate(string memory _election_id, CandidateInfo memory _candidateinfo) public candidateNotExists(_election_id, _candidateinfo.id ) {
     candidates[_election_id][ _candidateinfo.id] = _candidateinfo;
        
    }

    function readCandidate(string memory _election_id, string memory _candidate_id)public view candidateExists(_election_id, _candidate_id) returns (CandidateInfo memory){
       return candidates[_election_id][_candidate_id];
    }
    
    function updateCandidate(string memory _election_id, CandidateInfo memory _candidateinfo) public candidateExists(_election_id, _candidateinfo.id){
           candidates[_election_id][_candidateinfo.id]= _candidateinfo;
         }


    function deleteCandidate(string memory _election_id, string memory _candidate_id)public candidateExists(_election_id, _candidate_id){
           delete candidates[_election_id][_candidate_id];
    }


}




