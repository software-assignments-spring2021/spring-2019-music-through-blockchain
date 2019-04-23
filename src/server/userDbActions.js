import { db, storageRef } from "../fbconfig"
import { songService } from './songDbActions'

function dataFetcher () {
    this.getCollectionById = (collectionName, id)  => {
        return new Promise((resolve, reject) => {
            let ref = db.collection(collectionName).doc(id)
            ref.get().then((user) => {
                let userInfo = user.data()
                console.log(userInfo)
                songService.getSongs('',null,  0, 10,'').then((result) => {
                    userInfo.songs = result.songs //need to set songs and adjust song list
                    resolve({ user: userInfo }) }
                ).catch((error) => {
                    reject(error)
                })
            }).catch((error)=> {
                reject(error)
            })
            })
    }
}
// - Import react components

export const userService = {
  
/**
 * Get user information for profile
 * 
 */
dbGetUserInfo: (userId) => {
    let fetcher = new dataFetcher();
    return fetcher.getCollectionById('users', userId)
    }
}
