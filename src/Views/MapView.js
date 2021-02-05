import React from 'react';
import { Link, withRouter } from 'react-router-dom'

function MapView() {
    return (
        <div>
            <h1>Map View Page</h1>
            <p>This is the map view page</p>
            <ul>
                <li><Link to="/">Home</Link></li>
            </ul>
        </div>
    );
}

export default withRouter(MapView)