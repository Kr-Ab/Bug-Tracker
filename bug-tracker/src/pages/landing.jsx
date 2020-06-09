import React, { Component } from 'react'
import { connect } from 'react-redux'

import LoginPage from '../Components/login/LoginPage'
import Register from '../Components/register/register'
import Loading from '../Components/loading/loading'
import Demo from '../Components/demo/demo'


class Landing extends Component {
    
  render() {
    return (
        <div>
            {this.props.loading && <Loading />}
            {!this.props.loading && this.props.isLogin && <LoginPage />}
            {!this.props.loading && this.props.isRegister && <Register />}
            <Demo />
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        loading : state.user.loading,
        isLogin : state.user.isLogin,
        isRegister : state.user.isRegister
    }
}

export default connect(mapStateToProps,null)(Landing)
