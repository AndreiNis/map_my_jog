import React from 'react';
import { connect } from 'react-redux';
import { createRoute } from '../../actions/route_actions';
import { clearErrors } from '../../actions/session_actions';
import CreateRoute from './create_route';

const msp = (state) => ({
    user_id: state.session.id
});

const mdp = (dispatch) => ({
    processForm: (route, props) => dispatch(createRoute(route, props)),
    clearErrors: () => dispatch(clearErrors())
});

export default connect(msp, mdp)(CreateRoute);