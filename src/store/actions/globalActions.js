/**
 * Progress change
 */
export const progressChange = (percent, visible) => {
  return {
    type: 'PROGRESS_CHANGE',
    payload: { percent, visible }
  }
}

/**
 * Progress change
 */
export const initLocale = () => {
  return {
    type: 'INIT_LOCALE',
    payload: null
  }
}

/**
 * Hide global message
 */
export const hideMessage = () => {
  return {
    type: 'HIDE_MESSAGE_GLOBAL'
  }
}

/**
 * Show message
 * @param {string} message
 */
export const showMessage = (message) => {
  if (!message || message === '' || (message && message.trim() === '')) {
    message = 'Bad request'
  }
  return {
    type: 'SHOW_MESSAGE_GLOBAL',
    payload: message
  }
}

/**
 * Show master loading
 */
export const showMasterLoading = () => {
  return {
    type: 'SHOW_MASTER_LOADING'
  }

}

/**
 * Hide master loading
 */
export const hideMasterLoading = () => {
  return {
    type: 'HIDE_MASTER_LOADING'
  }

}
