import { RECEIVE_ROUTES, RECEIVE_ROUTE, REMOVE_ROUTE } from '../actions/route_actions';
import { merge } from 'lodash';

const routesReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case RECEIVE_ROUTES:
            return action.routes;
        case RECEIVE_ROUTE:
            return merge({}, state, { [action.route.id]: action.route });
        case REMOVE_ROUTE:
            newState = merge({}, state);
            delete newState[action.routeId];
            return newState;
        default:
            return state;
    }
};

export default routesReducer;