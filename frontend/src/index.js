import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {VotingBoothContract, EncryptedMessage} from './contract/VotingBoothContract'

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




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
