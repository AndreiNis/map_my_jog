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

    }

    componentDidMount() {
        const map = ReactDOM.findDOMNode(this.refs.map)
        this.map = new google.maps.Map(map, mapOptions);
        this.MarkerManager = new MarkerManager(this.map, this.handleMarkerClick.bind(this));
        this.registerListeners(map);
        
    };

    registerListeners(map) {
        google.maps.event.addListener(this.map, 'click', (event) => {
            const coords = getCoords(event.latLng);
            this.handleClick(coords);
        });
    }

    handleMarkerClick(route) {
        this.props.history.push(`routes/${route.id}`);
    }

    handleClick(coords) {
        let marker = new google.maps.Marker({
            position: coords,
            map: this.map,
            draggable: true,
            animation: google.maps.Animation.DROP
        });
        this.markers.push(marker);
        // debugger
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