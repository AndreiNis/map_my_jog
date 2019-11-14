import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../../actions/session_actions';
import SessionForm from './session_form';

const msp = ({ errors }) => {
    const obj = {}
    errors.errors.forEach(e => {
        let tmp = e.split(" ");
        obj[tmp[0]] = e;
    })
    // console.log(obj);
    // console.log(errors);
    return {
        errors: obj,
        formType: 'Sign up',
        navLink: <Link to="/login">LOG IN</Link>,     
    };
};

const mdp = dispatch => {
    return {
        processForm: (user) => dispatch(signup(user)),
    };
};

export default connect(msp, mdp)(SessionForm);