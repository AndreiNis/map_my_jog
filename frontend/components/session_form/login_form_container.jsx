import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../actions/session_actions';
import SessionForm from './session_form';

const msp = ({ errors }) => {
    debugger
    const obj = {}
    errors.errors.forEach(e => {
        let tmp = e.split("or");
        obj[tmp[0]] = e;
    })

    return {
        errors: obj,
        formType: 'Login',
        navLink: <Link to="/signup">SIGN UP</Link>,
    };
};

const mdp = dispatch => {
    const demoUser = ({
        email: "user3@user3.com", 
        password: "stargate", 
        first_name: "Demo", 
        last_name: "User",
        dob: "(Date.new(2001, 02, 03))",
        gender: "Male"
    });
    return {
        processForm: (user) => dispatch(login(user)),
        loginDemoUser: () => dispatch(login(demoUser)),
    };
};

export default connect(msp, mdp)(SessionForm);