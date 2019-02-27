# Models

Date: Feb 27, 2019

user: 
            {
              // this userId links to firebase's user
              userId: "userOne"
              displayName : "Johnny"
              photoUrl: "https://bMusic.com/img/tom.jpg",
              // songs owned is an array with song ids. 
              // to retrieve songs that user purhchased, just return the whole array with array-contains
              // to retrieve songs that user has posted, return array where song owner matches the song's ownerId 
              songsOwned: [1, 2]
              /*other fields that will be inherited from the firebase's
               user auth  model:
              "email" : "example@gmail.com"
              "password" : ""
              */
            }

    song: 
            {
              songId: "songOne",
              //some artist Id
              uploadedBy: "1", 
              title: "Title",
              price: "$100"
              remainingShare: "20%"
            }

    song_artist: 
            {
              songId: "songOne",
              //some artist Id
    					//quick link between artist and song to get ownership %
    	        artistId: "artistOne"
            }

reference: //https://angularfirebase.com/lessons/firestore-nosql-data-modeling-by-example/#Structuring-Likes-Hearts-Thumbs-Up-Votes-Etc