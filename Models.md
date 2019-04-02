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
              // songs owned is an array with song ids. 
              // to retrieve songs that user purhchased, just return the whole array with array-contains
              // to retrieve songs that user has posted, return array where song owner matches the song's ownerId 
              songsWithRoyalties: ["songOne", "songTwo"] Array<string>
              songsCanListenTo:  ["songOne", "songTwo"] Array<string>
              walletAddress: " " <string>
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
              //value in dollars
              prices: {userId: (percentage: 5% <number>, totalPrice: 5$ <number>) } //dictionary since each user gives difference
              songFile: " " <string>
            }

```
//helper table to support many to many relationship between artist and song;

