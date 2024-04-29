import React from 'react';
import { Link } from 'react-router-dom';

function NavigationBar() {
    return (
        <nav className="navbar has-background-success-light" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/userhome">
                    <h1 className="title is-4">FoodieMate</h1>
                </Link>
            </div>
            <div className="navbar-menu">
                <div className="navbar-end">
                    <Link className="navbar-item" to="/recipehome">Recipes</Link>
                    <Link className="navbar-item" to="/plans">Plans</Link>
                    {/* This Log out is fake. Just for going back to Splash Page */}
                    <Link className='navbar-item' to= "/">Log In</Link>
                    <Link className="navbar-item" to="/">Log Out</Link>
                </div>
            </div>
        </nav>
    );
}

export default NavigationBar;
