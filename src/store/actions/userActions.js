import { userService } from '../../server/userDbActions'
import { showMessage } from './globalActions'
 

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