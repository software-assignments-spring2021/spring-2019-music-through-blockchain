import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Homepage extends Component {
  render() {
    console.log('Visit Homepage')
    console.log('props', this.props)
    return (
      <div>
        <h1>bMusic</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps, null)(Homepage)
