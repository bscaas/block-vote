var ElectionTally = artifacts.require("ElectionTallyContract");

module.exports = function(deployer) {
  deployer.deploy(ElectionTally);
}