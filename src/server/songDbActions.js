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
                  usersUpdate[`songsOwned.${songRef.id}.price`] = songInfo.price;
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
 * 
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
 * Get details of song ownership, price
 * 
 */
getSongDetails: (ownerIds, songId) => {
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
  }
}
