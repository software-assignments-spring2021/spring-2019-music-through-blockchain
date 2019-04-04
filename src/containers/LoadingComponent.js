// - Import react components
import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import red from '@material-ui/core/colors/red'
import Grid from '@material-ui/core/Grid/Grid'
import { Typography } from '@material-ui/core'

// - Import app components

// - Create MasterLoading component class
export default class LoadingComponent extends Component{

  // Constructor
  constructor(props) {
    super(props)
    // Binding functions to `this`

  }

  loadProgress() {
    const { error, timedOut, pastDelay } = this.props
    if (error) {
      return (
        <Grid container>
          <Grid item>
            <CircularProgress style={{ color: red[500] }} size={50} />
          </Grid>
          <Grid item style={{ zIndex: 1 }}>
            <Typography variant='h6' color='primary' style={{ marginLeft: '15px' }} >
              Unexpected Error Happened ...
          </Typography>
          </Grid>
        </Grid>
      )
    } else if (timedOut) {
      return (
        <Grid container>
          <Grid item>
            <CircularProgress style={{ color: red[500] }} size={50} />
          </Grid>
          <Grid item style={{ zIndex: 1 }}>
            <Typography variant='h6' color='primary' style={{ marginLeft: '15px' }} >
              It takes long time ...
          </Typography>
          </Grid>
        </Grid>
      )
    } else if (pastDelay) {
      return (
        <Grid container>
          <Grid item>
            <CircularProgress size={50} />
          </Grid>
          <Grid item style={{ zIndex: 1 }}>
            <Typography variant='h6' color='primary' style={{ marginLeft: '15px' }} >
              Loading...
          </Typography>
          </Grid>
        </Grid>
      )
    } else {
      return (
        <Grid container>
          <Grid item>
            <CircularProgress size={50} />
          </Grid>
          <Grid item style={{ zIndex: 1 }}>
            <Typography variant='h6' color='primary' style={{ marginLeft: '15px' }} >
              Loading...
          </Typography>
          </Grid>
        </Grid>
      )
    }
  }

  // Render app DOM component
  render() {
    return (

      <div className='mLoading__loading'>
        {
          this.loadProgress()
        }

      </div>

    )
  }

}