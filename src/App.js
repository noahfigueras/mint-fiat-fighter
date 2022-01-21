import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Landing from './components/landing/Landing.js';
import Login from './components/login/Login.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="login" element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
