import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Landing from './components/landing/Landing.js';

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


const Login = () => {
  return (
    <div>Login Page</div>
  );
}

export default App;
