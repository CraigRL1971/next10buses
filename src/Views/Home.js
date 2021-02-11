import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import HTTPRequest from './../Components/HTTPRequest'
import '../css/App.css'

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {lat: 0.0,
                      long: 0.0,
                      currentLocation: '',
                      distance: 1};
        this.success = this.success.bind(this);
        this.error = this.error.bind(this);
        this.getLocation = this.getLocation.bind(this);
    }

    returnURL() {
        //  Build URL string for Google geocode API by adding the lat and long.
        return 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.state.lat + ',' + this.state.long + '&key=AIzaSyAmZAyvgmpT9BYeXfugc85_IPwO8oxllto';
    }

    getLocation() {
        // Get current location (neighbourhood)
        if (this.state.lat !== 0.0 && this.state.long !== 0.0) {  
            const url = this.returnURL();
            HTTPRequest(url).then((data) => { this.setState({currentLocation: data.plus_code.compound_code.replace(/[^\s]*\s/, "")}) });
        }
    }

    success(pos) {
        this.setState({lat: pos.coords.latitude, long: pos.coords.longitude}, () => this.getLocation());
    }

    error(error) {
        console.error("Error Code = " + error.code + " - " + error.message);
    }

    componentDidMount() {
        // Get current position (Lat/Long)
        navigator.geolocation.getCurrentPosition(this.success, this.error, { enableHighAccuracy: true, maximumAge: 0, timeout : 10000 });
    }

    render() {
 
        let displayLat = parseFloat(this.state.lat).toFixed( 2 );
        let displayLong = parseFloat(this.state.long).toFixed( 2 );

        return (
            <div id="home--page">
                <h1 className="home--title">Next 10 Buses</h1>
                <p>See the next ten bus services leaving from the nearest four bus stops to your current location</p>
                <p>Click on List View to see a list of services.  Click on Map View to see the services overlayed on a map.</p>
                <p>Current position is {displayLat}, {displayLong}</p>
                <p>Current location is {this.state.currentLocation}</p>
                <Link className="option--button" role="button" to={{pathname: "/mapview", state: {lat: this.state.lat, long: this.state.long}}}>Map View</Link>
                <Link className="option--button" role="button" to={{pathname: "/journeyview", state: {lat: this.state.lat, long: this.state.long}}}>Journey View</Link>
            </div>
        );
    }
}

export default withRouter(Home)