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
    },
    button: {
        background: "linear-gradient(to right, #647DEE, #7F53AC) !important",
        width: 300,
        color: 'white !important',
        marginTop: 20,
        fontSize: 16,
        marginBottom: 10
    },
    input: {
        marginBottom: 20
    },
    success: {
        color: '#33cc33'
    },
    error: {
        color: '#ff0000'
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
            songFileInput: '',
            songFileInputError: '',
            songFile: null,
            coverArtFileInputError: '',
            contractError: ''
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
            case 'songFileInput':
                this.setState({
                    songFileInputError: ''
                })
                break
            case 'contractError':
                this.setState({
                    contractError: ''
                })
                break
            default:

        }
    }

    handleForm = () => {

        const { songNameInput, artistNameInput, priceInput, songFileInput, file, songFile}= this.state
        const { upload } = this.props
        const { drizzleState } = this.props;

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

        if (!file) {
            this.setState({
                coverArtFileInputError: 'Please choose a song photo*'
            })
            error = true
        }
        else {
            this.setState({
                coverArtFileInputError: ''
            })
        }

        if (!songFile) {
            this.setState({
                songFileInputError: 'Please choose an mp3 file to upload*'
            })
            error = true
        }
        else {
            this.setState({
                songFileInputError: ''
            })
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

        const newSongAddress = this.uploadTransaction();

        if (!error) {

            const songInfo = {
                songPublicAddress: newSongAddress,
                title: songNameInput,
                artistName: artistNameInput,
                price: priceInput}
            
            const artistPublicAddress = drizzleState.accounts[0];
            
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
                artistPublicAddress,
                callBack
            )
        }
        else {
            console.log('form input error')
        }
    }

    uploadTransaction = () => {
        return new Promise((resolve, reject) => {
            const { drizzle, drizzleState } = this.props;
            const contract = drizzle.contracts.SongsContract;
    
            let newSongAddress = drizzle.web3.eth.accounts.create();
    
            if(drizzleState.drizzleStatus.initialized){
                
                contract.methods.registerSong(newSongAddress.address).send({from: drizzleState.accounts[0], gas: 4712388,}, 
                    function(error, result){
                        if(error){
                            console.log(error);
                            return undefined;
                        } else{
                            console.log("TX hash is " + result);
                            console.log("The new Song's address is: " + newSongAddress.address);
                            return newSongAddress.address;
                        }
                    }                
                );
            }
            return undefined;
        });
    }

    onImageChange = (e) => {
        this.setState({file:e.target.files[0]})
    }

    onSongChange = (e) => {
        this.setState({songFile:e.target.files[0]})
    }

    render() {
        console.log("song upload props", this.props);
        const { classes, auth, drizzleState } = this.props
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
                                    <h2>Upload a Song</h2>
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
                                <br />
                                <div>
                                    <div>
                                        {this.state.songFileInputError ?
                                            <div className={classes.error}>
                                                {this.state.songFileInputError}
                                            </div> :
                                            <div>
                                            </div>
                                        }
                                        <div>Choose mp3 file to upload</div>
                                        <input
                                               className={classes.input}
                                               onChange={this.onSongChange}
                                               error={this.state.songFileInputError.trim() !== ''}
                                               accept='.mp3'
                                               label='Choose mp3 file to upload'
                                               name='songFileInput'
                                               type="file"
                                        />
                                    </div>
                                    <div>
                                        {this.state.coverArtFileInputError ?
                                            <div className={classes.error}>
                                                {this.state.coverArtFileInputError}
                                            </div> :
                                            <div>
                                            </div>
                                        }
                                        <div>Choose cover art to upload</div>
                                        <input
                                            onChange={this.onImageChange}
                                            error={this.state.coverArtFileInputError.trim() !== ''}
                                            accept='image/png, image/jpeg, image/gif'
                                            label='Choose cover art to upload'
                                            name='coverArtInput'
                                            type="file"
                                        />
                                    </div>
                                    <div>
                                        <Button className ={classes.button} variant='contained' color='primary' onClick={this.handleForm}>Upload Song</Button>
                                    </div>
                                    {this.props.song.user.saveSuccess ?
                                        <div className={classes.success}>
                                            Uploaded Song Successfully ✔
                                        </div> :
                                        <div>
                                        </div>
                                    }
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
        profile: state.firebase.profile,
        song: state.song
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        upload: (songInfo, image, imageName, song, songName, artistPublicAddress, callBack) => { dispatch(dbUploadSong(songInfo, image, imageName, song, songName, artistPublicAddress, callBack)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SongUploadComponent))
