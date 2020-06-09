import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Button, FormGroup, FormControl } from "react-bootstrap";

import { registerUserRequest,registerUserSuccess,registerUserFailure,toggleUserOperation } from '../../redux'

class Register extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      name: '',
      email:'',
      username: '',
      password: '',
      role: ''
    }
    this.nameHandler = this.nameHandler.bind(this)
    this.emailHandler = this.emailHandler.bind(this)
    this.usernameHandler = this.usernameHandler.bind(this)
    this.passwordHandler = this.passwordHandler.bind(this)
    this.roleHandler = this.roleHandler.bind(this)
    this.register = this.register.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }

  nameHandler = (e) => {
    this.setState({name : e.target.value})
  }

  emailHandler = (e) => {
    this.setState({email : e.target.value})
  }

  usernameHandler = (e) => {
    this.setState({username : e.target.value})
  }

  passwordHandler = (e) => {
    this.setState({password : e.target.value})
  }

  roleHandler = (e) => {
    this.setState({role : e.target.value})
  }

  validateForm = () => {
    return this.state.name.length > 0 && this.state.email.length > 0 && this.state.username.length > 0 && this.state.password.length > 0 && this.state.role.length > 0;
  }
  
  register = (e) => {
    e.preventDefault()
    this.props.registerUserRequest();
    axios.post('http://localhost:8080/users/register',{
        "name" : this.state.name,
        "email" : this.state.email,
        "username" : this.state.username,
        "password" : this.state.password,
        "role" : this.state.role
    }).then(response => {
      if(response.data.Success)
      {
        this.props.registerUserSuccess()
        this.props.toggleUserOperation()
      }
      else
      {
        this.props.registerUserFailure("Registration Failed")
      }
    }).catch(error => {
      this.props.registerUserFailure("Registration Failed")
    })
  }

  render() {
    return (
      <div className="RegstrationForm">
        <form onSubmit={this.register}>
          <FormGroup controlId="name">
            <label>Name</label>
            <FormControl
              autoFocus
              type="text"
              value={this.state.name}
              onChange={this.nameHandler}
            />
          </FormGroup>
          <FormGroup controlId="email">
            <label>Email</label>
            <FormControl
              autoFocus
              type="text"
              value={this.state.email}
              onChange={this.emailHandler}
            />
          </FormGroup>
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
          <FormGroup controlId="role">
            <label>Role</label>
            <FormControl
              autoFocus
              as="select"
              value={this.state.role}
              onChange={this.roleHandler}
            >
              <option value=""></option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Developer">Developer</option>
              <option value="Submitter">Submitter</option>
            </FormControl>
          </FormGroup>
            <Button block disabled={!this.validateForm()} type="submit">
              Register
            </Button>
        </form>
        <Button onClick={() => this.props.toggleUserOperation()}>
          Go Back!
        </Button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    registerUserRequest : () => dispatch(registerUserRequest()),
    registerUserSuccess : () => dispatch(registerUserSuccess()),
    registerUserFailure : () => dispatch(registerUserFailure()),
    toggleUserOperation : () => dispatch(toggleUserOperation())
  }
}



export default connect(null, mapDispatchToProps)(Register)

