var VoterRegistrationContract = artifacts.require("VoterRegistrationContract");
var RegistrationUtility = artifacts.require("RegistrationUtility");
const fs = require('fs');

module.exports = function(deployer) {
  deployer.deploy(RegistrationUtility)
  deployer.link(RegistrationUtility, VoterRegistrationContract)
  deployer.deploy(VoterRegistrationContract).then(()=>{
    let json = JSON.parse(fs.readFileSync('build/contracts/VoterRegistrationContract.json'))
    let abi = JSON.parse(fs.readFileSync('build/abi.json'))

    let config  = {
      "abi_interface":json.abi,
      "address": VoterRegistrationContract.address
    }

    abi.voter_registration = config

    fs.writeFile('build/abi.json', JSON.stringify(abi), function (err) {
      console.log("VoterRegistrationContract Written");
    });
    
  });

}