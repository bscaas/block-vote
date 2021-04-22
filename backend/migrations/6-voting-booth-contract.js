var VotingBoothContract = artifacts.require("VotingBoothContract");

module.exports = function(deployer) {
    deployer.deploy(VotingBoothContract);
    
}