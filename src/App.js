import {
  BrowserRouter as Router,
  Routes,
  Route,
	Navigate
} from "react-router-dom";
import React, { useState } from 'react';

import Landing from './components/landing/Landing.js';
import Login from './components/login/Login.js';
import Dashboard from './components/dashboard/Dashboard.jsx';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
	const [provider, setProvider] = useState();

  return (
    <Router>
      <Routes>
				<Route path={process.env.PUBLIC_URL} element={<Navigate replace to={process.env.PUBLIC_URL + "/login"} />} />
        <Route  path={process.env.PUBLIC_URL + "/login"} element={<Login setLoggedIn={setLoggedIn} setProvider={setProvider}/>}/>
        {loggedIn && (
          <Route path={process.env.PUBLIC_URL + "/dashboard"} element={<Dashboard Provider={provider}/>} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
