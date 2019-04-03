
// - Import react components
export class songService {
    /**
   * Update song
   */
    uploadSong = (song, db) => {
        return new Promise((resolve, reject) => {
            let songRef = db.collection(`songs`).doc()
            songRef.set({ ...song, id: songRef.id })
            .then(() => {
                resolve(songRef.id)
            })
            .catch((error) => {
                reject()
            })
        })
    }
    
  /**
   * Update song
   */
  updateSong = (song, db) => {
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
    }

  /**
   * Delete post
   */
  deleteSong = (songId, db) => {
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
    }

/**
 * Get list of songs for homepage
 * 
 */
getSongs = (userId, lastSongId, page, limit, type, sortBy, db) => {
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
