
var NameChange = artifacts.require("./NameChange.sol");

module.exports = function(deployer) {
  deployer.deploy(NameChange, 'Moby Dick');
};