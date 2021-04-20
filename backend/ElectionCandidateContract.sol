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

     mapping (string => mapping (string => CandidateInfo)) candidates;
     mapping (string => string[]) candidate_ids;
     mapping (string => string[]) candidate_keys;
     mapping (string => mapping(string=>bool)) candidate_key_exist;
     mapping (string => mapping(string=>bool)) candidate_name_exist;

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
        require(!candidate_key_exist[_election_id][_candidateinfo.key], "Duplicate candidate key for election.");
        require(!candidate_name_exist[_election_id][_candidateinfo.name], "Duplicate candidate name for election.");

        candidates[_election_id][ _candidateinfo.id] = _candidateinfo;
        candidate_ids[_election_id].push(_candidateinfo.id);

        candidate_keys[_election_id].push(_candidateinfo.key);
        candidate_key_exist[_election_id][_candidateinfo.key] = true;

        candidate_name_exist[_election_id][_candidateinfo.name] = true;
        
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


    function listCandidateIds(string memory election_id) public view returns(string[] memory){
      return candidate_ids[election_id];  
    }

    function listCandidates(string memory election_id) public view returns(CandidateInfo[] memory){
      string[] memory ids = candidate_ids[election_id];
      CandidateInfo[] memory results = new CandidateInfo[](ids.length);
      for(uint i=0; i < ids.length; i++){
        results[i] = candidates[election_id][ids[i]];
      }
      return results;
    }

    function listCandidateKeys(string memory election_id) public view returns(string[] memory){
      return candidate_keys[election_id];  
    }

}




