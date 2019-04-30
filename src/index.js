import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import fbconfig from './fbconfig'

import {Drizzle} from "drizzle"
import SongsContract from "./contracts/SongsContract"


const store = createStore(rootReducer, 
    compose(applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(fbconfig),
    reactReduxFirebase(fbconfig, {useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true})
    )
);

const optionsDrizzle = {
    contracts: [SongsContract],
    web3: {
        fallback : {
            type: "ws",
            url: "ws://localhost:8545"
        }
    }
}

// setup drizzle
const drizzle = new Drizzle(optionsDrizzle);

store.firebaseAuthIsReady.then(() => {
    console.log('firebase is ready')
    ReactDOM.render(<Provider store={store}><App drizzle={drizzle}/></Provider>, document.getElementById('root'));
    serviceWorker.unregister();
})
