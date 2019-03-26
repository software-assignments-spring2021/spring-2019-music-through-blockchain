import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SongDetails from './components/SongDetails'
import SigninComponent from './containers/SigninComponent'
import SignupComponent from './containers/SignupComponent'
import Homepage from './containers/Homepage'
import Profile from './containers/Profile'
import Navbar from './components/Navbar'
import SongUploadComponent from './containers/SongUpload'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />

          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route path='/song/:id' component={SongDetails} />
            <Route path='/signin' component={SigninComponent} />
            <Route path='/signup' component={SignupComponent} />
            <Route path='/profile/:uid' component={Profile} />
            <Route path='/create' component={SongUploadComponent} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
