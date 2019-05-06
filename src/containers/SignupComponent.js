// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import {signUp} from '../store/actions/authActions'
import { Grid } from '@material-ui/core'
import { Redirect } from 'react-router-dom'

const styles = (theme) => ({
  root: {
    height: 700
  },
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
    button: {
        background: "linear-gradient(to right, #647DEE, #7F53AC) !important",
        width: 150,
        color: 'white !important',
        marginTop: 20,
        fontSize: 16,
        marginBottom: 10
    }
})

export class SignupComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      fullNameInput: '',
      emailInput: '',
      passwordInput: '',
      confirmInputError: '',
      fullNameInputError: '',
      emailInputError: '',
      passwordInputError: '',
      artistNameInput: '',
      artistNameInputError: '',
    }
    this.handleForm = this.handleForm.bind(this)
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value
    })

    switch (name) {
      case 'fullNameInput':
        this.setState({
          fullNameInputError: ''
        })
        break
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
      case 'confirmInput':
        this.setState({
          confirmInputError: '',
          passwordInputError: ''
        })
        break
      case 'checkInput':
        this.setState({
          checkInputError: ''
        })
        break
      default:

    }
  }

  handleForm = () => {

    const { artistNameInput, fullNameInput, emailInput, passwordInput, confirmInput } = this.state
    const { register } = this.props

    let error = false

    // Validate full name
    let fullNameCheck = fullNameInput.trim().toLowerCase()

    if (fullNameCheck.length < 4) {
      this.setState({
        fullNameInputError: 'Please enter a valid name'
      })
      error = true
    }

    /* Validate email*/
    if (!/.+@.+\.[A-Za-z]+$/.test(emailInput)) {
      this.setState({
        emailInputError: 'Please enter a valid email'
      })
      error = true
    }

    /* Check password */
    if (passwordInput === '') {
      this.setState({
        passwordInputError: 'Please enter a valid password'
      })
      error = true
    }

    /* Check artist name */
    if (artistNameInput === '') {
        this.setState({
            artistNameInputError: 'Please enter a valid artist name'
        })
        error = true
      }

    if (confirmInput === '') {
      this.setState({
        confirmInputError: 'Confirm password incorrect'
      })
      error = true
    } else if (confirmInput !== passwordInput) {
      this.setState({
        passwordInputError: 'Confirm password incorrect',
        confirmInputError: 'Confirm password incorrect'
      })
      error = true

    }
    if (!error) {
    register({
        email: emailInput,
        artistName: artistNameInput,
        password: passwordInput,
        fullName: fullNameInput
      })
    }
  }

  render() {

    const { classes, auth } = this.props
    if (auth.uid){
        this.props.history.push('/')
        return <Redirect to='/' />
    }

    return (
      <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12} className={classes.contain}>
          <div>
            <Paper className={classes.paper} elevation={1} >
              <div style={{ padding: '48px 40px 36px' }}>
                <div style={{ paddingLeft: '40px', paddingRight: '40px'}}>
                  <h2>bMusic Sign Up</h2>
                </div>
                <TextField
                  className={classes.textField}
                  autoFocus
                  onChange={this.handleInputChange}
                  helperText={this.state.fullNameInputError}
                  error={this.state.fullNameInputError.trim() !== ''}
                  name='fullNameInput'
                  label='Full Name'
                  type='text'
                /><br />
                <TextField
                  className={classes.textField}
                  autoFocus
                  onChange={this.handleInputChange}
                  helperText={this.state.artistNameInputError}
                  error={this.state.artistNameInputError.trim() !== ''}
                  name='artistNameInput'
                  label='Artist Name'
                  type='text'
                /><br />
                <TextField
                  className={classes.textField}
                  onChange={this.handleInputChange}
                  helperText={this.state.emailInputError}
                  error={this.state.emailInputError.trim() !== ''}
                  name='emailInput'
                  label='Email'
                  type='email'
                /><br />
                <TextField
                  className={classes.textField}
                  onChange={this.handleInputChange}
                  helperText={this.state.passwordInputError}
                  error={this.state.passwordInputError.trim() !== ''}
                  name='passwordInput'
                  label='Password'
                  type='password'
                /><br />
                <TextField
                  className={classes.textField}
                  onChange={this.handleInputChange}
                  helperText={this.state.confirmInputError}
                  error={this.state.confirmInputError.trim() !== ''}
                  name='confirmInput'
                  label='Confirm Password'
                  type='password'
                /><br />
                <br />
                <div>
                  <div>
                    <Button className ={classes.button} variant='contained' color='primary' onClick={this.handleForm}>Sign Up</Button>
                  </div>
                </div>
              </div>
            </Paper>
          </div>
        </Grid>
      </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    register: (userRegister) => {
      dispatch(signUp(userRegister))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignupComponent))
