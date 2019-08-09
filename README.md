# Map My Jog - Map My Run clone

Map My Jog is a route planning application aimed at creating, sharing and viewing jogging routes between users. 
Inspired by Map My Run which is an application made by the Under Armour clothing brand. Map My Jog implements Google Maps V3 and Google Directions Service api's for planning multiple waypoints together with google maps directions(streets, park roads, etc.). Backed by Rails and postgresSQL, Map My Job operates with React.js and Redux libraries for the front end. Due to a 10 day time constraint window for, many features and functionality are missing.

## Features

* Standard User Authentification by use of session tokens and BCrypt encryption
* Ability to add multiple markers to google maps api
* Mapping directions from one waypoints to another using traversable and legal routes
* User can save map and each map has its own show page

## Route Creation

Using Google Maps Api and Directions Service, users are able to create a route by placing multiple waypoints on the map. Due to Directions Service only taking a start and end destination, a loop was necessarry in order to switch through each waypoints, assiging the end destination as the new start. 

```javascrip
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
                response.routes[0].legs.forEach((leg) => distanceInMeters +=    leg.distance.value);

                this.setState({ distance: (distanceInMeters / 1609.344).toFixed(2) });
            }
        });
    }
```

Location waypoints are encoded in a single string and saved to the database.

```javascrip
    encodeMarkers() { 
        let markerString = '';
        this.markers.forEach(marker => {
            let latitude = marker.getPosition().lat();
            let longitude = marker.getPosition().lng();
            markerString += `${latitude},${longitude},`;
        });

        return markerString.slice(0, -1);
    }
```

When showing a route decoding is required.

```javascrip
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
```

Working Example of Show Page

<a href="https://ibb.co/rs2cxYh"><img src="https://i.ibb.co/wshwSVq/Screen-Shot-2019-08-09-at-10-12-35-AM.png" alt="Screen-Shot-2019-08-09-at-10-12-35-AM" border="0"></a>

## Future Implementations
* Users have list of created routes
* Users can view and save other users routes
* Routes can be commented and rated
* More functionality for both maps and routes(edit, delete, undo marker, etc.)
* Implementation of Google Geolocation for address searches.
* Users can friend other users, as well as send and receive messages
* Users have a profile page
* Users have a dashboard which keeps track of statistics(routes ran, time, etc.)



