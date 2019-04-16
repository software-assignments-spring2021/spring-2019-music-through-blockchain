import { db, storageRef } from "../fbconfig"
import firebase from 'firebase'

// - Import react components
export const songService = {
  /**
  * Upload song
  */
  uploadSong: (uid, songInfo, image, imageName, song, songName) => {
    return new Promise((resolve, reject) => {
        let songData = {}
        let songRef = db.collection(`songs`).doc()
        let userRef = db.collection(`users`).doc(uid)
        const imageKey = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 9);
        const songKey = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 9);

        const imageStorageFile = storageRef.child(`images/${imageKey}_${imageName}`)
        const songStorageFile = storageRef.child(`songs/${songKey}_${songName}`)

        //cloud storage --> store cover art
        imageStorageFile.put(image).then((imageResult) => {
          imageResult.ref.getDownloadURL()
          .then((imageDownloadURL) => {

            //cloud storage --> store song
            songStorageFile.put(song).then((songResult) => {
              songResult.ref.getDownloadURL()
              .then((songDownloadURL) => {
                songData = {...songInfo, 
                  market: {},
                  imageUrl: imageDownloadURL,
                  imageFullPath: imageResult.metadata.fullPath,
                  songUrl: songDownloadURL, 
                  songFullPath: songResult.metadata.fullPath}
                delete songData['price']
                //firestore --> save song info
                songRef.set(songData).then(() => {
                  //add song id to songs owned by user
                  var usersUpdate = {};
                  usersUpdate[`songsOwned.${songRef.id}.percentOwned`] = 100;
                  userRef.update(usersUpdate)
                  
                  //add songId to songInfo and resolve
                  .then(() => {
                    songData['id'] = songRef.id
                    resolve(songData)
                  })
                })
              })
            })
          }).catch((error) => {
            reject(error)
          })
        })
      })
    },
    
  /**
   * Update song
   */
  updateSong: (song) => {
      return new Promise((resolve, reject) => {
        const batch = db.batch()
        let songRef = db.doc(`songs/${song.id}`)
             
        batch.update(songRef, { ...song })
        batch.commit().then(() => {
          resolve()
        })
          .catch((error) => {
            reject()
          })
      })
    },

  /**
   * Delete song
   */
  deleteSong: (songId) => {
      return new Promise((resolve, reject) => {
        const batch = db.batch()
        let songRef = db.doc(`songs/${songId}`)
        batch.delete(songRef)
        batch.commit().then(() => {
          resolve()
        })
          .catch((error) => {
            reject()
          })
      })
    },

/**
 * Get list of songs for homepage
 */
getSongs: (userId, lastSongId, page, limit, type, sortBy) => {
    return new Promise((resolve, reject) => {
      console.log('dbGetSongs') 
        let parsedData = []
        let query = db.collection('songs')
        if (userId && userId !== '') {
            query = query.where('ownerId', '==', userId)
        }
        if (lastSongId && lastSongId !== '') {
            query = query.orderBy('id').orderBy('creationDate').startAfter(lastSongId)
        }
        query = query.limit(limit)
        query.get().then((songs) => {
            let newLastSongId = songs.size > 0 ? songs.docs[songs.docs.length - 1].id : ''
            songs.forEach((songResult) => {
            const song = songResult.data()
            parsedData = [
                ...parsedData,
                {
                [songResult.id]: {
                    id: songResult.id,
                    ...song
                }
                }

            ]
            })
            resolve({ songs: parsedData, newLastSongId })
        })
        })
    },

/**
 * Get details of song ownership
 */
getSongOwners: (ownerIds, songId) => {
  return new Promise((resolve, reject) => {
    console.log('dbGetSongDetails') 
      let parsedData = {}
      ownerIds.forEach((ownerId) => {
        let userRef = db.doc(`users/${ownerId}`)
        userRef.get().then((doc) => {
          parsedData[ownerId] = doc.data()['songsOwned'][songId]
        })
      })
      resolve(parsedData)
    })
  },

  /**
  * Put percent of song up for sale
  */
  putSongForSale: (songId, userId, percent, price, sellAllShares) => {
    return new Promise((resolve, reject) => {
      let songRef = db.doc(`songs/${songId}`)
      var songUpdate = {};
      songUpdate[`market.${userId}.percent`] = percent;
      songUpdate[`market.${userId}.price`] = price;
      songUpdate[`market.${userId}.sellAllShares`] = sellAllShares;
      songRef.update(songUpdate)
      resolve()
    })
  },

  /**
  * Remove your song up for sale
  */
 removeSongForSale: (songId, userId) => {
  return new Promise((resolve, reject) => {
      db.collection('songs').doc(songId).update({
        ['market.' + userId]: firebase.firestore.FieldValue.delete()
      })
      resolve()
    })
  },

  purchaseSong: (songId, sellerId, buyerId, sellAllShares) => {
    return new Promise((resolve, reject) => {
      let songRef = db.doc(`songs/${songId}`)
      if (sellAllShares) {
        songRef.update({
          ownerId: firebase.firestore.FieldValue.arrayRemove(sellerId)
        })
      }
      songRef.update({
        ownerId: firebase.firestore.FieldValue.arrayUnion(buyerId)
      })
      .then(() => {
        songRef.get().then((doc) => {

          //get sale details
          const saleInfo = doc.data()['market'][sellerId]
          
          //add song ownership to buyer
          let buyerRef = db.doc(`users/${buyerId}`)
          var buyerUpdate = {};
          buyerUpdate[`songsOwned.${songId}.percentOwned`] = saleInfo.percent;
          
          buyerRef.update(buyerUpdate)
  
          //delete song ownership of seller
          db.collection('songs').doc(songId).update({
            ['market.' + sellerId]: firebase.firestore.FieldValue.delete()
          }).then (() => {
            if (sellAllShares) {
              db.collection('users').doc(sellerId).update({
                ['songsOwned.' + songId]: firebase.firestore.FieldValue.delete()
              })

            } 
            else {
              //update song ownership of seller
              const sellerRef = db.doc(`users/${sellerId}`)
              sellerRef.get().then((doc) => {
                const ownStats = doc.data()['songsOwned'][songId]
                var sellerUpdate = {};
                sellerUpdate[`songsOwned.${songId}.percentOwned`] = ownStats.percentOwned - saleInfo.percent;
                sellerRef.update(buyerUpdate)
              })
              

            }     
          })
        })
      })
      
      resolve()
    })
  }
}