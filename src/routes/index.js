import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    // Switch
} from "react-router-dom";
import HomePage from '../pages/home';
import Login from '../pages/login';


class Routes extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Route path='/login' component={Login}/>
                    <Route path='/home' component={HomePage}/>
                </Router>
            </div>
        )
    }
}

export default Routes;