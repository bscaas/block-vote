var ElectionContract = artifacts.require("ElectionContract");
const fs = require('fs');


module.exports = function(deployer) {
  deployer.deploy(ElectionContract).then(()=>{
    let json = JSON.parse(fs.readFileSync('build/contracts/ElectionContract.json'))
    let abi = {}

    let config  = {
      "abi_interface":json.abi,
      "address": ElectionContract.address
    }

    abi.election = config

    fs.writeFile('build/abi.json', JSON.stringify(abi), function (err) {
      console.log("ElectionContract Written");
    });
    
  });

  
};