import React from 'react';
import { connect } from 'react-redux';
import { createRoute } from '../../actions/route_actions';
import { clearErrors } from '../../actions/session_actions';
import { receiveErrors } from '../../actions/route_actions';
import CreateRoute from './create_route';

const msp = (state) => {
    debugger
    return {
    user_id: state.session.id,
    errors: state.routeErrors,
    }
};

const mdp = (dispatch) => ({
    createRoute: (route) => dispatch(createRoute(route)),
    clearErrors: () => dispatch(clearErrors()),
});

export default connect(msp, mdp)(CreateRoute);