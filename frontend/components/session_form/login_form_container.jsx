import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../actions/session_actions';
import SessionForm from './session_form';

const msp = ({ errors }) => {
    const obj = {}
    errors.forEach(e => {
        let tmp = e.split("or");
        obj[tmp[0]] = e;
    })
    console.log(obj);
    return {
        errors: obj,
        formType: 'Login',
        navLink: <Link to="/signup">SIGN UP</Link>,
    };
};

const mdp = dispatch => {
    return {
        processForm: (user) => dispatch(login(user)),
    };
};

export default connect(msp, mdp)(SessionForm);