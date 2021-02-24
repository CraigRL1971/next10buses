import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import MapComponent from './../Components/MapComponent'
import '../css/App.css'

class MapView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: props.location.state.lat,
            long: props.location.state.long
        };
    }

    render() {

         return (
            <div id="map--page">
                <h1 className="map--title">Map View Page</h1>
                <p>This is the map view page</p>
                <div className="map--container">
                    <MapComponent
                        value={{ lat: this.state.lat, lng: this.state.long}}
                    />
                </div>
                <Link className="map--option--button option--button" role="button" to="/">Home</Link>
            </div>
        );
    }
}

export default withRouter(MapView)