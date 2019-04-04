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
        }
    }
    
    componentDidMount () {
        const {
          global,
          clearData,
          hideMasterLoading,
          authed
        } = this.props
        if (authed) {
          hideMasterLoading()
          this.setState({
            loading: false,
          })
        }
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
      global: state.global,
      progress: state.global.progress,
      authed: state.firebase.auth
    }
  
  }

export default connect(mapStateToProps, mapDispatchToProps)(Master)
