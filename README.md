# Distributing Music Through the Blockchain

[![Build Status](https://travis-ci.com/nyu-software-engineering/music-through-blockchain.svg?branch=master)](https://travis-ci.com/nyu-software-engineering/music-through-blockchain)

### Authors:
- Kalea Palmer
- Ann Dang
- Isaac Blinder
- Nicolas Lopierre Aguirre 

## What is the project about?
We are creating a platform where artists are able to sell their songs as well as the royalties of the songs to users interested in music, using blockchain contracts. 

## Why this project?
The music industry has seen a big change in the last decade thanks to the massive embrace that streaming platforms have had. Although it took a while, such platforms are finally being profitable but artists have not been able to see their profits grow proportionally. The amount of intermediaries between the artist and the end-user platforms that serve as revenue streams for the industry don't allow enough transparency for the artists, and makes their earnings less liquid. In order to make the industry more transparent to artist and cut some of the intermediaries, we are enabling the artists to directly market their assets through our platform and directly receive their revenues using smart contracts, taking into account the percentage of royalties of each owner of the songs. By constructing a new marketplace to sell music, we can potentially increase the margin of profits for the artists.

## How to contribute to the project
In order to contribute to this project, add any issues that you see in the code or the system through github. You can also contact us through our Slack channel: #group_bmusic.


## Commands for Installing, Starting, Building and Testing the project 

To Install: 
- clone the repository
- make sure you have both package managers, yarn and npm, installed and run the following:

```
// for yarn: 
yarn install 

// for npm:
npm install

```
- make sure that truffle is also installed

```
npm install truffle -g
```

- download and install ganache from this website: [Ganache](https://truffleframework.com/ganache)
- download and install metamask from this website: [MetaMask](https://metamask.io/)

To Build and Start the App:

- run ganache in a quick start workspace
- go to settings in ganache, click on server, change the port to 8545, and then click on 'Save and Restart'.
- copy the mnemonic phrase as shown on the top part of the ganache window.
- Inside the main folder, go to the src folder and add the fbconfig file, which will be given to you by one of the owners of the app.
- in the command line, build and start the app by inputting the following command:
```
npm start
```
- when the tab opens, metamask will ask to login. If it is the first time running the app, import a wallet by pasting the mnemonic phrase in metamask where it says seed phrase. 
- create a new password for your wallet.
- connect your metamask account with bMusic.
- sign up to our website and start trading!

To Test Front - End:

```
// for yarn: 
yarn test 

// for npm:
npm test
```

To Test Back - End:

```
cd bcContracts

truffle test

```
In order to build and test the project, we are going to use two methods:

### Unit Tests
We will create unit tests to make sure that the system is behaving the way it is supposed to and that it doesn't have any security issues in order to protect the confidential information of our users.

To test the contracts, please install ganache and truffle in your machine. Truffle is a dependency in this project so you only need to npm install when you download this. If using ganache, leave the truffle-config.js as it is. If using truffle, change the development port from 7545 to 9545. To test the code, you only need to run truffle test in the command line inside the bcContracts folder. The test will output in the command line or terminal depending on what you are using. 

Testing the contracts require a little familiarity with Ethereum. We recommend taking this tutorial to get familiar with the blockchain technology: [Ethereum: Building Blockchain Decentralized Apps (DApps)](https://www.lynda.com/JavaScript-tutorials/Ethereum-Building-Blockchain-Decentralized-Apps-DApps/706935-2.html). We uploaded a document with some notes that you may find useful since the current version of Solidity has been upgraded. You can find the notes [here](https://github.com/nyu-software-engineering/music-through-blockchain/blob/smartContracts/EthereumTutorialNotes.md). They are also in a link below called "Ethereum Tutorial Notes".

Check the [metamask and ganache instructions](https://github.com/nyu-software-engineering/music-through-blockchain/blob/smartContracts/metamask.md) to set them up.

### Alpha Tests with users
We will also test the software with potential end-users consisting of artists, music aficionados, and our project's stakeholders. We will iterate and evolve from each of this interviews to bring the best possible product.

## Relevant Information
 - [CONTRIBUTING.md](https://github.com/nyu-software-engineering/music-through-blockchain/blob/master/CONTRIBUTING.md)
 - [REQUIREMENTS.MD](https://github.com/nyu-software-engineering/music-through-blockchain/blob/master/REQUIREMENTS.md)
 - [Ethereum Tutorial Notes](https://github.com/nyu-software-engineering/music-through-blockchain/blob/smartContracts/EthereumTutorialNotes.md)
 - [MetaMask.md](https://github.com/nyu-software-engineering/music-through-blockchain/blob/master/metamask.md)
