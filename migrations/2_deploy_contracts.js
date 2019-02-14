
var contract = artifacts.require("./PokemonAttack.sol");


module.exports = function(deployer) {
  //this is how we are passing the parameter to the constructor on deploy
  deployer.deploy(contract, 'Dragon Tail');
};