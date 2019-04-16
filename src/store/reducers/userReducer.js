const initState = {
    user: {
        'artistName': null,
        'photoUrl': null, 
        'songsOwned': [], 
        'bio':null
    }
}

export let userReducer = (state = initState, action) => {
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
                    bio: payload.user.bio
            }
        }
        default:
            return state
    }
}