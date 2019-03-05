pragma solidity ^0.5.0;

contract songSale{
    uint public constant songPrice = 8000000000000000; // approximately 1 dollar represented in wei (1 eth = 10^17 wei)

    mapping (address => uint) songsPayable;
    mapping (address => bool) authorizedListeners; //People who bought the song

    function buy(address payable songAddress) public payable returns(bool){
        require(msg.value == songPrice);
        songsPayable[songAddress] += msg.value;
        authorizedListeners[msg.sender] = true;
    }

    function viewSongPrice() public pure returns(uint){
        return(songPrice);
    }

    function checkSongBalance() public view returns(uint){
        require(songsPayable[msg.sender] > 0, "you are either not authorized to see this balance or the balance is zero.");
        return(songsPayable[msg.sender]);
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

    function withdraw() public {
        require(songsPayable[msg.sender] > 0, "There is nothing to withdraw");
        msg.sender.transfer(songsPayable[msg.sender]);
        songsPayable[msg.sender] = 0;
    }
}