import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import './App.css';
import Button from './components/Button'
import Marker from './components/Marker'
import config from './config-keys';

function App() {
  const [showMarker, setShowMarker] = useState(false);
  const [coords, setCoordinates] = useState({lat:0, lng:0});
  const [mapApi, setMainMAp] = useState({map: {}, maps: {}});
  const [locationText, setLocationText] = useState({})

  useEffect(() => {
    const getCoordinates = async function(){
      let params = {
        method: 'POST'
      }
      
      let fetchLocation = async () => {
        await fetch("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBKrMM1vKp61SKl3-AAB0p2WZhN07JPwI8", params)
        .then(res => {
         res.json().then(data => {setCoordinates({lat: data.location.lat, lng: data.location.lng})})    
        })
        .catch(err => {
          console.log(err)
        })
      }
      fetchLocation()

    }
    getCoordinates()
  }, [coords])

  const findMe = () => {
    setShowMarker(true)
    mapApi.map.setCenter({lat: coords.lat, lng: coords.lng})
    mapApi.map.setZoom(10)

    getLocationAddress()
  }

  const getLocationAddress = async () => {
    await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=AIzaSyBKrMM1vKp61SKl3-AAB0p2WZhN07JPwI8`)
    .then(res => {
      res.json().then(data => {
        setLocationText({type: data.results[0].types[0], address: data.results[0].formatted_address})
        console.log(data)
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleApiLoaded = (map, maps) => {
    setMainMAp({map, maps})
  }

  return (
    <div className="App">
      <div className="map-container">
        <GoogleMapReact
            bootstrapURLKeys={{ key: config.key }}
            defaultCenter={[46.2276, 2.2137]}
            defaultZoom={7}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >

          {showMarker && <Marker locationText={locationText} lat={coords.lat+0.0012} lng={coords.lng}/>}
           
          </GoogleMapReact>
      </div>
      <Button find={findMe}/>
    </div>
  );
}

export default App;
