import './Dashboard.css';
import logo from '../../img/logo.png';
import profile from '../../img/profile.png';
import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react';

const Dashboard = ({Provider}) => {
  
  // Hooks
  const [address, setAddress] = useState();
  const [eth, setEth] = useState();

  // Get Wallet
  const provider = new ethers.providers.Web3Provider(Provider);
  const signer = provider.getSigner();

  const getAddress = async () => {
    const addr = await signer.getAddress();
    setAddress(addr);
  }

  const getEth = async () => {
    const eth = await signer.getBalance();
    setEth(String(eth));
  }

  useEffect(() => {
    getAddress();
    getEth();
  });

  return(
		<div className="navbar">
			<img src={logo} alt="logo" />
      <div className="account">
        <div classNamw="wallet">
          <p><span>{eth} ETH </span>{address}</p>
        </div>
        <div className="profile">
          <img src={profile} alt="profile"/>
          <p>My Account</p>
        </div>
      </div>
		</div>
  );
}

export default Dashboard;
