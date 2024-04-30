import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bulma/css/bulma.min.css';
// import { MsalProvider, useMsal } from '@azure/msal-react';
// import { msalInstance } from './authConfig';

import SplashPage from './components/SplashPage';
import AboutRecipePage from './components/AboutRecipePage';
import CreateRecipePage from './components/CreateRecipePage';
import PlansPage from './components/PlansPage';
import RecipeHomePage from './components/RecipeHomePage';
import UserHomePage from './components/UserHomePage';
import NavigationBar from './components/NavigationBar';
import NotFound from './components/NotFound';

// function ProtectedRoute({ component: Component }) {
//   const { accounts } = useMsal();
//   const isAuthenticated = accounts.length > 0;

//   return isAuthenticated ? <Component /> : <Navigate to="/" />;
// }

function App() {
  return (
    // <MsalProvider instance={msalInstance}>
    <Router>
      <NavigationBar />
      <div>
        {/* <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/createrecipe" element={<ProtectedRoute><CreateRecipePage /></ProtectedRoute>} />
          <Route path="/aboutrecipe" element={<ProtectedRoute><AboutRecipePage /></ProtectedRoute>} />
          <Route path="/plans" element={<ProtectedRoute><PlansPage /></ProtectedRoute>} />
          <Route path="/recipehome" element={<ProtectedRoute><RecipeHomePage /></ProtectedRoute>} />
          <Route path="/userhome" element={<ProtectedRoute><UserHomePage /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes> */}
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
    // </MsalProvider>
  );
}

export default App;
