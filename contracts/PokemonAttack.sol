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
	
    function changeAttack(string memory _attack) public returns (bool){ 
        attack = _attack;
        emit attackChangedEvent(_attack);

        return true;
    }

    //function balanceOf() public view returns(uint){
       
       /*Important node.
       'this' in Solidity represents a instance of the smart contract which we deployed
       Prior to version 0.5.0, Solidity allowed address members to be accessed by a contract instance, 
       for example this.balance.
       This is now forbidden and an explicit conversion to address must be done: address(this).balance.
       */
        //return address(this).balance;
    //}

    

   
}
