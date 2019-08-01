import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = ({ currentUser, logout }) => {
    const sessionLinks = () => (
        <nav className="login-signup">
            <Link className="loginButton" to="/login">Log In</Link>
            
            <Link className="signupButton" to="/signup">Sign Up</Link>
        </nav>
    );
    const personalWelcome = () => (
        <hgroup className="header-group">
            <h2 className="header-name">Welcome, {currentUser.first_name}!</h2>
            <button className="header-button" onClick={logout}>Log Out</button>
        </hgroup>
    );

    return currentUser ? personalWelcome() : sessionLinks();
};


export default Welcome;

