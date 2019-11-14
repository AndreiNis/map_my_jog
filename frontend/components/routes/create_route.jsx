import React from 'react';
// import ReactDOM from 'react-dom';
// import merge from 'lodash/merge';
// import { withRouter } from 'react-router-dom';

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
        
        super(props); // need more stuff in state
        
        this.state = {
            userId: null, // pass user ???
            polyline: "",
            name: "",
            distance: 0
        };

        this.markers = [];
        this.map = null;
        this.directionsService = new google.maps.DirectionsService();
        this.directionsDisplay = new google.maps.DirectionsRenderer({ preserveViewport: true });
        this.addMarker = this.addMarker.bind(this);
        this.encodeMarkers = this.encodeMarkers.bind(this);
        this.undoMarker = this.undoMarker.bind(this);
        this.clearMap = this.clearMap.bind(this);
        this.saveRoute = this.saveRoute.bind(this);
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
        if (this.markers.length > 1) {
        this.props.createRoute(this.newParams()).
        then(data => this.props.history.push(`/routes/show/${data.route.id}`));
        } else {
            console.log("At least two locations are required to save route.");
            alert("At least two locations are required to save route.");
        }
    }

    renderErrors() {
        const errorsArray = Object.values(this.props.errors);
        console.log(errorsArray);
        const errors = errorsArray.map((value, i) => {
            return (
                <li key={i}>
                    {value}
                </li>
            )
        })

        return (
            <ul>
                {errors}
            </ul>
        )
    }

    render() {
        debugger
        // const {routeErrors} = Object.values(this.props.errors);
        // console.log(routeErrors);
        // const errorsArr = Object.values(this.props.errors);
        const { errors } = this.props;
        console.log(errors);
        return (
            <div className="map-page">
                <label className="map-container">
                    <div id='map' ref='map' />
                </label>
            <div className="map-buttons-container">
                <button className="map-buttons" onClick={this.undoMarker}>Undo</button>    
                <button className="map-buttons" onClick={this.clearMap}>Clear</button>    
            </div>
                <form className="new-route-form" onSubmit={this.saveRoute}>
                    <div className="controls">
                        <input
                            className="form-map-input"
                            type="text"
                            id="name-form-input"
                            value={this.state.name}
                            onChange={this.update('name')}
                            placeholder="Name this map"
                        />
                        <span className="required"> *</span>
                    </div>
                    <button
                        className="route-save"
                        type="submit"
                    >SAVE ROUTE</button>
                </form>
                <span className="create-error">
                    {errors}
                </span>
            </div>
        );
    };
}

export default CreateRoute;