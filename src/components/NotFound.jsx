import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = ({ user }) => {
    const navigate = useNavigate();

    const goToHome = () => {
        // for future use
        // if (user) {
        //     navigate('/userhome');
        // } else {
        //     navigate('/');
        // }

        navigate('/userhome');
    };

    return (
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-half has-text-centered">
                    <h1 className="title">404 - Not Found</h1>
                    <p className="subtitle">Oops, the page you are looking for does not exist</p>
                    <button className="button is-primary" onClick={goToHome}>Go back to Home</button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
