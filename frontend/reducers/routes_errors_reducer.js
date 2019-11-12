import { 
    RECEIVE_ROUTE,
    RECEIVE_ERRORS 
} from '../actions/route_actions';

export default (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ERRORS:
            return action.errors;
        case RECEIVE_ROUTE:
            return [];
        default:
            return state;
    }
};