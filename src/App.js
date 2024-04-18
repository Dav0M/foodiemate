import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bulma/css/bulma.min.css';

import SplashPage from './components/SplashPage';
import AboutRecipePage from './components/AboutRecipePage';
import CreateRecipePage from './components/CreateRecipePage';
import PlansPage from './components/PlansPage';
import RecipeHomePage from './components/RecipeHomePage';
import UserHomePage from './components/UserHomePage';
import NavigationBar from './components/NavigationBar';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <NavigationBar />
      <div>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/createrecipe" element={<CreateRecipePage />} />
          <Route path="/aboutrecipe" element={<AboutRecipePage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/recipehome" element={<RecipeHomePage />} />
          <Route path="/userhome" element={<UserHomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
