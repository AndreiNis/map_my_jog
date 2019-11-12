import { combineReducers } from 'redux';

import session from './session_reducers';
import errors from './session_errors_reducer';
import routeErrors from './routes_errors_reducer';
import entities from './entities_reducer';

export default combineReducers({
    session,
    errors,
    entities,
    routeErrors
})