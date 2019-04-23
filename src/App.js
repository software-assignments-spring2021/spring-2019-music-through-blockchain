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

  state = { loading: true, drizzleState: null };

  componentDidMount() {
    const { drizzle } = this.props;

    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {

      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    //This should display once drizzle is ready and/or has loaded
    //TODO add this to profile:  render={() => <Profile drizzle={this.props.drizzle} drizzleState = {this.props.drizzle.store.getState()}/>}
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Master />

          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route path='/song/:uid' render={() => <SongPage drizzle={this.props.drizzle} drizzleState = {this.props.drizzle.store.getState()}/> }/>
            <Route path='/signin' component={SigninComponent} />
            <Route path='/signup' component={SignupComponent} />
    <Route path='/profile/:uid' render={() => <Profile drizzle={this.props.drizzle} drizzleState = {this.props.drizzle.store.getState()}/>} /> 
            <Route path='/create' render={() => <SongUploadComponent drizzle={this.props.drizzle} drizzleState = {this.props.drizzle.store.getState()}/> } />
            <Route component={NotFound} />

          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
