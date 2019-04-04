import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
    return (
        <div style={{position: 'relative', top: 20, }}>
            <h3 style={{display:'inline', padding: 15}}><NavLink to='/signup' style={{textDecoration: 'none', color: 'blue'}}>Sign Up</NavLink></h3>
            <h3 style={{display:'inline', padding: 15}}><NavLink to='/signin' style={{textDecoration: 'none', color: 'blue'}}>Log In</NavLink></h3>
        </div>
    )

}

export default SignedOutLinks