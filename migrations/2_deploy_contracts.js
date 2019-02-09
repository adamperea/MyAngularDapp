
var NameChange = artifacts.require("./NameChange.sol");


module.exports = function(deployer) {
  //this is how we are passing the parameter to the constructor on deploy
  deployer.deploy(NameChange, 'Mr. Butter');
};