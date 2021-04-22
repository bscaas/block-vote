var ElectionCandidateContract = artifacts.require("ElectionCandidateContract");

module.exports = function(deployer) {
  deployer.deploy(ElectionCandidateContract);
}