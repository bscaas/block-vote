import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Web3 from 'web3';
import {
  VotingBoothContract, 
  // EncryptedMessage
} from './contract/VotingBoothContract'
import ElectionContract from './contract/ElectionContract';
import  ElectionCandidateContract  from './contract/ElectionCandidateContract';
import { VoterRegistrationContract } from './contract/VoterRegistrationContract';
import ElectionTallyContract from './contract/ElectionTallyContract';
import LibertyToken from './contract/LibertyToken';
import ElectionRewardBearerContract from './contract/ElectionRewardBearer';

const config = require('./config.json')
config.contract = require('./abi.json')

const ipfsClient = require('ipfs-http-client');

async function loadWeb3() {
  if (window.ethereum) {
      await window.ethereum.enable();
      window.web3 = new Web3(window.ethereum);
    
  }
}

loadWeb3().then(()=>{
  


  window.contract = {
    election: new ElectionContract(),
    election_candidate: new ElectionCandidateContract(),
    voting_booth: new VotingBoothContract(),
    election_tally: new ElectionTallyContract(),
    voter: new VoterRegistrationContract(),
    liberty_token: new LibertyToken(),
    reward_bearer: new ElectionRewardBearerContract()
  }



  window.ipfs = ipfsClient({host: config.ipfs.host, port: config.ipfs.port, protocol: config.ipfs.protocol})

  //let y = new ElectionCandidate("Tjad","id1","tjkey","MyElection","imagehash","imageurl")

  //window.contract.election_candidate.createCandidate("MyElection", y);

  
  // WalletUtil.getPublicKey().then((key)=>{
  //   alert(key)
  //   let encrypted_msg = WalletUtil.encrypt("Hello world!", key)
  //   alert(encrypted_msg);

  //   WalletUtil.decrypt(encrypted_msg).then((x)=>{
  //     alert(x)
  //   })

  // })



  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
  
  
})




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
