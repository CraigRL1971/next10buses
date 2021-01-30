import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

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

    HTTPRequest(url) {

        const sendGetRequest = async (url) => {
            try {
                const resp = await axios.get(url);
                console.log(`response`);
                console.log(resp.data);
                let location = resp.data.plus_code.compound_code.replace(/[^\s]*\s/, "");
                this.setState({currentLocation: location});
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        };
        sendGetRequest(url);

    }

    returnURL() {
        //  Build URL string for Google geocode API by adding the lat and long.
        return 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.state.lat + ',' + this.state.long + '&key=AIzaSyAmZAyvgmpT9BYeXfugc85_IPwO8oxllto';
    }

    getLocation() {
        // Get current location (neighbourhood)
        if (this.state.lat !== 0.0 && this.state.long !== 0.0) {  
            const url = this.returnURL();
            this.HTTPRequest(url);
        }
    }

    success(pos) {
        this.setState({lat: pos.coords.latitude, long: pos.coords.longitude}, () => this.getLocation());
    }

    error(error) {
        console.error("Error Code = " + error.code + " - " + error.message);
    }

    componentDidMount() {
        // Get current position 
        navigator.geolocation.getCurrentPosition(this.success, this.error);
    }

    render() {
 
        return (
            <div>
                <h1>Home Page</h1>
                <p>This is the home page</p>
                <p>Current position is {this.state.lat} {this.state.long}</p>
                <p>Current location is {this.state.currentLocation}</p>
                <ul>
                    <li><Link to="/mapview">Map View</Link></li>
                    <li><Link to="/journeyview">Journey View</Link></li>
                </ul>
            </div>
        );
    }
}

export default Home