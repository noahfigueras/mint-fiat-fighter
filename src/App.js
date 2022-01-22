import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React, { useState } from 'react';

import Landing from './components/landing/Landing.js';
import Login from './components/login/Login.js';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="login" element={<Login setLoggedIn={setLoggedIn}/>}/>
        {loggedIn && (
          <Route path="dashboard" element={<Dashboard/>} />
        )}
      </Routes>
    </Router>
  );
}

const Dashboard = () => {
  return <div>Welcome to the Dashboard</div>;
}

export default App;
