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

export  const setUserProfile = (user) => {
    return {
        type: 'SET_USER',
        payload: user
}}

export const dbEditProfile = (profileInfo, image, imageName, callBack) => {
    return (dispatch, getState, {getFirebase}) => {
        console.log("dbEditProfile called")
        // return songService.updateSong(updatedSong).then(() => {
        //     dispatch(updateSong(updatedSong))
        //     callBack()
        // })
        //     .catch((error) => {
        //         dispatch(showMessage(error.message))
        //     })
    }
}