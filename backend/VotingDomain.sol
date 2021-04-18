pragma solidity >= 0.8.0;

library VotingDomain{
    struct VoteFragment{
        string election_id;
        string candidate_key_fragment;
        uint candidate_key_fragment_position;
        string vote_id;
    }

    struct Vote{
        string id;
        VoteFragment[] fragments;
    }
    
}