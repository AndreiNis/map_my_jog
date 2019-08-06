import { connect } from 'react-redux';
import RouteMap from './route_map';
import { createRoute, fetchRoutes, deleteRoute } from '../../actions/route_actions';

const msp = state => {
    return {
        routes: state.entities.routes
    };
};

const mdp = dispatch => ({
    fetchRoutes: () => dispatch(fetchRoutes()),
    processForm: (route, props) => dispatch(createRoute(route, props)),
    deleteRoute: (id) => dispatch(deleteRoute(id))
});

export default connect(msp, mdp)(RouteMap);