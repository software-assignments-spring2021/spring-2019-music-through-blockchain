var songsContract = artifacts.require("./songsContract.sol");

module.exports = function(deployer){
    deployer.deploy(songsContract);
}
