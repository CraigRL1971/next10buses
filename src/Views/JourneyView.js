import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import HTTPRequest from './../Components/HTTPRequest'


class JourneyView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: props.location.state.lat,
            long: props.location.state.long,   
            stops: [],
            stopDataPopulated: false,
            journeys: [] };
        this.getBusStops = this.getBusStops.bind(this);
        this.getBusJourneys = this.getBusJourneys.bind(this);
    }

    returnSortedJourneys() {

        //  Uses raw journey data stored in this.state to generate a list of the next ten bus journeys.
        let output = [];
        for (let i = 0; i < this.state.journeys.length; i++){  //  Iterate through each bus stop
            const depKeys = Object.keys(this.state.journeys[i].departures);
            for (let deps = 0; deps < depKeys.length; deps++) {  //  Iterate through each service stopping at current stop.
                const thisKey = depKeys[deps];
                for (let lines = 0; lines < this.state.journeys[i].departures[thisKey].length; lines++) {  // Iterate through departures for each service
                    let thisJourney = {};  //  Use this object to capture interesting data for each departure
                    thisJourney['stop_name'] = this.state.journeys[i].stop_name;
                    thisJourney['indicator'] = this.state.journeys[i].indicator;
                    thisJourney['line'] = this.state.journeys[i].departures[thisKey][lines].line;
                    thisJourney['operator'] = this.state.journeys[i].departures[thisKey][lines].operator_name;
                    thisJourney['direction'] = this.state.journeys[i].departures[thisKey][lines].direction;
                    thisJourney['aimed_time'] = this.state.journeys[i].departures[thisKey][lines].aimed_departure_time;
                    thisJourney['est_time'] = this.state.journeys[i].departures[thisKey][lines].best_departure_estimate;
                    output.push(thisJourney);
                }
            }
        }
        output.sort(function(a,b) {return a.est_time.localeCompare(b.est_time);});
        output = output.slice(0, 10);
        return output;
    }

    getBusJourneys() {

        //  Get the next three journeys for the closest four bus stops and store the data in this.state.
        let allLiveData = [];  // We will use this array to aggregate the departures for each stop.
        //  Get next three buses for each stop, consider first four stops only.
        let index = 0;
        while (index < 5) {
            const atcocode = this.state.stops.member[index].atcocode;  // Get the bus stop code.
            const liveDataUrl = 'https://transportapi.com/v3/uk/bus/stop/' + atcocode + '/live.json?app_id=57b508b1&app_key=e0f14057cb2bdd76f9889e64eb968936&group=route&limit=3&nextbuses=no';
            HTTPRequest(liveDataUrl).then((liveData) => {
                allLiveData.push(liveData);
                if (allLiveData.length === 5) { this.setState({journeys: allLiveData}) }
            })
            .catch((error) => console.error(error));
            index++;
        }
    }

    getBusStops() {
        //  Get list of nearby bus stops and store in this.state
        const url = 'https://transportapi.com/v3/uk/places.json?app_id=57b508b1&app_key=e0f14057cb2bdd76f9889e64eb968936&lat=' + this.state.lat + '&lon=' + this.state.long + '&type=bus_stop';
        HTTPRequest(url)
            .then((data) => {
                this.setState({stops: data},() => this.getBusJourneys());
            })      
            .catch((error) => console.error(error));
    }

    componentDidMount() {
        if (!this.state.stopDataPopulated && this.state.lat !== 0.0 && this.state.long !== 0.0) {
            this.getBusStops();
            this.setState({stopDataPopulated: true});
        }
    }

    render() {

        let listItems = [];
        let tableHeader = [];
        if (Object.keys(this.state.stops).length > 0 && Object.keys(this.state.journeys).length > 0) {
            const sortedJourneys = this.returnSortedJourneys();
            listItems = sortedJourneys.map((entry, index) =>
                <tr key={index}>
                    <td>{entry.stop_name}</td>
                    <td>{entry.indicator}</td>
                    <td>{entry.operator}</td>
                    <td>{entry.line}</td>
                    <td>{entry.est_time}</td>
                    <td>{entry.direction}</td>
                </tr>
            )
            let headerTitles = ['Stop Name', 'Indicator', 'Operator', 'Line', 'Estimated Time', 'Direction'];
            for (let i = 0; i < headerTitles.length; i++) {
                tableHeader.push(<th>{headerTitles[i]}</th>);
            }
        }

        return (
            <div id="home--page">
                <h1 className="home--title ">Journey View Page</h1>
                <p>Here are the next ten bus journeys from stops near you</p>
                <table id="bus-journeys">
                    <tbody>
                        {tableHeader}
                        {listItems}
                    </tbody>
                </table>
                <Link className="option--button" role="button" to="/">Home</Link>
            </div>
        );
    }
}

export default withRouter(JourneyView)