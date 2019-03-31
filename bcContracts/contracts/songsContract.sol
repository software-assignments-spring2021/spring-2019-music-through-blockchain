pragma solidity ^0.5.0;

contract SongsContract{

    struct Owner{
        address owner;
        uint16 royaltyPoints;
        uint16 royaltyPointsOffered;
        uint pricePerRoyaltyPoint;
    }

    struct Song {
        uint balance;
        address creator;
        uint ownersSize;
        mapping (address => Owner) owners;
        
    }

    uint public constant songPrice = 8000000000000000; // approximately 1 dollar represented in wei (1 eth = 10^17 wei)
    uint16 public constant MAX_ROYALTY_POINTS = 10000;

    mapping (address => Song) public songs ;
    mapping (address => bool) public authorizedListeners; //People who bought the song
    mapping (address => uint) public royaltiesPayable; //ether payable to royalty sellers;

    function registerSong(address songAddress) public returns (bool success){
        require(!isSongRegistered(songAddress), "The song is already registered");
        Owner memory currentOwner = Owner(msg.sender, MAX_ROYALTY_POINTS,0,0);

        Song memory currentSong = Song(0,msg.sender,0);
        songs[songAddress] = currentSong;
        songs[songAddress].ownersSize += 1;
        songs[songAddress].owners[msg.sender] = currentOwner;

        return true;
    }

    function registerOwner(address songAddress, address newOwner) internal returns (bool){
        require(isSongRegistered(songAddress), "The song is already registered");
        
        //check if buyer was already an owner
        if(!isOwner(songAddress, newOwner)){
            //not an owner
            Owner memory newOwner;
            newOwner.owner = msg.sender;
            songs[songAddress].ownersSize += 1;
            songs[songAddress].owners[msg.sender] = newOwner;
        }    
        return true;
    }

    //buy song, as of the authorization to listen the to song.
    function buy(address payable songAddress) public payable returns(bool success){
        require(isSongRegistered(songAddress), "The song is not registered");
        require(msg.value == songPrice);
        songs[songAddress].balance += msg.value;
        authorizedListeners[msg.sender] = true;
        return true;
    }
    
    //places phonogram royalties on sale
    function sellRoyalties(address songAddress, uint16 royalties, uint newPricePerRoyaltyPoint) public returns (bool success){
        require(isOwner(songAddress, msg.sender), "This is not an owner of the song");
        require(royalties <= viewMaxRoyaltyPoints(), "You can't sell more royalties than the existing ones");
        uint16 ownedRoyalties = viewOwnRoyaltyPoints(songAddress, msg.sender);
        require(royalties <= ownedRoyalties, "You can't sell more royalties than what you own");
        require(royalties > 0, "You have to sell at least one royalty point");

        songs[songAddress].owners[msg.sender].royaltyPointsOffered += royalties; 
        songs[songAddress].owners[msg.sender].pricePerRoyaltyPoint = newPricePerRoyaltyPoint;

        return true;
    }

    //withdraws x amount of royalty points currently on sale from being sold.
    function withdrawOffer(address songAddress, uint16 royalties) public returns (bool success){
        require(isOwner(songAddress, msg.sender), "This is not an owner of the song");
        require(royalties <= viewMaxRoyaltyPoints(), "You can't withdraw more royalties than the existing ones");
        uint16 ownedRoyalties = viewOwnRoyaltyPoints(songAddress, msg.sender);
        require(royalties <= ownedRoyalties, "You can't withdraw more royalties than what you own");
        require(songs[songAddress].owners[msg.sender].royaltyPointsOffered + royalties <= ownedRoyalties, "You can't withdraw more royalties than what you offered");

        songs[songAddress].owners[msg.sender].royaltyPointsOffered -= royalties; 

        return true;
    }

    //this buys all the royalties offered (to keep it simple for now)
    function buyRoyalties(address songAddress, address seller) public payable returns (bool success){
        require(isOwner(songAddress, seller), "That seller is not an owner of the song");
        uint royaltiesPrice = viewRoyaltyOfferedPrice(songAddress, seller);
        require(msg.value == royaltiesPrice);

        royaltiesPayable[seller] += msg.value;

        registerOwner(songAddress, msg.sender);
        //this should not be false at this point
        assert(isOwner(songAddress, msg.sender));
        
        uint16 royaltiesOffered = songs[songAddress].owners[seller].royaltyPointsOffered;
        songs[songAddress].owners[msg.sender].royaltyPoints += royaltiesOffered;
        songs[songAddress].owners[seller].royaltyPoints -= royaltiesOffered;
        songs[songAddress].owners[seller].royaltyPointsOffered = 0;
        songs[songAddress].owners[seller].pricePerRoyaltyPoint = 0;

        return true; 
    }
    

    function viewSongPrice() public pure returns(uint){
        return(songPrice);
    }

    function viewMaxRoyaltyPoints() public pure returns(uint16){
        return(MAX_ROYALTY_POINTS);
    }

    //Checks royalty points of 3rd parties and is only accessed by the contract
    function viewOwnRoyaltyPoints(address songAddress, address caller) internal view returns(uint16){
        require(isOwner(songAddress, caller), "This is not an owner of the song.");
        return(songs[songAddress].owners[caller].royaltyPoints);
    }
    //checks royalty points of caller, accessed by only by users
    function checkRoyaltyPoints(address songAddress) external view returns(uint16){
        require(isOwner(songAddress, msg.sender), "This is not an owner of the song.");
        return(songs[songAddress].owners[msg.sender].royaltyPoints);
    }

    function viewRoyaltyPointsOffered(address songAddress, address owner) public view returns(uint16){
        require(isOwner(songAddress, owner), "This is not an owner of the song.");
        return(songs[songAddress].owners[owner].royaltyPointsOffered);
    }

    function viewRoyaltyOfferedPrice(address songAddress, address owner) public view returns(uint){
        require(isOwner(songAddress, owner), "This is not an owner of the song.");
        uint priceRoyalties = songs[songAddress].owners[owner].royaltyPointsOffered * songs[songAddress].owners[owner].pricePerRoyaltyPoint;
        return priceRoyalties;
    }

    //Checks ownership of 3rd parties and is only accessed by the contract
    function isOwner(address songAddress, address caller) internal view returns(bool){ 
        require(isSongRegistered(songAddress), "The song is not registered");
        if(songs[songAddress].owners[caller].owner == caller){
            return true;
        }
        return false;
    }

    //checks ownership of caller, accessed by only by users
    function checkOwnership(address songAddress) external view returns(bool){ 
        require(isSongRegistered(songAddress), "The song is not registered");
        if(songs[songAddress].owners[msg.sender].owner == msg.sender){
            return true;
        }
        return false;
    }

    function isSongRegistered(address songAddress) public view returns(bool){
        if(songs[songAddress].ownersSize > 0 ){
            return true;
        }
        else{
            return false;
        }
    }

    function checkSongBalance(address songAddress) public view returns(uint){
        require(isSongRegistered(songAddress), "The song is not registered");
        require(isOwner(songAddress, msg.sender), "This is not an owner");
        return(songs[songAddress].balance);
    }

    function isListener() public view returns(bool){
        //"You have not bought this song yet."
        if(authorizedListeners[msg.sender]){
            return true;
        }
        else{
            return false;
        }
    }

    function withdraw(address songAddress) public {
        require(isSongRegistered(songAddress), "The song is not registered");
        require(isOwner(songAddress, msg.sender), "This is not an owner of the song.");
        uint songBalance = songs[songAddress].balance;
        require(songs[songAddress].balance > 0, "There is nothing to withdraw");
        require(songs[songAddress].balance >= MAX_ROYALTY_POINTS, "The current song's balance is too low to make a withdrawal");
        
        Owner memory currentOwner = songs[songAddress].owners[msg.sender];
        uint amount = (songBalance/MAX_ROYALTY_POINTS)*currentOwner.royaltyPoints;
        amount += royaltiesPayable[msg.sender];
        msg.sender.transfer(amount);
        royaltiesPayable[msg.sender] = 0;
        songs[songAddress].balance -= amount;

    }
}