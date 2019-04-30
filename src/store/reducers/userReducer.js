const initState = {
    user: {
        'accountOwner': null,
        'artistName': null,
        'photoUrl': null, 
        'songsOwned': [], 
        'bio':null,
        'songs': [], 
        'saveSuccess': null
    }
}

export let userReducer = (state = initState, action) => {
    console.log("USER_REDUCER", state)
    console.log("USER_REDUCER action", action)

    const {payload} = action
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user : {
                    ...state.user, 
                    artistName: payload.user.artistName,
                    photoUrl: payload.user.photoUrl,  
                    songsOwned: payload.user.songsOwned,
                    songs: payload.user.songs,
                    bio: payload.user.biography
            }
        }
        case 'DELETE_SONG_PROFILE':
            console.log('BEFORE', state.user.songsOwned)
            delete state.user.songsOwned[payload.id]
            console.log('AFTER', state.user.songsOwned)
            return {
                ...state, 
                user: {
                    ...state.user, 
                    songs: state.user.songs.filter((el) =>el.id != payload.id)
                }
            }
        case 'SET_EDIT_USER':
            return {
                ...state,
                user: {
                    ...state.user,
                    accountOwner: payload.accountOwner,
                    artistName: payload.artistName,
                    bio: payload.biography,
                    saveSuccess: true
                }
            }
        case 'SET_EDIT_USER_IMAGE':
            return {
                ...state,
                user: {
                    ...state.user,
                    accountOwner: payload.accountOwner,
                    artistName: payload.artistName,
                    bio: payload.biography,
                    photoUrl: payload.photoUrl,
                    saveSuccess: true
                }
            }
        case 'SET_EDIT_FAIL':
            return {
                ...state,
                user: {
                    ...state.user,
                    saveSuccess: false
                }
            }
        default:
            return state
    }
}