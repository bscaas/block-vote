
var ElectionRewardBearer = artifacts.require("ElectionRewardBearer");
var LibertyToken = artifacts.require("LibertyToken");


module.exports = function(deployer) {
   
  deployer.deploy(LibertyToken).then(()=>{
    return deployer.deploy(ElectionRewardBearer, LibertyToken.address);
  });
  
    
}