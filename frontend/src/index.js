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
import WalletUtil from './util/wallet-util';
import { ElectionCandidate, ElectionCandidateContract } from './contract/ElectionCandidateContract';
import ElectionBallot from './ElectionBallot';
import DecryptVote from './DecryptVote';
let config = require('./config.json')

let Contract = require('web3-eth-contract');


async function loadWeb3() {
  if (window.ethereum) {
      await window.ethereum.enable();
      window.web3 = new Web3(window.ethereum);
    
  }
}

loadWeb3().then(()=>{
  


  window.contract = {
    voting_booth: new VotingBoothContract(),
  }
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

  
})



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
