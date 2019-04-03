export const globalReducer = (state = {progress: {percent: 0, visible: true}}, action) => {
  const { payload } = action
  switch (action.type) {
    case 'PROGRESS_CHANGE':
      return {...state, 'progress':{...state.progress, 'percent': payload.percent, 'visible': payload.visible}}

    case 'SHOW_MESSAGE_GLOBAL':
      return {...state, 'message': action.payload, 'messageOpen': true}

    case 'SHOW_NORMAL_MESSAGE_GLOBAL':
      return {...state, 'message': action.payload, 'messageOpen': true}

    case 'HIDE_MESSAGE_GLOBAL':
      return {...state, 'message': action.payload, 'messageOpen': false, 'messageColor': ''}

    default:
      return state
  }

}
