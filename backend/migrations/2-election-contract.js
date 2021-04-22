var ElectionContract = artifacts.require("ElectionContract");

module.exports = function(deployer) {
  deployer.deploy(ElectionContract);

  
};