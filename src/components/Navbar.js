import React from 'react'
import {Link} from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

const styles = theme => ({
    title: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    }
})

const Navbar = (props) => {
    const {auth, profile, classes} = props;
    const links = auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks />
    return (
        <nav style={{ height:65, position: 'relative', width: '100%', bottom: 22}}>
            <h4>
                <Link to='/' style={{position: 'absolute', left: 30, top: 50, fontSize: 30, textDecoration: 'none', color: '#563a72', zIndex: 3, textShadowColor: 'rgba(0, 0, 0, 0.75)',
                    textShadowOffset: {width: -1, height: 1},
                    textShadowRadius: 10}}>bMusic</Link>
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