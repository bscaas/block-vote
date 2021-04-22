var VoterRegistrationContract = artifacts.require("VoterRegistrationContract");
var RegistrationUtility = artifacts.require("RegistrationUtility");
module.exports = function(deployer) {
  deployer.deploy(RegistrationUtility)
  deployer.link(RegistrationUtility, VoterRegistrationContract)
  deployer.deploy(VoterRegistrationContract);

}