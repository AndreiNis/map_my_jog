import React from 'react';
import { Link } from 'react-router-dom';

import RouteIndexItem from './route_index_item';

class RouteIndex extends React.Component {
    componentDidMount() {
        debugger
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
                    <Link className="create-route" to="/routes/create">
                        <button className="create-button">CREATE A ROUTE</button>
                    </Link>
                </div>
                    <label>
                        <li className="thumbnail-cell"><span>Route</span></li>
                        <li><span>Distance</span></li>
                        <li><span>Name</span></li>
                        <li><span>Options</span></li>
                    </label>
                    <label>
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