# Notes on Ethereum

## Set up:
Make sure you download:
 - [Truffle](https://truffleframework.com/truffle)
 - [Ganache](https://truffleframework.com/ganache)
 - [geth](https://geth.ethereum.org/downloads/)

## Solidity:
When creating a simple contract, make sure that the first line is always the compiler version, which would be:
```bash
pragma solidity ^0.5.0
```

### Some useful code to know:
There are things functions called modifiers, which sort of add some code on a function to make it act accordingly to certain conditions. Here are some examples:
 - pure: Lighter weight call to constant variable so it doesn't cost gas
 - external: allows function to be accessed outside the contract
 - payable: allows function to receive deposits when called and stores them in the contract.
 - returns(): state the data type to be returned by the function.
 
There are also some functions and objects that will frequently appear in the contracts:
 - require(): it is like an if stateent that inmediately returns funds to sender if conditions are not met.
 - msg: The object with data received
 - - msg.value: weis received
 - - msg.sender: the address of the sender.

### Transfer vs Sender
There are different ways to send funds. Essentially, using 
```bash
address.send()
```
or 
```bash
address.transfer()
```

accomplish the same, but `send()` returns true or false depending whether the transactions was succesfull or not. `transfer()` throws an error. It is usually prefered to use transfer. Please read more about it here: [Sending and receiving ether](https://solidity.readthedocs.io/en/v0.5.4/security-considerations.html#sending-and-receiving-ether). It is also recommended that instead of sending funds, we can use a withdrawal system as described [here](https://solidity.readthedocs.io/en/v0.5.4/common-patterns.html#withdrawal-pattern).

### 0.5.0+ Solidity pet peeves

make sure you also add the payable modifier before declaring the variable which will receive funds like this:
```
address payable public receiver;
```

### Compilation and Migration
This is to deploy a contract to the network.

Follow the instructions from the tutorial. When setting up the network, instead of creating a truffle.js file, use the truffle-config.js file. The code is already commented. You only need to uncomment. Also, in the port, make sure its using either 7545 (The port from Ganache), or 9545 (the port from truffle).

### Testing the contract
There is a small issue with testing whether the deposit was made. web3.eth.getBalance doesn't return a number but a Promise<string>, which is an object that is later turned into a string due some asynchronous JS capabilities. So when you try to run the tests, the first one will pass but the second one will not. Don't worry, just use this line to console.log the balance in the contract and compare it to whatever amount you are sending:

```
web3.eth.getBalance(contract.address).then(console.log);
```

## Web3.js
Use this to install:

```
npm install -g web3
```

For the tutorial, stick with the web3.min.js file provided in the folders. It seems like the latest version is not very well documented and a little broken.

When setting up the provider, remember that the port for ganache is 7545 and for truffle is 9545. 