import React from 'react';
import ReactDOM from 'react-dom';
import merge from 'lodash/merge';
import MarkerManager from '../../util/marker_manager';
import { withRouter } from 'react-router-dom';

const mapCenter = { lat: 40.783848, lng: -73.964573};

// const locations = [
//     { lat: 40.754910, lng: -73.994100, name: "Empire State Building" },
//     { lat: 40.744680, lng: -73.758070, name: "Queens" },
//     { lat: 40.611700, lng: -73.909150, name: "Brooklyn" }
// ]

const getCoords = latLng => ({
    lat: latLng.lat(),
    lng: latLng.lng()
});

class CreateRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            polyline: "",
            name: ""
        };

        this.markers = [];
        this.endpoints = [];
        this.mapCenter = { lat: 40.783848, lng: -73.964573 };

        // this.addLocation = this.addLocation.bind(this);
    }

    componentDidMount() {
        const map = ReactDOM.findDOMNode(this.refs.map)

        const options = {
            mapTypeId: 'roadmap',
            draggableCursor: 'crosshair',
            center: this.mapCenter,
            zoom: 13
        }
        
        this.map = new google.maps.Map(map, options);
        this.listenForMove(map);

        // this.props.locations.forEach(this.addLocation)
    }

    // addLocations(location) {
    //     const pos = new google.maps.LatLng(location.lat, location.lng);

    //     });

    // };

    listenForMove(map) {
        // debugger
        google.maps.event.addListener(map, 'click', function(event) {
            placeMarker(event.latLng);
        });
        
    }
    
    placeMarker(location) {
        // debugger
        let marker = new google.maps.Marker({
            position: location,
            map: map
        })
        marker.setMap(this.map);
    }

    render() {
        return (
            <div>
                {/* <span>MAP DEMO</span> */}
                <div id='map' ref='map' />
                <p>

                </p>
            </div>
        );
    };;
}

export default CreateRoute;