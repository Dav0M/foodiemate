import React from 'react';
import { Link } from 'react-router-dom';

function NavigationBar() {
    return (
        <nav>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ display: 'inline', marginRight: 10 }}>
                    <Link to="/">Home</Link>
                </li>
                <li style={{ display: 'inline', marginRight: 10 }}>
                    <Link to="/aboutrecipe">About Recipes</Link>
                </li>
                <li style={{ display: 'inline', marginRight: 10 }}>
                    <Link to="/createrecipe">Create Recipe</Link>
                </li>
                <li style={{ display: 'inline', marginRight: 10 }}>
                    <Link to="/plans">Plans</Link>
                </li>
                <li style={{ display: 'inline', marginRight: 10 }}>
                    <Link to="/recipehome">Recipe Home</Link>
                </li>
                <li style={{ display: 'inline', marginRight: 10 }}>
                    <Link to="/userhome">User Home</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavigationBar;
