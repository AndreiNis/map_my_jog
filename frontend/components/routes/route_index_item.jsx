import React from 'react';
import { Link } from 'react-router-dom';

class RouteIndexItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const route = this.props.route;

        return (
            <tr>
                <td className="thumbnail-cell">
                    <Link to={`/routes/show/${route.id}`}>
                        <img alt="route-map"></img>
                    </Link>
                </td>
                <td>
                    <span>{route.distance} mi</span>
                </td>
                <td>
                    <Link to={`/routes/show/${route.id}`}>
                        <span>{route.name}</span>
                    </Link>
                </td>
            </tr>
        )
    }
}

export default RouteIndexItem;