# Models

Date: Feb 27, 2019

user: 
            {
              // this userId links to firebase's user
              userId: "userOne" <string>
              // anyone in charge of account
              accountOwner : "Johnny" <string> 
              photoUrl: "https://bMusic.com/img/tom.jpg", <string>
              // songs owned is an array with song ids. 
              // to retrieve songs that user purhchased, just return the whole array with array-contains
              // to retrieve songs that user has posted, return array where song owner matches the song's ownerId 
              songsOwned: ["songOne", "songTwo"] Array<string>
              artistName: "Some Band or Artist Name" <string> 
              walletAddress: " " <string>
              /*other fields that will be inherited from the firebase's
               user auth  model:
              "email" : "example@gmail.com"
              "password" : ""
              */
            }

    song: 
            {
              songId: "songOne" <string> ,
              //some artist Id
              uploadedBy: "userOne", <string>  
              title: "Title", <string>
              //value in dollars
              price: "100" <number> 
              remainingShare: "20" <number>
            }
//helper table to support many to many relationship between artist and song;
    song_artist: 
            {
              songId: "songOne", <string>
              //some artist Id
              //quick link between artist and song to get ownership %
    	  artistId: "artistOne" <string>
            }

reference: //https://angularfirebase.com/lessons/firestore-nosql-data-modeling-by-example/#Structuring-Likes-Hearts-Thumbs-Up-Votes-Etc
