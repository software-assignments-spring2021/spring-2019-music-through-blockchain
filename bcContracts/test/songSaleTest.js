const songSale = artifacts.require('../contracts/songSale.sol');

contract('songSale', function (accounts){

    it('Initiates contract', async function(){
        const contract = await songSale.deployed();
        const songPrice = await contract.songPrice.call();
        assert.equal(songPrice, 8000000000000000, "The song price doesn't match");
    });

    it('Buys a song', async function(){
        const contract = await songSale.deployed();
        await contract.buy(accounts[2], {value: 8000000000000000, from: accounts[1]});
        const balance = await web3.eth.getBalance(contract.address);
        assert.equal(parseInt(balance), 8000000000000000, "amount did not match");
    });

    it('Sees the song price', async function(){
        const contract = await songSale.deployed();
        const songPrice = await contract.viewSongPrice();
        assert.equal(parseInt(songPrice), 8000000000000000, "amount did not match");
    });
    it("Sees the song's balance", async function(){
        const contract = await songSale.deployed();
        await contract.buy(accounts[3], {value: 8000000000000000, from: accounts[4]});
        await contract.buy(accounts[3], {value: 8000000000000000, from: accounts[2]});
        const songBalance = await contract.checkSongBalance({value: 0, from: accounts[3]});
        assert.equal(parseInt(songBalance), 16000000000000000, "amount did not match");
    });
    it("Checks the buyer is authorized to listen to it", async function(){
        const contract = await songSale.deployed();
        await contract.buy(accounts[3], {value: 8000000000000000, from: accounts[4]});
        await contract.buy(accounts[3], {value: 8000000000000000, from: accounts[2]});
        const isAuthorized = await contract.isListener({value: 0, from: accounts[4]});
        assert.equal(isAuthorized, true, "User did not buy the song");
        const isAuthorized2 = await contract.isListener({value: 0, from: accounts[2]});
        assert.equal(isAuthorized2, true, "User did not buy the song");
        const isNotAuthorized = await contract.isListener({value: 0, from: accounts[5]});
        assert.equal(isNotAuthorized, false, "User did bought the song");
    });
    it("transfers money to song owner when owner withdraws the money", async function(){
        const contract = await songSale.deployed();
        await contract.buy(accounts[6], {value: 8000000000000000, from: accounts[4]});
        await contract.buy(accounts[6], {value: 8000000000000000, from: accounts[2]});
        const songBalance = await contract.checkSongBalance({value: 0, from: accounts[6]});
        assert.equal(parseInt(songBalance), 16000000000000000, "amount did not match");
        await contract.withdraw({value:0, from: accounts[6]});
        const ownerBalance = await web3.eth.getBalance(accounts[6]);
        assert.notEqual(parseInt(ownerBalance), 100000000000000000000, "User did not withdrew his/her funds");
    });
});
