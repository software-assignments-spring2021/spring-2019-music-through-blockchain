import { userService } from '../../server/userDbActions'
import { showMessage } from './globalActions'
import {songService} from "../../server/songDbActions";
import {updateSong} from "./songActions";
 

/**
 * Set user profile
 */
export const getUserInfo = (userId) => {
    return (dispatch, getState, {getFirebase}) => {
      const state = getState()
      const uid = state.firebase.auth.uid
      const stream = state.song.stream
  
        return userService.dbGetUserInfo(userId).then((result) => {
          dispatch(setUserProfile(result))
        })
          .catch((error) => {
            dispatch(showMessage(error.message))
          })
  
    }
  }

/**
 * given royalties list, retrieves the names of the sellers
 */
export const dbGetSellers = (royalties, songId) => {
    
  return (dispatch, getState, {getFirebase}) => {
      const state = getState()
      const uid = state.firebase.auth.uid
      let users = {}  
        return userService.getSellers(royalties).then((result) => {
          users[songId]= result //result is [royaltiesId][name]
          //users[songId] = sellers
          dispatch(addUsers(users))
        })
        .catch((error) => {
            console.log("ERROR", error)
          dispatch(showMessage(error.message))
        })
    }
  }

export  const setUserProfile = (user) => {
    return {
        type: 'SET_USER',
        payload: user
}}

/**
 * Edits the users profile
 * @param updatedProfile
 * @param image
 * @param imageName
 * @param callBack
 * @returns {Function}
 */
export const dbEditProfile = (updatedProfile, image, imageName, callBack) => {
    return (dispatch, getState, {getFirebase}) => {
        console.log("dbEditProfile called")
        const state = getState()
        const uid = state.firebase.auth.uid

        //if the user changes this their profile image
        if (image) {
            return userService.updatedprofileWithImage(uid, updatedProfile, image, imageName).then((profileData) => {
                dispatch(setEditedUserProfileImage(profileData))
                callBack(uid)
            })
                .catch((error) => {
                    dispatch(setFail(updatedProfile))
                    dispatch(showMessage(error.message))
                })
        }

        //if the user changes their name or biography
        return userService.updateProfile(uid, updatedProfile).then((profileData) => {
            dispatch(setEditedUserProfile(profileData))
            callBack(uid)
        })
            .catch((error) => {
                dispatch(showMessage(error.message))
            })
    }
}


export const setEditedUserProfile = (user) => {
    return {
        type: 'SET_EDIT_USER',
        payload: user
    }
}
export const setFail = (user) => {
    return {
        type: 'SET_EDIT_FAIL',
        payload: user
    }
}

export const setEditedUserProfileImage = (user) => {
    return {
        type: 'SET_EDIT_USER_IMAGE',
        payload: user
    }
}

/**
 * Delete a song from user
 */
export const deleteSongProfile = (ownerId, id) => {
    console.log('DELETE song profile called with' , ownerId, id)
    return {
      type: 'DELETE_SONG_PROFILE',
      payload: { ownerId, id}
    }
  }

export const uploadSongProfile = (song) => {
    return {
        type: 'UPLOAD_SONG_PROFILE',
        payload: song
    }
}
/**
 * Update a song
 */
export const addUsers = (users) => {
    console.log("IN ACTION", users)
    return {
      type: 'ADD_USERS',
      payload: {users} 
    }
  }
