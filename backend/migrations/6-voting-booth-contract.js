var VotingBoothContract = artifacts.require("VotingBoothContract");
const fs = require('fs');

module.exports = function(deployer) {
    deployer.deploy(VotingBoothContract).then(()=>{
        let json = JSON.parse(fs.readFileSync('build/contracts/VotingBoothContract.json'))
        let abi = JSON.parse(fs.readFileSync('build/abi.json'))
    
        let config  = {
          "abi_interface":json.abi,
          "address": VotingBoothContract.address
        }
    
        abi.voting_booth = config
    
        fs.writeFile('build/abi.json', JSON.stringify(abi), function (err) {
          console.log("VotingBoothContract Written");
        });
        
      });
    
}