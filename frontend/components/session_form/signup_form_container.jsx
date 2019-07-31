import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../../actions/session_actions';
import SessionForm from './session_form';

const msp = ({ errors }) => {
    return {
        errors: errors,
        formType: 'signup',
        navLink: <Link to="/login">Log in instead</Link>,
    };
};

const mdp = dispatch => {
    return {
        processForm: (user) => dispatch(signup(user)),
    };
};

export default connect(msp, mdp)(SessionForm);