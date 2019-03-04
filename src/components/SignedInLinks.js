import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../store/actions/authActions'

const SignedInLinks = (props) => {
    return (
        <ul>
            <li><NavLink to='/create'>Upload Song</NavLink></li>
            <li><NavLink to='/' onClick={props.signOut}>Log Out</NavLink></li>
        </ul>
    )

}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)