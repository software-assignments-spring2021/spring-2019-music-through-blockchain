import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import {signUp} from '../store/actions/authActions'
import { Grid } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import {upload} from '../store/actions/songUploadActions'
import {dbEditProfile} from '../store/actions/userActions'


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
        margin: 'auto',
    },
    button: {
        background: "linear-gradient(to right, #647DEE, #7F53AC) !important",
        width: 300,
        color: 'white !important',
        marginTop: 20,
        fontSize: 16
    },
    input: {
        marginBottom: 20
    }
})

export class EditProfileComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            editNameInput: props.accountOwner || '',
            editNameInputError: '',
            editArtistNameInput: props.artistName || '',
            editArtistNameInputError: '',
            userInfoInput: props.biography || '',
            userInfoInputError: '',
            profilePictureFileInput: null,
            profilePictureFileInputError: '',
            file: null

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
            case 'editNameInput':
                this.setState({
                    editNameInputError: ''
                })
                break
            case 'editArtistNameInput':
                this.setState({
                    editArtistNameInputError: ''
                })
                break
            case 'userInfoInput':
                this.setState({
                    userInfoInputError: ''
                })
                break
            case 'profilePictureFileInput':
                this.setState({
                    profilePictureFileInputError: ''
                })
                break
            default:

        }
    }

    handleForm = () => {

        const { editNameInput, userInfoInput, editArtistNameInput, profilePictureFileInput, file}= this.state
        const { editProfile } = this.props

        let error = false

        let songNameCheck = editNameInput.trim().toLowerCase()

        /*check name input*/
        if (editNameInput.length < 1) {
            this.setState({
                editNameInputError: 'Please enter a valid name'
            })
            error = true
        }

        /*check artist name input*/
        if (editArtistNameInput.length < 1) {
            this.setState({
                editArtistNameInputError: 'Please enter a valid artist name'
            })
            error = true
        }

        /* Check userbio */
        if (userInfoInput.trim().length > 2000) {
            this.setState({
                userInfoInputError: 'Please enter no more than 2000 characters'
            })
            error = true
        }

        if (file) {
            const typeArr = ['png', 'jpg', 'jpeg', 'gif']
            const fileType = file.type.split('/').pop()
            console.log(fileType)
            if (!typeArr.includes(fileType)) {
                this.setState({
                    profilePictureFileInputError: 'Please enter a \'png\', \'jpg\', \'jpeg\' or \'gif\' file'
                })
                error = true
            }
        }

        if (!error) {
            const profileInfo = {
                artistName: editArtistNameInput,
                accountOwner: editNameInput,
                biography: userInfoInput
            }
            const callBack = () => {
                this.props.history.push('/')
                return <Redirect to='/'/>
            }

            editProfile(
                profileInfo,
                this.state.file,
                (this.state.file) ? this.state.file.name : null,
                callBack
            )
        }
        else {
            console.log('form input error')
        }
    }


    onImageChange = (e) => {
        this.setState({file:e.target.files[0]})
    }

    render() {

        const { classes, auth } = this.props
        if (!auth.uid){
            this.props.history.push('/')
            return <Redirect to='/' />
        }

        return (
            <Grid container spacing={24} style={{display: 'inline', backgroundColor: 'grey'}}>
                <Grid item xs={12} className={classes.contain}>
                    <div>
                        <Paper className={classes.paper} elevation={1} >
                            <div style={{ padding: '48px 40px 36px' }}>
                                <div style={{ paddingLeft: '40px', paddingRight: '40px'}}>
                                    <h2>Edit Your Profile</h2>
                                </div>
                                <TextField
                                    className={classes.textField}
                                    autoFocus
                                    onChange={this.handleInputChange}
                                    helperText={this.state.editNameInputError}
                                    error={this.state.editNameInputError.trim() !== ''}
                                    name='editNameInput'
                                    label='Name'
                                    value={this.state.editNameInput}
                                    type='text'
                                /><br />
                                <TextField
                                    className={classes.textField}
                                    autoFocus
                                    onChange={this.handleInputChange}
                                    helperText={this.state.editArtistNameInputError}
                                    error={this.state.editArtistNameInputError.trim() !== ''}
                                    name='editArtistNameInput'
                                    label='Artist Name'
                                    value={this.state.editArtistNameInput}
                                    type='text'
                                /><br />
                                <TextField
                                    className={classes.textField}
                                    onChange={this.handleInputChange}
                                    helperText={this.state.userInfoInputError}
                                    error={this.state.userInfoInputError.trim() !== ''}
                                    name='userInfoInput'
                                    label='Biography'
                                    value={this.state.userInfoInput}
                                    type='textarea'
                                /><br />
                                <br />
                                <div>
                                    <div>
                                        <div>Choose profile picture file to upload</div>
                                        <input
                                            onChange={this.onImageChange}
                                            helperText={this.state.profilePictureFileInputError}
                                            error={this.state.profilePictureFileInputError.trim() !== ''}
                                            accept='image/png, image/jpeg, image/gif'
                                            label='Choose a profile picture to upload'
                                            name='profilePictureFileInput'
                                            type="file"
                                        />
                                    </div>

                                    <div>
                                        <Button className ={classes.button} variant='contained' color='primary' onClick={this.handleForm}>Save Changes</Button>
                                    </div>
                                </div>
                            </div>
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
        editProfile: (profileInfo, image, imageName, callBack) => {
            dispatch(dbEditProfile(profileInfo, image, imageName, callBack))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditProfileComponent))
