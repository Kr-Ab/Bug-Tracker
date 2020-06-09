import React, { Component } from 'react'

import { connect } from 'react-redux'
import { Button } from "react-bootstrap";
import axios from 'axios'

import { fetchUserRequest,fetchUserSuccess,fetchUserFailure,toggleUserOperation } from '../../redux'

class Demo extends Component {

    constructor(props) {
      super(props)
      this.demologin = this.demologin.bind(this)
      this.login = this.login.bind(this)
    }
    


    login = (username,password) => {
        this.props.fetchUserRequest();
        axios.post('http://localhost:8080/users/authenticate',{
            "username" : username,
            "password" : password
        }).then(response => {
            if(response.data.Success)
            {
              localStorage.setItem("token",response.data.token)
              axios.get('http://localhost:8080/users/profile',{headers : { "Authorization" : response.data.token }})
                  .then(res => {
                      this.props.fetchUserSuccess(res.data.user,localStorage.getItem('token'))
                  })
                  .catch(error => {
                    this.props.fetchUserFailure(error)
                    localStorage.clear()
                  })
            }
            else{
              this.props.fetchUserFailure("error")
            }
        }).catch(error => {
          this.props.fetchUserFailure(error)
        })
    }


    demologin = (e,mode) => {
        e.preventDefault()
        if(mode === 'Admin')
        {
            this.login('demoadmin','demoadmin');
        }
        if(mode === 'Manager')
        {
            this.login('demomanager','demomanager');
        }
        if(mode === 'Developer')
        {
            this.login('demodeveloper','demodeveloper');
        }
        if(mode === 'Submitter')
        {
            this.login('demosubmitter','demosubmitter');
        }
        this.props.toggleUserOperation()

    }

    render() {
        return (
            <div>
                <Button value='Admin' onClick={e => this.demologin(e,e.target.value)}>
                    Admin
                </Button>
                <Button value='Manager' onClick={e => this.demologin(e,e.target.value)}>
                    Manager
                </Button>
                <Button value='Developer' onClick={e => this.demologin(e,e.target.value)}>
                    Developer
                </Button>
                <Button value='Submitter' onClick={e => this.demologin(e,e.target.value)}>
                    Submitter
                </Button>
            </div>
        )
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

export default connect(null,mapDispatchToProps)(Demo)
