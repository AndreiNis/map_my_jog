import React from 'react';
import merge from 'lodash/merge';
import { withRouter } from 'react-router-dom';
import MarkerManager from '../../util/marker_manager';

const getCoordsObj = latLng => ({
    lat: latLng.lat(),
    lng: latLng.lng()
});

const mapOptions = {
    center: {
        lat: 40.783848,
        lng: -73.964573
    },
    zoom: 9,
    mapTypeId: 'roadmap',
    draggableCursor: 'crosshair'
};

class RouteMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            polyline: "",
            name: ""
        };

        this.markers = [];
        this.endpoints = [];

        this.displayRoute = this.displayRoute.bind(this);
        this.clearRoute = this.clearRoute.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const map = this.refs.map;
        this.map = new google.maps.Map(map, mapOptions);
        this.MarkerManager = new MarkerManager(this.map, this.handleMarkerClick.bind(this));
        this.registerListeners();
        this.directionsService = new google.maps.DirectionsService();
        this.directionsDisplay = new google.maps.DirectionsRenderer({
            draggable: true,
            map: this.map,
        });

        let path = new google.maps.MVCArray();
        let routePoly = new google.maps.Polyline({
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });
        routePoly.setMap(this.map);
        this.setState({ polyline: google.maps.geometry.encoding.encodePath(path) });
    }

    componentDidUpdate(prevProps) {
        google.maps.event.addListener(this.map, 'drag', (event) => {
            if (this.props.routes.lat !== prevProps.routes.lat || this.props.routes.lng !== prevProps.routes.lng) {
                this.MarkerManager.updateMarkers(this.props.routes);
            }
        });
    }

    registerListeners() {
        google.maps.event.addListener(this.map, 'click', (event) => {
            const coords = getCoordsObj(event.latLng);
            this.handleClick(coords);
            this.endpoints.push(coords);
            if (this.endpoints.length === 2) {
                this.removeMarkers();
                this.displayRoute(this.endpoints[0], this.endpoints[1], this.directionsService, this.directionsDisplay);
            }
        });
    }

    removeMarkers() {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
    }

    handleMarkerClick(route) {
        this.props.history.push(`routes/${route.id}`);
    }

    handleClick(coords) {
        if (this.markers.length > 1) return
        let marker = new google.maps.Marker({
            position: coords,
            map: this.map,
            draggable: true,
            animation: google.maps.Animation.DROP
        });
        this.markers.push(marker);
    }

    displayRoute(origin, destination, service, display) {
        service.route({
            origin: origin,
            destination: destination,
            travelMode: 'WALKING'
        }, function (response, status) {
            if (status === 'OK') {
                display.setDirections(response);
            } else {
                alert('Could not display directions due to: ' + status);
            }
        }.bind(this));
    }

    clearRoute() {
        this.directionsDisplay.set('directions', null);
        this.markers = [];
        this.endpoints = [];
    }

    handleSubmit(e) {
        e.preventDefault();
        const route = merge({}, this.state);
        this.props.processForm(route, this.props);
    }


    update(field) {
        return (e => this.setState({
            [field]: e.target.value
        }));
    }

    render() {
        return (
            <div>
                <div className="map" ref={map => this.map = map}>
                    
                </div>
                <div className="route-details">Route Details</div>
                <div>
                    <br />
                    <form className="route-inputs" onSubmit={this.handleSubmit}>
                        <input
                            className="name-input"
                            type="text"
                            value={this.state.name}
                            onChange={this.update('name')}
                            placeholder="Name this route"
                        />
                        <input type="submit" className="save-route" value="SAVE ROUTE" />
                    </form>
                    <br />
                </div>
                <button className="clear-route" onClick={this.clearRoute}>CLEAR ROUTE</button>
            </div>
        )
    }
}

export default withRouter(RouteMap);