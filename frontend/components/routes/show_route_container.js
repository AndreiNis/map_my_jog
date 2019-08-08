import { connect } from 'react-redux';
import ShowRoute from './show_route';
import { fetchRoute } from '../../actions/route_actions';
import { withRouter } from 'react-router-dom';

const msp = (state, { match }) => {
    
    const routeId = parseInt(match.params.routeId);
    const route = state.entities.routes[routeId];
    
    return {
        route: route
    }
};

const mdp = (dispatch) => ({
    fetchRoute: (id) => dispatch(fetchRoute(id)),
});

export default connect(msp, mdp)(ShowRoute);