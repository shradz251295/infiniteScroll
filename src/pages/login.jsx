import React, { Component } from 'react';
import LoginForm from '../components/Login/loginForm';

class Login extends Component {
    render() {
        return (
            <div style={{
                background: 'linear-gradient(to right, #282460 0%, #6767db 100%)',
                width:"100%",
                position:'absolute',
                textAlign:'center',
                display:'flex',
                height:'100%'
            }}>
                <LoginForm />
            </div>
        )
    }
}
export default Login;