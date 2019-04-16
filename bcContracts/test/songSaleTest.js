const songContract = artifacts.require('../contracts/songsContract.sol');

contract('SongsContract', function (accounts){

    let song1 = accounts[0];
    let song2 = accounts[1];
    let song3 = accounts[2];

    let customer1 = accounts[3];
    let customer2 = accounts[4];
    let customer3 = accounts[5];
    let customer4 = accounts[6];

    let artist1 = accounts[7];
    let artist2 = accounts[8];
    let artist3 = accounts[9];


    it('Initiates contract', async function(){
        const contract = await songContract.deployed();
        const songPrice = await contract.songPrice.call();
        assert.equal(songPrice, 8000000000000000, "The song price doesn't match");
    });

    it('Registers a song', async function(){
        const contract = await songContract.deployed();
        await contract.registerSong(song1, {value: 0, from: artist1});
        const isSongRegistered = await contract.isSongRegistered(song1);
        assert.equal(isSongRegistered, true, "the song was not registered");
    });

    it('Preregisters an owner', async function(){
        const contract = await songContract.deployed();
        await contract.preregisterOwner(song1, artist3, 2000, {value:0, from: artist1});
        const isNewOwner = await contract.checkOwnership(song1, {value:0, from: artist3});
        const creatorIsOwner = await contract.checkOwnership(song1, {value:0, from: artist1});
        assert.equal(creatorIsOwner, true, "The creator is not a new owner");
        assert.equal(isNewOwner, true, "Artist3 is not a new owner");
    }

    );

    it('Sees the song price', async function(){
        const contract = await songContract.deployed();
        const songPrice = await contract.viewSongPrice();
        assert.equal(parseInt(songPrice), 8000000000000000, "amount did not match");
    });

    it('Buys a song', async function(){
        const contract = await songContract.deployed();
        await contract.buy(song1, {value: 8000000000000000, from: customer1});
        const balance = await web3.eth.getBalance(contract.address);
        assert.equal(parseInt(balance), 8000000000000000, "amount did not match");
    });


    it("Sees the song's balance", async function(){
        const contract = await songContract.deployed();
        await contract.registerSong(song2, {value: 0, from: artist2});
        await contract.buy(song2, {value: 8000000000000000, from: customer2});
        await contract.buy(song2, {value: 8000000000000000, from: customer3});
        const songBalance = await contract.checkSongBalance(song2, {value: 0, from: artist2});
        assert.equal(parseInt(songBalance), 16000000000000000, "amount did not match");
    });

    it("Checks the buyer is authorized to listen to it", async function(){
        const contract = await songContract.deployed();
        await contract.registerSong(song3, {value: 0, from: artist3});
        await contract.buy(song3, {value: 8000000000000000, from: customer4});
        await contract.buy(song3, {value: 8000000000000000, from: customer1});
        const isAuthorized = await contract.isListener(song3,{value: 0, from: customer4});
        assert.equal(isAuthorized, true, "User did not buy the song");
        const isAuthorized2 = await contract.isListener(song3,{value: 0, from: customer1});
        assert.equal(isAuthorized2, true, "User did not buy the song");
        const isNotAuthorized = await contract.isListener(song3, {value: 0, from: artist1});
        assert.equal(isNotAuthorized, false, "User did bought the song");
    });
    it("transfers money to song owner when owner withdraws the money", async function(){
        const contract = await songContract.deployed();
        await contract.buy(song1, {value: 8000000000000000, from: artist2});
        await contract.buy(song1, {value: 8000000000000000, from: customer1});
        const songBalance = await contract.checkSongBalance(song1, {value: 0, from: artist1});
        assert.equal(parseInt(songBalance), 24000000000000000, "amount did not match");
        await contract.withdraw(song1, {value:0, from: artist1});
        const ownerBalance = await web3.eth.getBalance(artist1);
        assert.notEqual(parseInt(ownerBalance), 100000000000000000000, "User did not withdrew his/her funds");
    });

    it("Places song royalties on sale", async function(){
        const contract = await songContract.deployed();
        await contract.sellRoyalties(song1, 2000, 8000000000000000, {value:0, from: artist1});
        const royaltiesOffered = await contract.viewRoyaltyPointsOffered(song1, artist1, {value:0, from: customer1});
        const priceRoyaltiesOffered = await contract.viewRoyaltyOfferedPrice(song1, artist1, {value:0, from: customer1});
        assert.equal(parseInt(royaltiesOffered), 2000, "The song owner did not offer 2000 royalties");
        assert.equal((parseInt(priceRoyaltiesOffered)/parseInt(royaltiesOffered)), 8000000000000000, "The song owner did not offer them at 8000000000000000 wei each (approx $1)");
    });

    it("Withdraws royalties on sale", async function(){
        const contract = await songContract.deployed();
        await contract.withdrawOffer(song1, 1000, {value:0, from: artist1});
        const royaltiesOffered = await contract.viewRoyaltyPointsOffered(song1, artist1, {value:0, from: customer1});
        const priceRoyaltiesOffered = await contract.viewRoyaltyOfferedPrice(song1, artist1, {value:0, from: customer1});
        assert.equal(parseInt(royaltiesOffered), 1000, "The song owner did not lower the offer to 1000 royalties");
        assert.equal((parseInt(priceRoyaltiesOffered)/parseInt(royaltiesOffered)), 8000000000000000, "The song owner did not offer them at 8000000000000000 wei each (approx $1)");
    });

    it("Views price of royalties offered for a specific song", async function(){
        const contract = await songContract.deployed();
        const priceRoyaltiesOffered = await contract.viewRoyaltyOfferedPrice(song1, artist1, {value:0, from: customer1});
        assert.equal(parseInt(priceRoyaltiesOffered), 8000000000000000000, "1000 royalty points were not offered at 8000000000000000000 wei (approx $1,000)");
    });

    it("Buys royalties", async function(){
        const contract = await songContract.deployed();
        const previousRoyaltiesOffered = await contract.viewRoyaltyPointsOffered(song1, artist1, {value:0, from: customer2});
        assert.equal(parseInt(previousRoyaltiesOffered), 1000, "1000 royalties are not being offered");
        await contract.buyRoyalties(song1, artist1, {value:8000000000000000000, from: customer2});
        const isNewOwner = await contract.checkOwnership(song1, {value:0, from: customer2});
        const newSellerRoyalties = await contract.checkRoyaltyPoints(song1, {value:0, from: artist1});
        const newBuyerRoyalties = await contract.checkRoyaltyPoints(song1, {value:0, from: customer2});
        const royaltiesOffered = await contract.viewRoyaltyPointsOffered(song1, artist1, {value:0, from: customer2});
        const priceRoyaltiesOffered = await contract.viewRoyaltyOfferedPrice(song1, artist1, {value:0, from: customer2});
        assert.equal(isNewOwner, true, "The buyer is not a new owner");
        assert.equal(parseInt(newSellerRoyalties), 7000, "the royalty points of the seller were not updated");
        assert.equal(parseInt(newBuyerRoyalties), 1000, "the royalty points of the buyer were not updated");
        assert.equal(parseInt(royaltiesOffered), 0, "The royalty points on sale of the seller were not updated to zero");
        assert.equal(parseInt(priceRoyaltiesOffered), 0, "The royalty points price of the seller was not updated to zero");
    });

    it("Views the maximum royalty points available per song", async function(){
        const contract = await songContract.deployed();
        const songPrice = await contract.viewMaxRoyaltyPoints();
        assert.equal(parseInt(songPrice), 10000, "amount did not match");
    });
});