import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Button, FormGroup, FormControl } from "react-bootstrap";

import { fetchUserRequest,fetchUserSuccess,fetchUserFailure,toggleUserOperation } from '../../redux'

class LoginPage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       username: '',
       password: ''
    }

    this.usernameHandler = this.usernameHandler.bind(this)
    this.passwordHandler = this.passwordHandler.bind(this)
    this.login = this.login.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }

  usernameHandler = (e) => {
    this.setState({username : e.target.value})
  }

  passwordHandler = (e) => {
    this.setState({password : e.target.value})
  }

  validateForm = () => {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }
  
  login = (e) => {
    e.preventDefault()
    this.props.fetchUserRequest();
    axios.post('http://localhost:8080/users/authenticate',{
        "username" : this.state.username,
        "password" : this.state.password
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

  render() {
    return (
      <div className="LoginForm">
        <form onSubmit={this.login}>
          <FormGroup controlId="username">
            <label>Username</label>
            <FormControl
              autoFocus
              type="text"
              value={this.state.username}
              onChange={this.usernameHandler}
            />
            </FormGroup>
            <FormGroup controlId="password">
            <label>Password</label>
            <FormControl
              autoFocus
              type="password"
              value={this.state.password}
              onChange={this.passwordHandler}
            />
            </FormGroup>
            <Button block disabled={!this.validateForm()} type="submit">
              Login
            </Button>
        </form>
        <Button onClick={() => this.props.toggleUserOperation()}>
          Register
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



export default connect(null, mapDispatchToProps)(LoginPage)

