import React from 'react';
import { Link } from 'react-router-dom';

class RouteIndexItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const route = this.props.route;

        return (
            <div className="view-item">
                <Link to={`/routes/show/${route.id}`}>
                    <span>{route.name}</span>
                </Link>
                <span>{route.distance} mi</span>         
            </div>          
        )
    }
}

export default RouteIndexItem;