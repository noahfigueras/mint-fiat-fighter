import './Dashboard.css';
import logo from '../../img/logo.png';
import account from '../../img/account.png';
import inventory from '../../img/inventory.png';
import activity from '../../img/activity.png';
import settings from '../../img/settings.png';
import profile from '../../img/profile.png';
import infoCard from '../../img/info-card.png';

import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react';

const Dashboard = ({Provider}) => {
  
  // Hooks
  const [address, setAddress] = useState();
  const [eth, setEth] = useState();
  const [activeTab, setActiveTab] = useState(null);

  // Wallet
  const provider = new ethers.providers.Web3Provider(Provider);
	provider.listAccounts().then((arr) => { if(arr.length === 0){ connect() } });
  const signer = provider.getSigner();
	
	// METAMASK - request connection
	const connect = async () => {
		try{
			await provider.send('eth_requestAccounts', []);
		} catch(e) {
			console.log('Error connecting to metamask');
		}
	}

  const getAddress = async () => {
    const addr = await signer.getAddress();
    setAddress(`${addr.slice(0,4)}...${addr.slice(38,42)}`);
  }

  const getEth = async () => {
    const eth = await signer.getBalance();
    const balance = ethers.utils.formatEther(eth);
    setEth(balance.slice(0,4));
  }
  
  // Side-Menu
  const activeMenu = (e) => {
    const element = e.currentTarget;
    if(activeTab === null){
      element.parentElement.firstChild.classList.remove("selected");
    } else {
      activeTab.classList.remove("selected");
    }
    element.classList.add("selected");
    setActiveTab(element);
  }

  useEffect(() => {
    getAddress();
    getEth();
  }, []);

  return(
  <div className="container">

		<div className="navbar">
			<img src={logo} alt="logo" />
      <div className="account">
        <div className="wallet">
          <p><span>{eth} ETH </span> | {address}</p>
        </div>
        <div className="profile">
          <img src={profile} alt="profile"/>
          <p>My Account</p>
        </div>
      </div>
		</div>

    <div className="grid">
      <div className="menu">
        <ul>
          <li onClick={activeMenu} className="selected">
            <img src={account} alt="account"/>
            <p>Account</p>
          </li>
          <li onClick={activeMenu}>
            <img src={inventory} alt="inventory"/>
            <p>Inventory</p>
          </li>
          <li onClick={activeMenu}>
            <img src={activity} alt="activity"/>
            <p>Activity</p>
          </li>
          <li onClick={activeMenu}>
            <img src={settings} alt="settings"/>
            <p>Account Settings</p>
          </li>
        </ul>
      </div>

			<div className="dashboard">
					<div className="email-setup">
						<h3>Let's complete setting up your account</h3>
						<div className="login-btn">
							<img src={infoCard} alt="info-card"/>
							<p>Setup your email and password</p>
						</div>
					</div>
					<div className="blockchain-info">
						<h3>Wallets</h3>
						<div className="content">
							<div className="token">
								<h4> 0 FTF</h4>
								<div className="token-btn">
									<div className="deposit">
										<p>Deposit</p>
									</div>
									<div className="withdraw">
										<p>Withdraw</p>
									</div>
								</div>
							</div>
						</div>
					</div>
			</div>
    </div>

   </div>
  );
}

export default Dashboard;
