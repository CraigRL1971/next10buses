import React from 'react';
import { Link } from 'react-router-dom'

function JourneyView() {
    return (
        <div>
            <h1>Journey View Page</h1>
            <p>This is the journey view page</p>
            <ul>
                <li><Link to="/">Home</Link></li>
            </ul>
        </div>
    );
}

export default JourneyView