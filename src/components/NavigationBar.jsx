import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function NavigationBar() {
    const [user, setUser] = useState(null);
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isAppInstalled, setIsAppInstalled] = useState(false);

    const handleLogin = () => {
        window.location.href = '/.auth/login/aadb2c';
    };

    const handleLogout = () => {
        window.location.href = '/.auth/logout';
        setUser(null);
    };

    useEffect(() => {
        fetch('/.auth/me')
            .then(response => response.json())
            .then(data => {
                if (data.clientPrincipal) {
                    setUser(data.clientPrincipal);
                }
            })
            .catch(() => setUser(null));
    }, []);

    const handleBeforeInstallPrompt = (e) => {
        e.preventDefault();
        console.log("beforeinstallprompt event has fired");
        setDeferredPrompt(e);
    };

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // App installed event listener
        const handleAppInstalled = (event) => {
            console.log('PWA was installed', event);
            setIsAppInstalled(true);
            setDeferredPrompt(null);
        };

        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            // Correctly remove the event listeners by passing the exact same function reference
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        } else {
            console.log('User dismissed the A2HS prompt');
        }
        setDeferredPrompt(null);
    };

    useEffect(() => {
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsAppInstalled(true);
        }
    }, []);

    return (
        <nav className="navbar has-background-success-light" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/userhome">
                    <h1 className="title is-4">FoodieMate</h1>
                </Link>
            </div>
            <div className="navbar-menu">
                <div className="navbar-end">
                    {user && (
                        <>
                            <Link className="navbar-item" to="/recipehome">Recipes</Link>
                            <Link className="navbar-item" to="/plans">Plans</Link>
                            <Link className="navbar-item" to="/nutrition">Nutritions</Link>
                        </>
                    )}
                    <div className="navbar-item has-dropdown is-hoverable">
                        <Link className="navbar-link">My Account</Link>
                        <div className="navbar-dropdown">
                            <div className="navbar-item">
                                {user ? (
                                    <button className="navbar-item" onClick={handleLogout}>Log Out</button>
                                ) : (
                                    <button className="navbar-item" onClick={handleLogin}>Log In</button>
                                )}
                            </div>
                            {!isAppInstalled &&
                                <button className="navbar-item" onClick={handleInstallClick}>Add to Home</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavigationBar;