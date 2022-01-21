import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import twitter from './twitter.png';
import discord from './discord.png';

import Navbar from './navbar/navbar.js';

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

const Landing = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar/>
      </header>
      <body className="App-body">
        <div className="bg-nft">
          <div className="mint">
            <p>Mint FiatFighter</p>
            <p>0/0</p>
            <Link to="login" className="connect">Connect</Link>
            <div className="social">
             <a className="social-link" href="https://twitter.com" target="_blank">
              <img alt="twitter" src={twitter}/>
             </a> 
             <a className="social-link" href="https://discord.com" target="_blank">
              <img alt="discord" src={discord}/>
             </a> 
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

const Login = () => {
  return (
    <div>Login Page</div>
  );
}
export default App;
