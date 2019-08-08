import React from 'react';
import ReactDOM from 'react-dom';
import merge from 'lodash/merge';
import MarkerManager from '../../util/marker_manager';
import { withRouter } from 'react-router-dom';


const getCoords = latLng => ({
    lat: latLng.lat(),
    lng: latLng.lng()
});

const mapOptions = {
    center: {
        lat: 40.783848,
        lng: -73.964573
    },
    zoom: 13,
    mapTypeId: 'roadmap',
    draggableCursor: 'crosshair'
};

class CreateRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            polyline: "",
            name: "",
            distance: 0
        };

        this.markers = [];
        this.endpoints = [];
        this.map = null;
        this.directionsService = new google.maps.DirectionsService();
        this.directionsDisplay = new google.maps.DirectionsRenderer({ preserveViewport: true });
        this.addMarker = this.addMarker.bind(this);
        // this.encodeMarkers = this.encodeMarkers.bind(this);
        this.undoMarker = this.undoMarker.bind(this);
        this.clearMap = this.clearMap.bind(this);
        // this.saveRoute = this.saveRoute.bind(this);
    }

    componentDidMount() {
        this.initMap();
    };

    initMap() {
        let map = new google.maps.Map(this.refs.map, mapOptions);
        this.directionsDisplay.setMap(map);
        this.map = map;
        this.map.addListener('click', event => {
            this.addMarker({ lat: event.latLng.lat(), lng: event.latLng.lng() });
            this.calcAndDisplayRoute(this.directionsService, this.directionsDisplay);
        });
    }

    addMarker(coords) {
        let iconScale = 0;

        let marker = new google.maps.Marker({
            position: coords,
            map: this.map,
            icon: {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scale: iconScale,
            }
        });
        this.markers.push(marker);
    }

    undoMarker(e) {
        e.preventDefault();
        this.markers.pop();

        if (this.markers.length === 0) {
            this.clearMap();
        } else {
            this.calcAndDisplayRoute(this.directionsService, this.directionsDisplay);
        }
    }

    clearMap() {
        this.markers = [];
        this.directionsDisplay.setMap(null);
        this.directionsDisplay = null;
        this.setState({ distance: 0 });

        this.directionsDisplay = new google.maps.DirectionsRenderer({ preserveViewport: true });
        this.directionsDisplay.setMap(this.map);
    }
    calcAndDisplayRoute(directionsService, directionsDisplay) {
        let start = this.markers[0].position;
        let end = this.markers[this.markers.length - 1].position;
        let waypoints = [];

        for (let i = 1; i < this.markers.length - 1; i++) {
            waypoints.push({
                location: this.markers[i].position,
                stopover: false,
            });
        }

        const request = {
            origin: start,
            waypoints: waypoints,
            destination: end,
            travelMode: google.maps.DirectionsTravelMode.WALKING,
        };

        this.directionsService.route(request, (response, status) => {
            if (status == 'OK') {
                this.directionsDisplay.setDirections(response);

                let distanceInMeters = 0;
                response.routes[0].legs.forEach((leg) => distanceInMeters += leg.distance.value);

                this.setState({ distance: (distanceInMeters / 1609.344).toFixed(2) });
            }
        });
    }

    removeMarkers() {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
    }

    encodeMarkers() {
        let markerString = '';
        this.markers.forEach(marker => {
            let latitude = marker.getPosition().lat();
            let longitude = marker.getPosition().lng();
            markerString += `${latitude},${longitude},`;
        });

        return markerString.slice(0, -1);
    }
    // handleClick(coords) {
    //     let marker = new google.maps.Marker({
    //         position: coords,
    //         map: this.map,
    //         draggable: false,
    //         animation: google.maps.Animation.DROP
    //     });
    //     this.markers.push(marker);
    //     // debugger
    // }

    // handleSubmit(e) {
    //     preventDefault();
    //     const route = merge({}, this.state)
    //     this.props.processForm(route, this.props);
    // }
    newParams() {
        return {
            name: this.state.name,
            polyline: this.encodeMarkers(),
            user_id: this.state.userId,
            distance: this.state.distance,
        };
    }

    update(field){
        return (e => this.setState({
            [field]: e.target.value
        }));
    }

    saveRoute(e) {
        e.preventDefault();
        this.props.createRoute(this.newParams())
        .then(data => this.props.history.push(`/routes/show/${data.skateRoute.id}`));
    }
    // addLine() {
    //     flightPath.setMap(map);
    // }

    // removeLine() {
    //     routePath.setMap(null);
    // }

    render() {
        return (
            <div>
                <div id='map' ref='map' />
                {/* <button onClick={this.removeLine()} value="Remove Line"/> */}
                <p>

                </p>
            </div>
        );
    };;
}

export default CreateRoute;