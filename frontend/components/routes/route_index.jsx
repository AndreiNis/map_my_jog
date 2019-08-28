import React from 'react';
import { Link } from 'react-router-dom';
import RouteIndexItem from './route_index_item';

class RouteIndex extends React.Component {
    componentDidMount() {
        this.props.fetchRoutes();
    }

    render() {
        const routes = Object.values(this.props.routes);

        return (
            <div className="top-routes-container">
                <div className="routes-container">
                    <h3 className="routes-title">
                        <span>ROUTES</span>
                        </h3>
                    {/* <Link className="create-route" to="/routes/create">
                        <button className="create-button">CREATE A ROUTE</button>
                    </Link> */}
                </div>
                    <label className="view-label">
                        <ul><span>Name</span></ul>
                        <ul><span>Distance</span></ul>
                    </label>
                    <label className="view-list">
                    {
                        routes.map(route => (
                            <RouteIndexItem
                                key={route.id}
                                route={route}
                            />
                            )
                        )
                    }
                </label>
            </div>
        );
    }
}

export default RouteIndex;