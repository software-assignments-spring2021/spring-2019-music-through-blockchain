export const upload = (newSong) => {
    return  (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        // const firestore = getFirestore();
        const userId = firebase.auth().currentUser.uid

        const userID = null //get user id
        const starCountRef = firebase.database().ref('songs/' + postId)

        firebase.database().ref('songs/' + title).set({
            title: name,
            price: email,
            uploaded_by : imageUrl
        });

        //update the user to own this song




        // firebase.auth().createUserWithEmailAndPassword(
        //     newUser.email,
        //     newUser.password
        // ).then((resp)=> {
        //     return firestore.collection('users').doc(resp.user.uid).set({
        //         artistName: newUser.artistName,
        //         accountOwner: newUser.fullName,
        //         photoUrl: '',
        //         songsOwned:[],
        //         userId:resp.user.uid
        //     })
        // }).then(() => {
        //     dispatch({ type: 'SONG_SAVE_SUCCESS'})
        //     console.log('song save success')
        // }).catch((err) => {
        //     dispatch({type: 'SONG_SAVE_ERROR'})
        //     console.log('song save error')
        // })
    }
}