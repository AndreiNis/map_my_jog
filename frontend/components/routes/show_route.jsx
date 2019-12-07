// import { Route } from 'react-router-dom';
import React from 'react';
import { Link } from 'react-router-dom';

import CreateComment from '../comments/create_comment';

class RouteShow extends React.Component {
    constructor(props){
        
        super(props);
        this.markers = [];
        this.map = null;
        this.directionsService = new google.maps.DirectionsService();
        this.directionsDisplay = new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            polylineOptions: {
                strokeColor: 'blue',
                strokeOpacity: 1,
                strokeWeight: 3,
            }
         });
    }

    componentDidMount(){
        this.props.fetchRoute(this.props.match.params.routeId).then(
            () => {
            this.decodeMarkers();
            this.initMap();
        })   
    }

    componentDidUpdate(prevProps){
        if (prevProps.match.params.routeId !== this.props.match.params.routeId) {
            this.props.fetchRoute(this.props.match.params.routeId)
        }
    }

    initMap() {
        
        const mapOptions = {mapTypeId: 'roadmap'}
        let map = new google.maps.Map(this.refs.map, mapOptions);
        this.directionsDisplay.setMap(map);
        this.map = map;
        this.calcAndDisplayRoute(this.directionsService, this.directionsDisplay);
    }

    decodeMarkers() {
        
        let coordinateList = this.props.route.polyline.split(',').map(Number);

        for (let i = 0; i < coordinateList.length; i += 2) {
            let coords = { lat: coordinateList[i], lng: coordinateList[i + 1] };
            let marker = new google.maps.Marker({
                position: coords,
                map: this.map,
                icon: {
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    scale: 0,
                },
            });
            this.markers.push(marker);
        }
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


    render() {
        if (!this.props.route) return null;

        return (
        <div className="show-map-container">
           <ul className="show-map-details">
            <span className="home-span">
                <Link className="home-show" to="/">Home</Link>
            </span>
               <li >Route Name: {this.props.route.name}</li>
                <li className="route-distance">Distance: {this.props.route.distance} mi</li>
            </ul>
            <div id="show-map" ref='map'/>         
        </div>
        );
    };
}


export default RouteShow;