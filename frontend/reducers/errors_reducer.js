import { combineReducers } from 'redux';

import errors from './session_errors_reducer';
import routeErrors from './routes_errors_reducer';

export default combineReducers({
    errors,
    routeErrors,
});