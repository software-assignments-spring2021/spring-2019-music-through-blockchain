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
            console.log(userInfo)

            songService.getSongs(userId,null,  0, 10,'').then((result) => {
                console.log(typeof(result))
                console.log(result)
                userInfo.songs = result.songs.filter(function(song)  {
                    return song.ownerId = userId
                }) //TODO: filter based on owner ID
                console.log(userInfo, "after adding songs")
            
                resolve({ user: userInfo }) }
            )
        })
        })
    }
}

