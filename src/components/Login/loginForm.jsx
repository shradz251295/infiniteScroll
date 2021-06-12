
import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    handleUsername = (event) => {
        this.setState({ username: event.target.value })
    }

    handlePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    handleSubmit = () => {
        if (this.state.username === "foo" && this.state.password === "bar") {
            localStorage.setItem('authenticated_user', true)
            this.props.history.push('/home')
        }
    }

    render() {
        if (localStorage.getItem('authenticated_user') !== null) {
            return <Redirect to='/home' />
        }
        else {
            return (
                <form style={{
                    background: '#fff',
                    width: '400px',
                    margin: "0 auto",
                    height: "auto",
                    marginTop: '10%',
                    height: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px'
                }}>
                    <h3>SIGN IN</h3>
                    <TextField
                        label="Username"
                        placeholder="Type your username"
                        value={this.state.username}
                        onChange={this.handleUsername}
                    />
                    <TextField
                        label="Password"
                        placeholder="Type your password"
                        value={this.state.password}
                        onChange={this.handlePassword}
                    />
                    <Button onClick={this.handleSubmit}>LOGIN</Button>
                </form>

            )
        }
    }
}
export default withRouter(LoginForm);