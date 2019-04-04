# Models

Date: Feb 27, 2019
```
user: 
            {
              // this userId links to firebase's user
              // anyone in charge of account
              name : "Johnny" <string> 
              artistName: "Some Band or Artist Name" <string> 
              photoUrl: "https://bMusic.com/img/tom.jpg", <string>
              // songsWithRoaylties is an array with song ids that user has listed for sale
              songsWithRoyalties: ["songOne", "songTwo"] Array<string>
              // songsCanListenTo is an array with song ids that user can listen to
              songsCanListenTo:  ["songOne", "songTwo"] Array<string>
              walletAddress: " " <string>
              biography: <string>,
              /*other fields that will be inherited from the firebase's
               user auth  model:
              userId: "userOne" <string>
              email : "example@gmail.com"
              password : ""
              */
            }

    song: 
            {
              songId: "songOne" <string> ,
              title: "Title", <string>, 
              //dictionary that allows retrieval of song price by ownerId and songId
              prices: {userId: (percentage: 5% <number>, totalPrice: 5$ <number>) },
              songFile: " " <string>
            }

```
//helper table to support many to many relationship between artist and song;

