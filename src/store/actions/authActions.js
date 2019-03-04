

export const signIn = (email, password) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            email,
            password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS'});
            console.log('sign in success')
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR'});
            console.log('sign in error')
        });
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({type: 'SIGNOUT_SUCCESS'});
            console.log('signout success')
        });
    }
}

export const signUp = (newUser) => {
    return  (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password
    ).then((resp)=> {
        return firestore.collection('users').doc(resp.user.uid).set({
            fullName: newUser.fullName,
            photoUrl: '',
            songsOwned:[],
            uid:resp.user.uid
        })
    }).then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS'})
        console.log('sign up success')
    }).catch((err) => {
        dispatch({type: 'SIGNUP_ERROR'})
        console.log('sign up error')
    })
    }
}