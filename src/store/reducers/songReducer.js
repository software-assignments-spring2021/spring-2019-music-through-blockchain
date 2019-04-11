const initState = {
    info: {},
    stream: {
        'hasMoreData': null,
        'lastPageRequest': null,
        'lastSongId': null
    },
    profile: {}
}

const updateSong = (state, payload) => {
  const song = payload.song
  const updatedOwnerId = song.ownerId
  const updatedId = song.id
  return {...state, 'info': {...state.info, [updatedId]: song}}
}

/**
 * song reducer
 */
export let songReducer = (state = initState, action) => {
  const { payload } = action
  switch (action.type) {
    case 'CLEAR_ALL_DATA_SONG':
      return {}

    case 'UPLOAD_SONG':
      return {...state, 'info': {...state.info, [payload.song.id]: payload.song}}

    case 'UPDATE_SONG': 
      return updateSong(state, payload)

    case 'DELETE_SONG':
      delete state['info'][payload.id]
      return state

    case 'ADD_SONGS':
      return {...state, 'info': {...state.info, ...payload.songs}}
      
    case 'HAS_MORE_DATA_STREAM':
      return {...state, 'stream': {...state.stream, 'hasMoreData': true}}

    case 'NOT_MORE_DATA_STREAM':
      return {...state, 'stream': {...state.stream, 'hasMoreData': false}}

    case 'REQUEST_PAGE_STREAM':
      return {...state, 'stream': {...state.stream, 'lastPageRequest': payload.page}}

    case 'LAST_SONG_STREAM':
      return {...state, 'stream': {...state.stream, 'lastSongId': payload.lastSongId}}

    case 'HAS_MORE_DATA_PROFILE':
      return {...state, 'stream': {...state.profile, [payload.userId]: {...state.profile.userId, 'hasMoreData': true}}}

    case 'NOT_MORE_DATA_PROFILE':
      return {...state, 'stream': {...state.profile, [payload.userId]: {...state.profile.userId, 'hasMoreData': false}}}

    case 'REQUEST_PAGE_PROFILE':
      return {...state, 'stream': {...state.profile, [payload.userId]: {...state.profile.userId, 'lastPageRequest': payload.page}}}

    case 'LAST_SONG_PROFILE':
      return {...state, 'stream': {...state.profile, [payload.userId]: {...state.profile.userId, 'lastSongId': payload.lastSongId}}}

    default:
      return state

  }
}