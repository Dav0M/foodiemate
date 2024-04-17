import React from 'react';
import { Link } from 'react-router-dom';

function NavigationBar() {
    return (
        <nav>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ display: 'inline', marginRight: 10 }}>
                    <Link to="/userhome">Home</Link>
                </li>
                <li style={{ display: 'inline', marginRight: 10 }}>
                    <Link to="/recipehome">Recipe</Link>
                </li>
                <li style={{ display: 'inline', marginRight: 10 }}>
                    <Link to="/plans">Plans</Link>
                </li>
                {/* This Log out is fake. Just for going back to Splash Page */}
                <li style={{ display: 'inline', marginRight: 10 }}>
                    <Link to="/">Log Out</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavigationBar;
