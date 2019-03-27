export const upload = (newSong) => {
    return  (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const userId = firebase.auth().currentUser.uid
        //
        // const starCountRef = firebase.database().ref('songs/' + postId)
        //
        // firebase.database().ref('songs/' + title).set({
        //     title: name,
        //     price: email,
        //     uploaded_by : imageUrl
        // });

        //update the user to own this song
    }
}