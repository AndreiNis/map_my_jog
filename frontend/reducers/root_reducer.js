import { combineReducers } from 'redux';

import session from './session_reducers';
import errors from './errors_reducer';
import entities from './entities_reducer';

export default combineReducers({
    session,
    errors,
    entities,
})