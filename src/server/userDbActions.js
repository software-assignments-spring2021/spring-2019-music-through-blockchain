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

    updatedprofileWithImage: (uid, profile, image, imageName) => {
        return new Promise((resolve,reject) => {
            let profileData = {}
            let profileRef = db.doc(`users/${uid}`)

            //find the existing profile picture saved in storage
            profileRef.get().then((profileDoc) => {
                console.log("getting profile")
                const existingImagePath = profileDoc.data().imageFullPath
                //if there is an existing image saved store is as a reference
                const existingImageRef = (existingImagePath) ? storageRef.child(existingImagePath): null

                //save the new chosen profile picture into storage
                console.log("saving image in storage")

                const imageKey = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 9)
                const imageStorageFile = storageRef.child(`images/${imageKey}_${imageName}`)

                imageStorageFile.put(image).then((imageResult) => {
                    imageResult.ref.getDownloadURL().then((imageDownloadURL) => {
                        console.log("successfully called saved the new image in storag")
                        profileData = {
                            ...profile,
                            photoUrl: imageDownloadURL,
                            imageFullPath: imageResult.metadata.fullPath
                        }

                        console.log("updating the profile with new information")
                        profileRef.update(profileData).then((savedProfile) => {
                            //resolve with the savedProfile Image

                            //delete the old profile image if there is onw
                            existingImageRef.delete().then((message) => {
                                console.log(message)
                                resolve(savedProfile)
                            }).catch((message) => {
                                console.log(message)
                                resolve(savedProfile)
                            })
                            resolve(savedProfile)
                        })
                    })

                    //update the user information in the database


                }).catch((error) => {
                    reject(error)
                })
            })
        })
    },


    //2nd iteration of function
    // newupdatedprofileImage: (uid, profile, image, imageName) => {
    //     return new Promise((resolve,reject) => {
    //         console.log(this)
    //         let profileData = {}
    //         let profileRef = db.doc(`users/${uid}`)
    //
    //         //find the existing profile picture saved in storage
    //         profileRef.get().then((profileDoc) => {
    //             console.log("getting profile")
    //             const existingImagePath = profileDoc.data().imageFullPath
    //             //if there is an existing image saved store is as a reference
    //             const existingImageRef = (existingImagePath) ? storageRef.child(existingImagePath): null
    //
    //             //save the new chosen profile picture into storage
    //             console.log("saving image in storage")
    //
    //             const imageKey = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 9)
    //             const imageStorageFile = storageRef.child(`images/${imageKey}_${imageName}`)
    //
    //             this.saveImage(image, imageName).then((imageInfo) => {
    //                 console.log("successfully called saved the new image in storag")
    //                 //Store profile information and new image url in payload
    //                 profileData = {
    //                     ...profile,
    //                     photoUrl: imageInfo.imageDownloadURL,
    //                     imageFullPath: imageInfo.imageResult.metadata.fullPath
    //                 }
    //
    //                 //update the user information in the database
    //                 console.log("updating the profile with new information")
    //                 profileRef.update(profileData).then((savedProfile) => {
    //                     //resolve with the savedProfile Image
    //
    //                     //delete the old profile image if there is onw
    //                     // this.deleteImage(existingImagePath).then((message) => {
    //                     //     console.log(message)
    //                     //     resolve(savedProfile)
    //                     // }).catch((message) => {
    //                     //     console.log(message)
    //                     //     resolve(savedProfile)
    //                     // })
    //
    //
    //                     if (existingImageRef) {
    //                         //delete the image
    //                         existingImageRef.delete().then(() => {
    //                             resolve(profileData)
    //                         }).catch((error) => {
    //                             resolve(profileData)
    //                         })
    //                     }
    //                     else {
    //                         reject("Image path no specified")
    //                     }
    //
    //                     resolve(savedProfile)
    //                 })
    //
    //             }).catch((error) => {
    //                 reject(error)
    //             })
    //         })
    //     })
    // },

    /**
     * deletes image in firebase storage
     * @param imagePath the path of image in firebase storage to delete
     * @returns {Promise<any>}
     */
    deleteImage: (imagePath) => {
        return new Promise((resolve, reject) => {
           if (imagePath) {
                const imageRef = storageRef.child(imagePath)

               //delete the image
               imageRef.delete().then(() => {
                   resolve("Image deleted successfully")
               }).catch((error) => {
                   reject(error)
               })
           }
           else {
               reject("Image path no specified")
           }
        })
    },


    /**
     * Saves an image to the firebase storage
     * @param image the image itself that will be saved in the storage
     * @param imageName type String: name of image
     * @returns {Promise<any>}
     */
    saveImage: (image, imageName) => {
        return new Promise((resolve, reject) => {
            let imageInfo = {}
            const imageKey = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 9)
            const imageStorageFile = storageRef.child(`images/${imageKey}_${imageName}`)

            imageStorageFile.put(image).then((imageResult) => {
                console.log("succesfully saved image")
                imageResult.ref.getDownloadURL().then((imageDownloadURL) => {
                    imageInfo = {
                        imageDownloadURL: imageDownloadURL,
                        imageResult: imageResult
                    }
                    resolve(imageInfo)
                }).catch((error) => {
                    console.log("error saving image")
                    reject(error)
                })
            })
        })

    }
}

