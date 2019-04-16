import { db, storageRef } from "../fbconfig"
import { songService } from './songDbActions'

// - Import react components
export const userService = {
  
/**
 * Get user information for profile
 * 
 */
dbGetUserInfo: (userId) => {
    return new Promise((resolve, reject) => {
        let ref = db.collection('users').doc(userId)
        ref.get().then((user) => {
            let userInfo = user.data()
            songService.getSongs('',null,  0, 10,'').then((result) => {
                userInfo.songs = result.songs //need to set songs and adjust song list
                resolve({ user: userInfo }) }
            )
        })
        })
    },

    updateProfile: (profile) => {
        return new Promise((resolve, reject) => {
            const batch = db.batch()
            console.log(profile.id)
            let profileRef = db.doc(`users/${profile.id}`)

            batch.update(profileRef, {...profile})
            batch.commit().then(() => {
                resolve()
            })
                .catch((error) => {
                    reject()
                })
        })
    },

}

