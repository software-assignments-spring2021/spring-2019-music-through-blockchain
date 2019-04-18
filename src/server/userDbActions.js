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

    updateProfile: (uid, profile) => {
        return new Promise((resolve, reject) => {
            // const batch = db.batch()
            console.log(uid)
            let profileRef = db.doc(`users/${uid}`)

            console.log(profile)
            profileRef.update(profile).then(() => {
                resolve(profile)
            })
                .catch((error) => {
                    reject(error)
                })
        })
    },

    updateProfileWithImage: (uid, profile, image, imageName) => {
        return new Promise((resolve, reject) => {
            let profileData = {}
            let profileRef = db.doc(`users/${uid}`)

            //find the existing profile picture saved in storage
            profileRef.get().then((profileDoc) => {
                const existingImagePath = profileDoc.data().imageFullPath
                const existingImageRef = storageRef.child(existingImagePath)

                //delete the existing profile picture
                existingImageRef.delete().then(() => {
                    console.log("deleted existing profile picture")
                    //save the new chosen profile picture into storage
                    const imageKey = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 9)
                    const imageStorageFile = storageRef.child(`images/${imageKey}_${imageName}`)

                    imageStorageFile.put(image).then((imageResult) => {
                        imageResult.ref.getDownloadURL().then((imageDownloadURL) => {
                            profileData = {
                                ...profile,
                                photoUrl: imageDownloadURL,
                                imageFullPath: imageResult.metadata.fullPath
                            }
                            //save the new profile information and image path to database
                            profileRef.update(profileData).then(() => {
                                resolve(profileData)
                            }).catch((error) => {
                                reject(error)
                            })
                        })
                    })
                })
            })

            //ADD IMAGE TO THE PROFILE if its changed
            // const imageKey = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 9)
            // const imageStorageFile = storageRef.child(`images/${imageKey}_${imageName}`)
            //
            // console.log(profile)
            //
            // //retrieve the old image path and then save the new image
            // imageStorageFile.put(image).then((imageResult) => {
            //     imageResult.ref.getDownloadURL().then((imageDownloadURL) => {
            //         profileData = {
            //             ...profile,
            //             photoUrl: imageDownloadURL,
            //             imageFullPath: imageResult.metadata.fullPath
            //         }
            //         profileRef.update(profileData).then(() => {
            //
            //         })
            //     })
            //
            // })

            // profileRef.update(profile).then(() => {
            //     //if there is an image to save
            //     imageStorageFile.put(image)
            //
            //
            //
            //
            //     resolve(profile)
            // })
            //     .catch((error) => {
            //         reject(error)
            //     })

        })
    },

}

