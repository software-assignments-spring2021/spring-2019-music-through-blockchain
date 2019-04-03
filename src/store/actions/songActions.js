import { showMessage } from './globalActions'

import { songService } from '../../server/songDbActions'

/* _____________ CRUD DB Functions _____________ */

/**
 * Upload song
 */
export let dbUploadSong = (songInfo, image, imageName, song, songName, callBack) => {
    return (dispatch, getState, {getFirebase}) => {
      console.log('dbUploadSong called')
      const state = getState()
      const uid = state.firebase.auth.uid
      song['ownerId'] = uid

      return songService.uploadSong(uid, songInfo, image, imageName, song, songName).then((songData) => {
        dispatch(addSong(song.ownerId, songData))
        callBack()
      })
      .catch((error) => dispatch(showMessage(error.message)))
    }
  }

/**
 * Update song
 */
export const dbUpdateSong = (updatedSong, callBack) => {
    return (dispatch, getState, {getFirebase}) => {
      return songService.updateSong(updatedSong).then(() => {
        dispatch(updateSong(updatedSong))
        callBack()
      })
        .catch((error) => {
          dispatch(showMessage(error.message))  
        })
    }
  }

/**
 * Delete song
 */
export const dbDeleteSong = (song) => {
    return (dispatch, getState, {getFirebase}) => {
        return songService.deleteSong(song.id).then(() => {
            dispatch(deleteSong(song.ownerId, song.id))
        })
        .catch((error) => {
            dispatch(showMessage(error.message))
        })
    }
}

/**
 * Get songs from database
 */
export const dbGetSongs = (page = 0, limit = 10, sortBy = '') => {
    return (dispatch, getState, {getFirebase}) => {
      const state = getState()
      const uid = state.firebase.auth
      const stream = state.song.stream
      const lastPageRequest = stream.lastPageRequest
      const lastSongId = stream.lastSongId
      
      if (uid && lastPageRequest !== page) {
        return songService.getSongs('', lastSongId, page, limit, sortBy).then((result) => {
          
          // No more songs
          if (!result.songs || !(result.songs.length > 0)) {
            return dispatch(notMoreDataStream())
          }
  
          // Store last song Id
          dispatch(lastSongStream(result.newLastPostId))

          let parsedData = {}
          result.songs.forEach((song) => {
            const songId = Object.keys(song)[0]
            const songData = song[songId]
            songData.ownerId.songId = songData
          })
          dispatch(addSongs(parsedData))
        })
          .catch((error) => {
            dispatch(showMessage(error.message))
          })
      }
    }
  }

/**
 * Get songs for particular user
 */
export const getSongsByUserId = (userId, page = 0, limit = 10, type = '', sortBy = '') => {
    return (dispatch, getState, {getFirebase}) => {
      const state = getState()
      const uid = state.firebase.auth.uid
      const stream = state.song.stream
      const lastPageRequest = stream[userId].lastPageRequest
      const lastSongId = stream[userId].lastSongId
  
      if (uid && lastPageRequest !== page) {
  
        return songService.getSongs(userId, lastSongId, page, limit, type, sortBy).then((result) => {
  
          if (!result.songs || !(result.songs.length > 0)) {
              return dispatch(notMoreDataProfile(userId))
          }
  
          dispatch(lastSongProfile(userId, result.newLastPostId))
          // Store last post Id
  
          let parsedData = {}
          result.songs.forEach((song) => {
            const songId = Object.keys(song)[0]
            const songData = song[songId]
            songData.ownerId.songId = songData
          })
          dispatch(addSongs(parsedData))
        })
          .catch((error) => {
            dispatch(showMessage(error.message))
          })
  
      }
    }
  }


/* _____________ CRUD State Functions _____________ */

/**
 * Clear all data in song store
 */
export const clearAllData = () => {
    return {
      type: 'CLEAR_ALL_DATA_SONGS'
    }
}

/**
 * Add a song
 */
export const addSong = (ownerId, song) => {
    return {
      type: 'ADD_SONG',
      payload: { ownerId, song}
    }
}

/**
 * Add a list of songs
 */
export const addSongs = (songs) => {
    return {
      type: 'ADD_SONGS',
      payload: { songs }
    }
}

/**
 * Update a song
 */
export const updateSong = (song) => {
    return {
      type: 'UPDATE_SONG',
      payload: { song }
    }
  }

/**
 * Delete a post
 */
export const deleteSong = (ownerId, id) => {
    return {
      type: 'DELETE_SONG',
      payload: { ownerId, id}
    }
  }

/**
 * Stream has more data to show
 */
export const hasMoreDataStream = () => {
    return {
      type: 'HAS_MORE_DATA_STREAM'
    }
  
  }

/**
 * No more songs to show
 */
export const notMoreDataStream = () => {
    return {
      type: 'NOT_MORE_DATA_STREAM'
    }
  
  }

/**
 * Last page request of stream
 */
export const requestPageStream = (page) => {
    return {
      type: 'REQUEST_PAGE_STREAM',
      payload: { page }
    }
}
  
/**
 * Last songId of stream
 */
export const lastSongStream = (lastSongId) => {
    return {
      type: 'LAST_SONG_STREAM',
      payload: { lastSongId }
    }
}

/**
 * Profile posts has more data to show
 */
export const hasMoreDataProfile = () => {
    return {
      type: 'HAS_MORE_DATA_PROFILE',
    }
}

/**
 * Profile posts has no more data
 */
export const notMoreDataProfile = (userId) => {
    return {
      type: 'NOT_MORE_DATA_PROFILE',
      payload: { userId }
    }
  }

/**
 * Last page request of profile posts
 */
export const requestPageProfile = (userId, page) => {
    return {
      type: 'REQUEST_PAGE_PROFILE',
      payload: { userId, page}
    }
}

/**
 * Last song id of profile post stream
 */
export const lastSongProfile = (userId, lastSongId) => {
    return {
      type: 'LAST_SONG_PROFILE',
      payload: { userId, lastSongId}
    }
}