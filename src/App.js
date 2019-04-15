import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SongDetails from './components/SongDetails'
import SongList from './components/SongList'
import SigninComponent from './containers/SigninComponent'
import SignupComponent from './containers/SignupComponent'
import Homepage from './containers/Homepage'
import Profile from './containers/Profile'
import Navbar from './components/Navbar'
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
    //This should this display a loading drizzle page
    if(this.state.loading){
      return "Loading Drizzle...";
    }

    //This should display once drizzle is ready and/or has loaded
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />

          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route path='/song/:id' component={SongDetails} />
            <Route path='/songs' component={SongList} />
            <Route path='/signin' component={SigninComponent} />
            <Route path='/signup' component={SignupComponent} />
            <Route path='/profile/:uid' component={Profile} />
            <Route path='/create' component={SongUploadComponent} />
            <Route path='/landing-page' component ={LandingPage}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
