import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SongDetails from './components/SongDetails'
import SongPage from './components/SongPage'
import SigninComponent from './containers/SigninComponent'
import SignupComponent from './containers/SignupComponent'
import Homepage from './containers/Homepage'
import Profile from './containers/Profile'
import Navbar from './components/Navbar'
import NotFound from './components/NotFound'

import Master from './containers/Master'
import SongUploadComponent from './containers/SongUpload'
import LandingPage from './containers/LandingPage'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Master />

          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route path='/song/:uid' component={SongPage} />
            <Route path='/signin' component={SigninComponent} />
            <Route path='/signup' component={SignupComponent} />
            <Route path='/profile/:uid' component={Profile} />
            <Route path='/create' component={SongUploadComponent} />
            <Route component={NotFound} />

          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
