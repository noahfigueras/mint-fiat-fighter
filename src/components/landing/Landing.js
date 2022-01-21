import {Link} from "react-router-dom";

import twitter from '../../img/twitter.png';
import discord from '../../img/discord.png';

import Navbar from '../navbar/navbar.js';
import './Landing.css';

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

export default Landing;
