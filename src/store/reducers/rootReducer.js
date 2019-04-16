import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import { songReducer } from './songReducer';
import { userReducer } from './userReducer';

import { globalReducer } from './globalReducer';

const rootReducer = combineReducers({
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    song: songReducer,
    global: globalReducer, 
    user: userReducer
});

export default rootReducer