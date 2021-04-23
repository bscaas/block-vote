var ElectionTally = artifacts.require("ElectionTallyContract");
const fs = require('fs');

module.exports = function(deployer) {
  deployer.deploy(ElectionTally).then(()=>{
    let json = JSON.parse(fs.readFileSync('build/contracts/ElectionTallyContract.json'))
    let abi = JSON.parse(fs.readFileSync('build/abi.json'))

    let config  = {
      "abi_interface":json.abi,
      "address": ElectionTally.address
    }

    abi.election_tally = config

    fs.writeFile('build/abi.json', JSON.stringify(abi), function (err) {
      console.log("ElectionTallyContract Written");
    });
    
  });
}