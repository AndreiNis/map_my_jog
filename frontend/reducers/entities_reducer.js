import { combineReducers } from 'redux';

import users from './users_reducer';
import routes from './routes_reducer';
import comments from './comments_reducer';

export default combineReducers({
    users,
    routes,
    comments,
});