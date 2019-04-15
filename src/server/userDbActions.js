import { db, storageRef } from "../fbconfig"

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

            resolve({ user: user.data() })
        })
        })
    }
}

