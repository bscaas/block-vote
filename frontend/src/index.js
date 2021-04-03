import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Web3 from 'web3';
import {VotingBoothContract, EncryptedMessage} from './contract/VotingBoothContract'
import WalletUtil from './util/wallet-util';

let config = require('./config.json')

let Contract = require('web3-eth-contract');

Contract.setProvider(config.provider);


window.contract = {
  voting_booth: new VotingBoothContract(),
}



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


async function loadWeb3() {
  if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
  }
}

loadWeb3().then(()=>{

  let x = new WalletUtil()

  
})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
