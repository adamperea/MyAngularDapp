pragma solidity ^0.5.2;

contract PokemonAttack {
    
    //this declares a state variable which means it belongs to the contract's state
    //This will give us a way to store a string value to the blockchain inside the smart contract.
    string attack;
    
    constructor(string memory initialAttack) public {
        attack = initialAttack;
    }

    // event
    event attackChangedEvent (
        string _attack
    );
	
    function currentAttack() public view returns(string memory) {
        return attack;
    }	
	
    function changeAttack(string memory _attack) public { 
        attack = _attack;
        //emit attackChangedEvent(_attack);
    }

   
}
