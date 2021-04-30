pragma solidity ^0.4.24;


contract PiggyBankTru  {

address owner;

struct Alcancia {
address owner;
uint balanceUsuario;
uint transacciones;
}

mapping( address => Alcancia ) private users;

event Transfer( address , uint );

constructor() public {
owner = msg.sender;
}



function getAlcancia(address cuenta) public view returns( uint ) {
Alcancia memory usuario = users[cuenta];
return usuario.balanceUsuario;
}


function depositAmount(uint256 amount) payable public {
require(msg.value == amount);
Alcancia storage usuario = users[msg.sender];
usuario.owner = msg.sender;
usuario.balanceUsuario += amount;
usuario.transacciones += 1; 
emit Transfer( msg.sender , amount );
}


function withdraw( uint amount ) public {
Alcancia storage usuario = users[msg.sender];

require( usuario.owner == msg.sender );
require( usuario.balanceUsuario >= amount );
usuario.balanceUsuario -= amount;
usuario.transacciones += 1;
emit Transfer( msg.sender , amount );
return msg.sender.transfer(amount);
}

function getBalance() public view returns ( uint ){
return address(this).balance;
}

function getBalanceInEther() public view returns ( uint ) {
return getBalance() / 1e18;
}

function transferTo( uint amount , address to ) public isOwner {
require( address(this).balance >= amount );
require( to != address(0));
to.transfer(amount);
}

modifier isOwner(){
require( msg.sender == owner );
_;
}





}