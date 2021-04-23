var ElectionCandidateContract = artifacts.require("ElectionCandidateContract");
const fs = require('fs');

module.exports = function(deployer) {
  deployer.deploy(ElectionCandidateContract).then(()=>{
    let json = JSON.parse(fs.readFileSync('build/contracts/ElectionCandidateContract.json'))
    let abi = JSON.parse(fs.readFileSync('build/abi.json'))

    let config  = {
      "abi_interface":json.abi,
      "address": ElectionCandidateContract.address
    }

    abi.election_candidate = config

    fs.writeFile('build/abi.json', JSON.stringify(abi), function (err) {
      console.log("ElectionCandidateContract Written");
    });
    
  });
}