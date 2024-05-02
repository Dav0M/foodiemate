import React from 'react';
import backgroundImage from '../images/main_background.jpeg'

const SplashPage = () => {
    return (
        <section className="hero is-fullheight-with-navbar" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            <div className="hero-body" style={{margin: 'auto'}}>
                <div className="container has-text-centered" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '10px', padding: '50px' }}>
                    <h1 className="title is-1">
                        FoodieMate
                    </h1>
                    <p className="subtitle">
                        Create and find your recipes here!
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SplashPage;
