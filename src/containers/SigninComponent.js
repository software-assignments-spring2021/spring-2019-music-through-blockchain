// - Import external components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import { Redirect } from 'react-router-dom'

// - Import actions
import {signIn} from '../store/actions/authActions'

import Grid from '@material-ui/core/Grid/Grid'

const styles = (theme) => ({
  textField: {
    minWidth: 280,
    marginTop: 20
  },
  contain: {
    margin: '0 auto'
  },
  paper: {
    minHeight: 370,
    maxWidth: 450,
    minWidth: 337,
    textAlign: 'center',
    display: 'block',
    margin: 'auto'
  },
  bottomPaper: {
    display: 'inherit',
    fontSize: 'small',
    marginTop: '50px'
  },
  link: {
    color: '#0095ff',
    display: 'inline-block'
  }
})

export class LoginComponent extends Component {

  styles = {
    singinOptions: {
      paddingBottom: 10,
      justifyContent: 'space-around',
      display: 'flex'
    },
    divider: {
      marginBottom: 10,
      marginTop: 15
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      emailInput: '',
      emailInputError: '',
      passwordInput: '',
      passwordInputError: '',
      confirmInputError: ''
    }
    this.handleForm = this.handleForm.bind(this)
  }

  /**
   * Handle data on input change
   * @param  {event} evt is an event of inputs of element on change
   */
  handleInputChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value
    })

    switch (name) {
      case 'emailInput':
        this.setState({
          emailInputError: ''
        })
        break
      case 'passwordInput':
        this.setState({
          confirmInputError: '',
          passwordInputError: ''
        })

        break
      default:

    }
  }

  /**
   * Handle register form
   */
  handleForm = () => {
    let error = false
    if (this.state.emailInput === '') {
      this.setState({
        emailInputError: 'Please enter a valid email'
      })
      error = true

    }
    if (this.state.passwordInput === '') {
      this.setState({
        passwordInputError: 'Please enter a valid password'
      })
      error = true

    }

    if (!error) {
      this.props.login(
        this.state.emailInput,
        this.state.passwordInput
      )
    }

  }

  render() {
    const { classes, auth } = this.props
    if (auth.uid){
        this.props.history.push('/')
        return <Redirect to='/home' />
    }

    return (
      <Grid container spacing={24}>
        <Grid item xs={12} className={classes.contain}>
          <div>
            <Paper className={classes.paper} elevation={1} >
              <form>
                <div style={{ padding: '48px 40px 36px' }}>
                  <div style={{
                    paddingLeft: '40px',
                    paddingRight: '40px'
                  }}>

                    <h2>bMusic Log In</h2>
                  </div>                
                  <Divider style={this.styles.divider} />
                  <TextField
                    className={classes.textField}
                    autoFocus
                    onChange={this.handleInputChange}
                    helperText={this.state.emailInputError}
                    error={this.state.emailInputError.trim() !== ''}
                    name='emailInput'
                    label='Email'
                    type='email'
                    tabIndex={1}
                  /><br />
                  <TextField
                    className={classes.textField}
                    onChange={this.handleInputChange}
                    helperText={this.state.passwordInputError}
                    error={this.state.passwordInputError.trim() !== ''}
                    name='passwordInput'
                    label='Password'
                    type='password'
                    tabIndex={2}
                  /><br />
                  <br />
                  <br />
                  <div>
                    <div >
                      <Button variant='contained' color='primary' onClick={this.handleForm} tabIndex={3} >Log In</Button>
                    </div>
                  </div>
                </div>
              </form>
            </Paper>
          </div>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (email, password) => {dispatch(signIn(email, password))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginComponent))
