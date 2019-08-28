import { connect } from 'react-redux';
import RouteIndex from './route_index';
import { fetchRoutes } from '../../actions/route_actions';

const msp = state => {
    const routes = state.entities.routes;
    return ({ routes }); 
};

const mdp = dispatch => ({
    fetchRoutes: () => dispatch(fetchRoutes()),
});

export default connect(msp, mdp)(RouteIndex);