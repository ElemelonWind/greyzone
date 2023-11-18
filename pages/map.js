import { Map, GoogleApiWrapper, Marker } from "google-maps-react"
import { useState } from 'react';

const mapStyles = {
    width: '75%',
    height: '100%'
};

const GoogleMap = () => {

    const [currentLocation, setCurrentLocation] = useState({});

    if (currentLocation.lat == null || currentLocation.lng == null) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            function(error) {
                console.error("Error Code = " + error.code + " - " + error.message);
            }
        );

        return (
            <div>
                <h1>Map</h1>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        //The <Map></Map> need the following props
        //initialCenter={} will be the center on the Map
        <Map
            google={window.google}
            zoom={17}
            style={mapStyles}
            initialCenter={
                {
                    lat: currentLocation.lat,
                    lng: currentLocation.lng
                }
            }
        >
           <Marker
              position={
                  {
                    lat: currentLocation.lat,
                    lng: currentLocation.lng
                  }
              }
           /> 
        </Map>
    )
}

export default GoogleApiWrapper({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
})(GoogleMap);