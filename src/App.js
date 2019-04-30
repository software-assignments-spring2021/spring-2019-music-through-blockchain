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
import { withRouter } from "react-router";

import Master from './containers/Master'
import SongUploadComponent from './containers/SongUpload'
import LandingPage from './containers/LandingPage'
import HowTo from './components/Howto'
import EditProfileComponent from './components/EditProfile.js'

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
    console.log('app props: ', this.props)
    const SongPageWrapped = withRouter(props => <SongPage {...props}/>);
    const CreatePageWrapped = withRouter(props => <SongUploadComponent {...props}/>);
    const ProfilePageWrapped = withRouter(props => <Profile {...props}/>);
    const HomePageWrapped = withRouter(props => <Homepage {...props}/>);
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Master />

          <Switch>
            <Route exact path='/' render={() => <HomePageWrapped drizzle={this.props.drizzle} drizzleState = {this.props.drizzle.store.getState()}/> } />
            <Route path='/song/:songId' render={() => <SongPageWrapped drizzle={this.props.drizzle} drizzleState = {this.props.drizzle.store.getState()}/> }/>
            <Route path='/signin' component={SigninComponent} />
            <Route path='/signup' component={SignupComponent} />
            <Route path='/howto' component={HowTo} />
            <Route path='/profile/:uid' render={() => <ProfilePageWrapped drizzle={this.props.drizzle} drizzleState = {this.props.drizzle.store.getState()}/> } />
            <Route path='/create' render={() => <CreatePageWrapped drizzle={this.props.drizzle} drizzleState = {this.props.drizzle.store.getState()}/> } />
            <Route component={NotFound} />
            <Route path='/edit-profile' component={EditProfileComponent} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
