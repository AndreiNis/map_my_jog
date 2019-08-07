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
            name: ""
        };

        this.markers = [];
        this.endpoints = [];
        this.routePath = 
    }

    componentDidMount() {
        const map = ReactDOM.findDOMNode(this.refs.map)
        this.map = new google.maps.Map(map, mapOptions);
        this.MarkerManager = new MarkerManager(this.map, this.handleMarkerClick.bind(this));
        this.registerListeners(map);
        this.directionsService = new google.maps.DirectionsService();
        this.directionsDisplay = new google.maps.DirectionsRenderer({
            draggable: false,
            map: this.map,
        });
        // debugger
        // let path = new google.maps.MVCArray();
        // let routePoly = new google.maps.Polyline({
        //     strokeColor: '#FF0000',
        //     strokeOpacity: 1.0,
        //     strokeWeight: 2
        // });
        // routePoly.setMap(this.map);
        // this.setState({ polyline: google.maps.geometry.encoding.encodePath(path) });
    };

    registerListeners(map) {
        google.maps.event.addListener(this.map, 'click', (event) => {
            const coords = getCoords(event.latLng);
            this.handleClick(coords);
            this.endpoints.push(coords);
            
            let routePath = new google.maps.Polyline({
                path: this.endpoints,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            })
            routePath.setMap(this.map);
            // debugger
            // if (this.endpoints.length === 2) {
            //     debugger
            //     this.removeMarkers();
            //     this.displayRoute(this.endpoints[0], this.endpoints[1], this.directionsService, this.directionsDisplay);
            // }
        });
    }
    
    // displayRoute(origin, destination, service, display) {
    //     service.route({
    //         origin: origin,
    //         destination: destination,
    //         // watpoints: waypts,
    //         travelMode: 'WALKING'
    //     }, function (response, status) {
    //         if (status === 'OK') {
    //             display.setDirections(response);
    //         } else {
    //             alert('Could not display directions due to: ' + status);
    //         }
    //     }.bind(this));
    // }

    removeMarkers() {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
    }

    handleMarkerClick(route) {
        this.props.history.push(`routes/${route.id}`);
    }

    handleClick(coords) {
        let marker = new google.maps.Marker({
            position: coords,
            map: this.map,
            draggable: false,
            animation: google.maps.Animation.DROP
        });
        this.markers.push(marker);
        // debugger
    }

    handleSubmit(e) {
        preventDefault();
        const route = merge({}, this.state)
        this.props.processForm(route, this.props);
    }

    update(field){
        return (e => this.setState({
            [field]: e.target.value
        }));
    }
    // addLine() {
    //     flightPath.setMap(map);
    // }

    removeLine() {
        routePath.setMap(null);
    }

    render() {
        return (
            <div>
                <div id='map' ref='map' />
                <button onClick={this.removeLine()} value="Remove Line"/>
                <p>

                </p>
            </div>
        );
    };;
}

export default CreateRoute;