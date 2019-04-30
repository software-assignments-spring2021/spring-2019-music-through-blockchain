import { showMessage } from './globalActions'
import {deleteSongProfile} from '../actions/userActions'
import { songService } from '../../server/songDbActions'

/* _____________ CRUD DB Functions _____________ */

/**
 * Upload song
 */




export let dbUploadSong = (songInfo, image, imageName, song, songName, artistPublicAddress, callBack) => {
    return (dispatch, getState, {getFirebase}) => {
      console.log('dbUploadSong called')
      const state = getState()
      const uid = state.firebase.auth.uid
      songInfo['ownerId'] = [uid]

      return songService.uploadSong(uid, songInfo, image, imageName, song, songName).then((songData) => {
        dispatch(addSongs({[songData.id]: songData}))
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
export const dbDeleteSong = (songId, ownerId) => {
    return (dispatch, getState, {getFirebase}) => {
        return songService.deleteSong(songId, ownerId).then(() => {
            dispatch(deleteSongProfile(ownerId, songId))
            dispatch(deleteSong(ownerId, songId))
        })
        .catch((error) => {
          console.log('in error', error)
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
        console.log('dbGetSongs called')
        return songService.getSongs('', lastSongId, page, limit, sortBy).then((result) => {
           console.log('result.newLastSongId, lastSongId', result.newLastSongId, lastSongId)
          // No more songs
          if (!result.songs || result.newLastSongId === lastSongId) {
            console.log('all songs loaded')
            return dispatch(notMoreDataStream())
          }
  
          dispatch(lastSongStream(result.newLastSongId))
          
          let parsedData = {}
          result.songs.forEach((song) => {
            const songId = Object.keys(song)[0]
            const songData = song[songId]
            parsedData[songId] = songData
          })
          dispatch(addSongs(parsedData))
        })
          .catch((error) => {
            dispatch(showMessage(error.message))
          })
      }
    }
  }

export const dbGetSongOwners = (song, songId) => {
  return (dispatch, getState, {getFirebase}) => {
      const state = getState()
      const uid = state.firebase.auth.uid
      const songOwners = (song.ownerId)
      if (uid) {
        return songService.getSongOwners(songOwners, songId).then((result) => {
          song['ownerDetails'] = result
          dispatch(updateSong(song))
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
      const profile = state.song.profile
      const lastPageRequest = profile[userId].lastPageRequest
      const lastSongId = profile[userId].lastSongId
  
      if (uid && lastPageRequest !== page) {
  
        return songService.getSongs(userId, lastSongId, page, limit, type, sortBy).then((result) => {
  
          if (!result.songs || result.newLastSongId === lastSongId) {
              return dispatch(notMoreDataProfile(userId))
          }
  
          dispatch(lastSongProfile(userId, result.newLastPostId))
          // Store last post Id
  
          let parsedData = {}
          result.songs.forEach((song) => {
            const songId = Object.keys(song)[0]
            const songData = song[songId]
            songData[userId][songId] = songData
          })
          dispatch(addSongs(parsedData))
        })
          .catch((error) => {
            dispatch(showMessage(error.message))
          })
  
      }
    }
  }

// get specific song
export const dbGetSongById = (songId) => { 
  return (dispatch, getState, {getFirebase}) => {
    return songService.getSongById(songId).then((result) => {
      result[songId].id = songId
      dispatch(addSongs(result))
      dbGetSongOwners(result[songId], songId)
    })
    .catch((error) => {
      dispatch(showMessage(error.message))
    })
  }
}

export const dbPutSongForSale = (song, songId, percent, price, sellAllShares, callBack) => {
  return (dispatch, getState, {getFirebase}) => {
    const state = getState()
    const uid = state.firebase.auth.uid
    if (uid) {
      return songService.putSongForSale(songId, uid, percent, price, sellAllShares).then((result) => {
        song['market'][uid] = {'price': price, 'percent': percent, 'sellAllShares': sellAllShares}
        song.id = songId
        dispatch(updateSong(song))
        callBack()
      })
      .catch((error) => {
        dispatch(showMessage(error.message))
      })
    }
  }
}

export const dbRemoveSongForSale = (song, songId, callBack) => {
  return (dispatch, getState, {getFirebase}) => {
    const state = getState()
    const uid = state.firebase.auth.uid
    if (uid) {
      return songService.removeSongForSale(songId, uid).then(() => {
        delete song['market'][uid]
        song.id = songId
        dispatch(updateSong(song))
        callBack()
      })
    }
  }
}

export const dbPurchaseSong = (song, songId, sellerId) => {
  const sellAllShares = song['market'][sellerId].sellAllShares

  console.log('purchasing song')
  console.log('purchase song args:: ', 'song: ', song, 'songId: ', songId, 'sellerId: ', sellerId, 'sellAllShares: ', sellAllShares)

  
  return (dispatch, getState, {getFirebase}) => {
    const state = getState()
    const uid = state.firebase.auth.uid
    if (uid) {
      return songService.purchaseSong(songId, sellerId, uid, sellAllShares).then((result) => {
        delete song['market'][sellerId]
        song['ownerId'].push(uid)

        if (sellAllShares) {
          delete song['ownerId'][sellerId]
        }
        //todo: update buyer and seller details here
        song.id = songId
        dispatch(updateSong(song))
      }).catch((error) => {
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
export const hasMoreDataProfile = (userId) => {
    return {
      type: 'HAS_MORE_DATA_PROFILE',
      payload: { userId }
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