import React from 'react';
import "./Login.css";

function Login(props) {
    return (
        <div className="login">
            
        
        <div className="login__heading">
        Login
        </div>

        <div className="login__button_wrapper">
        
        <button className="login__button">
        <img className="login__button__image" src="/images/google.ico" alt="" /> <span className="login__button__text">Login with Google</span>
        </button>
        
        <br />
        <button className="login__button">
        <img className="login__button__image" src="/images/facebook.ico" alt="" /> <span className="login__button__text">Login with Facebook</span>
        </button>
        
        <br />
        <button className="login__button">
        <img className="login__button__image" src="/images/linkedin.ico" alt="" /> <span className="login__button__text">Login with LinkedIn</span>
        </button>

        <button className="login__button">
        <img className="login__button__image" src="/images/github.ico" alt="" /> <span className="login__button__text">Login with Github</span>
        </button>
        </div>

        
        </div>
    );
}

export default Login;