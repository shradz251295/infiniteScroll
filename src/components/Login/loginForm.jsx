
import React, { Component } from 'react';
import { TextField, Button, createMuiTheme, MuiThemeProvider, Dialog, InputAdornment, Snackbar } from '@material-ui/core';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';

const theme = createMuiTheme({
    overrides: {
        MuiDialog: {
            paper: {
                margin: '10px',
                overflowY: "hidden",
                overflowX: 'hidden',
                width: '100%'
            }
        },
        MuiDialogContent: {
            root: {
                paddingLeft: '3px',
                paddingRight: '3px',
                height: "400px",
                display: "flex",
                alignItems: "center",
                justifyContent: 'center',
                '@media(min-width:575px) and (max-width:2000px)': {
                    width: '500px'
                },
                overflowY: "hidden"
            }
        },
        MuiBackdrop: {
            root: {
                backgroundColor: "none"
            }
        },
        MuiSnackbarContent:{
            root:{
                backgroundColor :"#d32f2f",
                fontSize:'1rem'
            }
        }

    }
})

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            openSnackBar: false,
            msg: ""
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
        if (this.state.username === "") {
            this.setState({ openSnackBar: true, msg: "Please enter username" })
        } else if (this.state.password === "") {
            this.setState({ openSnackBar: true, msg: "Please enter password" })
        }
        else {

            localStorage.setItem('authenticated_user', true)
            this.props.history.push('/home')
        }
    }

    handleSnackbarClose = () => {
        this.setState({ openSnackBar: false })
    }

    render() {
        if (localStorage.getItem('authenticated_user') !== null) {
            return <Redirect to='/home' />
        }
        else {
            return (
                <MuiThemeProvider theme={theme}>
                    <Dialog
                        open={true}
                        // onClose={this.props.closeCancelTripPopup}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <form className="login_popup">
                            <h1>Sign In Form</h1>
                            <div>
                                <TextField
                                    placeholder="Type your username"
                                    value={this.state.username}
                                    onChange={this.handleUsername}
                                    inputProps={{
                                        style: {
                                            background: '#f1f1f1',
                                            padding: '15px 20px',
                                            borderRadius: '8px'
                                        }
                                    }}
                                    InputProps={{
                                        disableUnderline: true
                                    }}
                                />
                                <TextField
                                    placeholder="Type your password"
                                    value={this.state.password}
                                    onChange={this.handlePassword}
                                    inputProps={{
                                        style: {
                                            background: '#f1f1f1',
                                            padding: '15px 20px',
                                            borderRadius: '8px'
                                        }
                                    }}
                                    InputProps={{
                                        disableUnderline: true
                                    }}
                                />
                            </div>
                            <Button className="login_btn" onClick={this.handleSubmit}>LOGIN</Button>
                        </form>
                    </Dialog>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={this.state.openSnackBar}
                        onClose={this.handleSnackbarClose}
                        message={this.state.msg}
                        autoHideDuration={1500}
                    />
                </MuiThemeProvider >
            )
        }
    }
}
export default withRouter(LoginForm);