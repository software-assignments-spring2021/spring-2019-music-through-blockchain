import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import {signUp} from '../store/actions/authActions'
import { Grid } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import {SignupComponent} from "./SignupComponent";
import {dbUploadSong} from '../store/actions/songActions'

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
    }
})

export class SongUploadComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            songNameInput: '',
            songNameInputError: '',
            artistNameInput: '',
            artistNameInputError: '',
            priceInput: '',
            priceInputError: '',
            songFileInput: '',
            songFileInputError: '',
            songFile: null
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
            case 'songNameInput':
                this.setState({
                    songNameInputError: ''
                })
                break
            case 'artistNameInput':
                this.setState({
                    artistNameInputError: ''
                })
                break
            case 'priceInput':
                this.setState({
                    priceInputError: ''
                })
                break
            case 'songFileInput':
                this.setState({
                    songFileInputError: ''
                })
                break
            default:

        }
    }

    handleForm = () => {

        const { songNameInput, artistNameInput, priceInput, songFileInput}= this.state
        const { upload } = this.props

        let error = false

        // Validate full name
        let songNameCheck = songNameInput.trim().toLowerCase()

        if (songNameCheck.length < 2) {
            this.setState({
                songNameInputError: 'Please enter a valid song name'
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

       /* Check artist name*/
        let intPrice = parseInt(priceInput)


        if (isNaN(intPrice)) {
            if (!intPrice || intPrice <= 0) {
                this.setState({
                    priceInputError: 'Please enter a valid price'
                })
                error = true
            }
        }

        if (!error) {
            const songInfo = {
                title: songNameInput,
                artistName: artistNameInput,
                price: priceInput}
            const callBack = () => {
                this.props.history.push('/')
                return <Redirect to='/' />
            }
            upload(
                songInfo,
                this.state.file,
                this.state.file.name,
                this.state.songFile,
                this.state.songFile.name,
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

    onSongChange = (e) => {
        this.setState({songFile:e.target.files[0]})
    }

    render() {
        console.log("song upload props", this.props);
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
                                    <h2>bMusic Song Upload</h2>
                                </div>
                                <TextField
                                    className={classes.textField}
                                    autoFocus
                                    onChange={this.handleInputChange}
                                    helperText={this.state.songNameInputError}
                                    error={this.state.songNameInputError.trim() !== ''}
                                    name='songNameInput'
                                    label='Song Name'
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
                                    helperText={this.state.priceInputError}
                                    error={this.state.priceInputError.trim() !== ''}
                                    name='priceInput'
                                    label='Price'
                                    type='text'
                                /><br />
                                <br />
                                <div>
                                    <div>
                                        <div>Choose mp3 file to upload</div>
                                        <input
                                               onChange={this.onSongChange}
                                               error={this.state.songFileInputError.trim() !== ''}
                                               accept='.mp3'
                                               label='Choose mp3 file to upload'
                                               name='songFileInput'
                                               type="file"
                                        />
                                    </div>
                                    <div>
                                        <div>Choose cover art to upload</div>
                                        <input
                                            onChange={this.onImageChange}
                                            error={this.state.songFileInputError.trim() !== ''}
                                            label='Choose cover art to upload'
                                            name='coverArtInput'
                                            type="file"
                                        />
                                    </div>
                                    <div>
                                        <Button variant='contained' color='primary' onClick={this.handleForm}>Upload Song</Button>
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
        upload: (songInfo, image, imageName, song, songName, callBack) => { dispatch(dbUploadSong(songInfo, image, imageName, song, songName, callBack)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SongUploadComponent))
