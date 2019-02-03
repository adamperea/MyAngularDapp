pragma solidity ^0.5.2;

contract NameChange {
    
    //this declares a state variable which means it belongs to the contract's state
    //This will give us a way to store a string value to the blockchain inside the smart contract.
    string name;
    
    constructor(string memory initialName) public {
        name = initialName;
    }
	
    function showName() public view returns(string memory) {
        return name;
    }	
	
    function changeName(string memory newName) public { 
        name = newName;
    }

   
}
