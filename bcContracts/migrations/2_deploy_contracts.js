var songsContract = artifacts.require("songsContract");

module.exports = function(deployer){
    deployer.deploy(songsContract);
}