import React from 'react'
import {Link} from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

const Navbar = (props) => {
    const {auth, profile} = props;
    const links = auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks />
    return (
        <nav style={{backgroundColor:'lightgrey', height:65, position: 'relative', width: '100%', bottom: 22}}>
            <h4>
                <Link to='/home' style={{position: 'absolute', left: 30, top: 20, fontSize: 20, textDecoration: 'none', color: 'blue', zIndex: 3}}>bMusic</Link>
                {links}
            </h4>
        </nav>  
    )

}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar)