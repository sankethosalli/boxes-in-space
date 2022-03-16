import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Signup from './Signup';


const auth = () => {
    return (
        <Router>
        <div>

        <Switch>
        <Route path="/login/">
    <Login/>        
            </Route>
            <Route path="/forgot-password/">
    <ForgotPassword/>        
            </Route>
            <Route path="/signup/">
    <Signup/>
            </Route>        
        </Switch>
        </div>
        </Router>
    );
}

export default auth;
