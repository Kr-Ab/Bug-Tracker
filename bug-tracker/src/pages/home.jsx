import React, { Component } from 'react'

import axios from 'axios'

import { connect } from 'react-redux'


import Landing from './landing'
import Dashboard from './dashboard'

import { fetchUserRequest,fetchUserSuccess,fetchUserFailure,toggleUserOperation } from '../redux'

class Home extends Component {

    componentDidMount(){
        this.props.fetchUserRequest()
        axios.get('http://localhost:8080/users/profile',{headers : { "Authorization" : localStorage.getItem('token') }})
        .then((response) => {
            this.props.fetchUserSuccess(response.data.user,localStorage.getItem('token'))
        })
        .catch((error) => {
            this.props.fetchUserFailure(error)
            localStorage.clear()
        })
    }
    
    render() {
        return this.props.loading ?
        (
            <h2>Loading</h2>
        ) : this.props.loggedin ?
        (
            <Dashboard role={this.props.role} />
        ) :
        (
            <Landing />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        loggedin : state.user.loggedin,
        role : state.user.user.role
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      fetchUserRequest : () => dispatch(fetchUserRequest()),
      fetchUserSuccess : (user,token) => dispatch(fetchUserSuccess(user,token)),
      fetchUserFailure : () => dispatch(fetchUserFailure()),
      toggleUserOperation : () => dispatch(toggleUserOperation())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
