
// - Import react components
export const songService = {
    /**
   * Update song
   */
    uploadSong: (song, db, storage, image, imageName) => {
        return new Promise((resolve, reject) => {
            const songData = {}
            const batch = db.batch()
            let songRef = db.collection(`songs`).doc()
            const storageFile = storage.child(`images/${imageName}`)
            
            batch.put(storageFile, image).then((result) => {
              result.ref.getDownloadURL()
              .then((downloadURL) => {
                songData['imageData'] = {url: downloadURL, fullPath: result.metadata.fullPath}
              })
              .catch((error) => {
                reject(error)
              })
            }).catch((error) => {
              reject(error)
            })
            batch.set(songRef, { ...song, id: songRef.id })
            .then(() => {
              songData['id'] = songRef.id
            })
            .catch((error) => {
                reject(error)
            })
            batch.commit().then(() => {
              resolve(songData)
            })
        })
    },
    
  /**
   * Update song
   */
  updateSong: (song, db) => {
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
   * Delete post
   */
  deleteSong: (songId, db) => {
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
getSongs: (userId, lastSongId, page, limit, type, sortBy, db) => {
    return new Promise((resolve, reject) => {
        let parsedData = []
        let query = db.collection('songs')
        if (userId !== '') {
            query = query.where('ownerId', '==', userId)
        }
        if (lastSongId && lastSongId !== '') {
            query = query.orderBy('id').orderBy('creationDate').startAfter(lastSongId).limit(limit)
        }
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
    }
}

