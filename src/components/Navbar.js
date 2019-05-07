import React from 'react'
import {Link} from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'


const Navbar = (props) => {
    const {auth, profile} = props;
    const links = auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks />
    return (
        <nav style={{ height:65, position: 'relative', width: '100%', bottom: 22, color:'white'}}>
            <h4>
                <Link to='/' style={{position: 'absolute', left: 30, top: 50, fontSize: 30, textDecoration: 'none', color: 'white', zIndex: 3}}>bMusic</Link>
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