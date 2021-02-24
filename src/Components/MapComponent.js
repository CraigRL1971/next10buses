import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

// MapComponent lifted from https://www.digitalocean.com/community/tutorials/how-to-integrate-the-google-maps-api-into-react-applications

const mapStyles = {
  width: '80%',
  height: '80%',
  margin: '0 10%',
  borderStyle: 'solid',
  borderWidth: '2px',
  borderColor: '#030bfc',
};

export class MapComponent extends Component {
  render() {
    const latLong = {lat: this.props.value.lat, lng: this.props.value.lng};
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={latLong}
      >
        <Marker position={latLong}></Marker>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAmZAyvgmpT9BYeXfugc85_IPwO8oxllto'
})(MapComponent);