import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../store/actions/authActions'

const SignedInLinks = (props) => {
    return (
        <ul>
            <li style={{display:'inline', padding: 10}}><NavLink to='/create'>Upload Song</NavLink></li>
            <li style={{display:'inline', padding: 10}}><NavLink to='/' onClick={props.signOut}>Log Out</NavLink></li>
            <li style={{display:'inline', padding: 10}}><NavLink to={`/profile/${props.uid}`}>Profile</NavLink></li>
        </ul>
    )
}

const mapStateToProps = (state, ownProps) => {
    const uid = state.firebase.auth.uid
    return {
        uid: uid
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks)