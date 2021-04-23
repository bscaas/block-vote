
var ElectionRewardBearer = artifacts.require("ElectionRewardBearer");
var LibertyToken = artifacts.require("LibertyToken");

const fs = require('fs');

module.exports = function(deployer) {
   
  deployer.deploy(LibertyToken).then(()=>{

    let json = JSON.parse(fs.readFileSync('build/contracts/LibertyToken.json'))
    let abi = JSON.parse(fs.readFileSync('build/abi.json'))

    let config  = {
      "abi_interface":json.abi,
      "address": LibertyToken.address
    }

    abi.liberty_token = config

    fs.writeFile('build/abi.json', JSON.stringify(abi), function (err) {
      console.log("LibertyToken Written");
    });
    


    return deployer.deploy(ElectionRewardBearer, LibertyToken.address).then(()=>{
      let json = JSON.parse(fs.readFileSync('build/contracts/ElectionRewardBearer.json'))
      let abi = JSON.parse(fs.readFileSync('build/abi.json'))
  
      let config  = {
        "abi_interface":json.abi,
        "address": ElectionRewardBearer.address
      }
  
      abi.election_reward = config
  
      fs.writeFile('build/abi.json', JSON.stringify(abi), function (err) {
        console.log("ElectionRewardBearer Written");
      });
      
    });
  });
  
    
}