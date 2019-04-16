import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import LinearProgress from '@material-ui/core/LinearProgress'
import { connect } from 'react-redux'

import LoadingComponent from './LoadingComponent'

import {clearAllData} from '../store/actions/songActions'

import {showMasterLoading, hideMasterLoading, hideMessage} from '../store/actions/globalActions'

class Master extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: true,
            dataLoaded: false,
            drizzleState: null
        }
    }
    
    componentDidMount () {
        const {
          global,
          clearData,
          hideMasterLoading,
          authed, 
          drizzle
        } = this.props

        // subscribe to changes in the store
        this.unsubscribe = drizzle.store.subscribe(() => {

          // every time the store updates, grab the state from drizzle
          const drizzleState = drizzle.store.getState();
          console.log(drizzle.store.getState());

          // check to see if it's ready, if so, update local component state
          if (drizzleState.drizzleStatus.initialized) {
            this.setState({ loading: false, drizzleState });
          }
        });

        if (authed) {
          hideMasterLoading()
          this.setState({
            loading: false,
          })
        }
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

  render() {
    console.log('MASTER PROPS: ', this.props)
    console.log('MASTER STATE: ', this.state)
    return (
        <div>
        {this.props.loading ? <LoadingComponent /> : ''}
        <Snackbar
        open={this.props.global.messageOpen}
        message={this.props.global.message}
        onClose={this.props.hideMessage}
        autoHideDuration={4000}
        style={{ left: '1%', transform: 'none' }}
      />
      </div>
    )
  }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch, ownProps) => {

    return {
      clearData: () => {
        dispatch(clearAllData()) 
      },
      closeMessage: () => {
        dispatch(hideMessage())
      },
      showMasterLoading: () => dispatch(showMasterLoading()),
      hideMasterLoading: () => dispatch(hideMasterLoading()),
      hideMessage: () => dispatch(hideMessage())
    }
  
  }
  
  const mapStateToProps = (state) => {
    return {
      ...state,
      global: state.global,
      progress: state.global.progress,
      authed: state.firebase.auth,
      drizzle: state.drizzle
    }
  
  }

export default connect(mapStateToProps, mapDispatchToProps)(Master)
