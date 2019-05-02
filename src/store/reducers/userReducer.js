const initState = {
    user: {
        'accountOwner': null,
        'artistName': null,
        'photoUrl': null, 
        'songsOwned': [], 
        'bio':null,
        'songs': [], 
        'saveSuccess': null
    }, 
    sellers: {}
}

export let userReducer = (state = initState, action) => {
    const {payload} = action
    switch (action.type) {
        case 'ADD_USERS':
            return {...state, 'sellers': {...state.sellers, ...payload.users}}

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
        case 'UPLOAD_SONG_PROFILE':
            return {
                ...state,
                user: {
                    ...state.user,
                    songs: state.songs.concat(payload.song),
                    songsOwned: {...state.songsOwned, [payload.song.id]: 100}
                }

            }
        case 'DELETE_SONG_PROFILE':
            delete state.user.songsOwned[payload.id]
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