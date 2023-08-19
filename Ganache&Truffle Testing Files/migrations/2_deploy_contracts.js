var VotingSystem = artifacts.require("./test/VotingSystem.sol");

module.exports = function(deployer) {
  deployer.deploy(VotingSystem);
};