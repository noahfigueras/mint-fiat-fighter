import './Dashboard.css';
import logo from '../../img/logo.png';
import account from '../../img/account.png';
import inventory from '../../img/inventory.png';
import activity from '../../img/activity.png';
import settings from '../../img/settings.png';
import profile from '../../img/profile.png';
import logout from '../../img/logout.png';
import edit from '../../img/edit.png';
import qr from '../../img/qr.png';
import key from '../../img/key.png';
import nft from '../../img/nft-img.png';
import nftRound from '../../img/nft-round.png';
import nftSettings from '../../img/nft-settings.png';
import speed from '../../img/speed.png';
import coin from '../../img/coin.png';

import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react';

import Form from './Form.js';

const Dashboard = ({Provider}) => {
  
  // Hooks
  const [address, setAddress] = useState();
  const [eth, setEth] = useState();
  const [token, setToken] = useState();
	const [price, setPrice] = useState();
	const [nfts, setNfts] = useState();
	const [metadata, setMetadata] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
	const [activeForm, setActiveForm] = useState(false);

  // Wallet
  const provider = new ethers.providers.Web3Provider(Provider);
  const signer = provider.getSigner();
	
	// Token Contracts Info
	const tokenAbi = [
		"function name() view returns (string)",
		"function symbol() view returns (string)",
		"function balanceOf(address) view returns (uint)",
		"function transfer(address to, uint amount)",
		"event Transfer(address indexed from, address indexed to, uint amount)"
	]; 
	
	const tokenAddress = '0xcd7361ac3307D1C5a46b63086a90742Ff44c63B3'; // Mainnet
	const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);
	const tokenPriceUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=crypto-raiders&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false';

	// NFT Contract Info
	const nftAbi = [
		"function balanceOf(address) view returns (uint)",
		"function tokenURI(uint256) view returns (string memory)"
	];
	
	const nftAddress = '0xfD12ec7ea4B381a79C78FE8b2248b4c559011ffb';
	const nftContract = new ethers.Contract(nftAddress, nftAbi, provider);

  const getAddress = async () => {
    const addr = await signer.getAddress();
    setAddress(`${addr.slice(0,4)}...${addr.slice(38,42)}`);
  }

  const getEth = async () => {
    const eth = await signer.getBalance();
    const balance = ethers.utils.formatEther(eth);
    setEth(balance.slice(0,4));
  }
  
  const getToken = async () => {
    try{
      const addr = await signer.getAddress();
      const token = await tokenContract.balanceOf(addr);
      const balance = ethers.utils.formatEther(token);
      setToken(balance.slice(0,4));
			//Coingecko price
			const res = await fetch(tokenPriceUrl);
			const data = await res.json();
			setPrice(data["crypto-raiders"].usd);
    } catch(err) {
      console.log(err);   
    }
  }
	
	const getNfts = async () => {
    try{
      const addr = await signer.getAddress();
      const amount = await nftContract.balanceOf(addr);
      const uri = await nftContract.tokenURI(10);
			const res = await fetch(uri);
			const meta = await res.json();
			setMetadata(meta);
      setNfts(String(amount));
    } catch (err){
      console.log(err);
    }
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

	const emailSetup = () => {
		setActiveForm(true);
	}

  useEffect(() => {
		getNfts();
    getAddress();
		getToken();
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

		<Form active={activeForm} setActive={setActiveForm}/>

    <div className="grid">
      <div className="menu">
          <div className="cluse">
            <div className="cluse-edit">
              <p>CLUSE</p>
              <img src={edit} alt="edit-cluse"/>
            </div>
            <div className="cluse-btn">
              <img src={qr} alt="qr-code"/>
              <p>Show QR</p>
            </div>
          </div>
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
        <div className="logout">
          <img src={logout} alt="logout"/>
          <p>Logout</p>
        </div>
      </div>

			<div className="dashboard">
					<div className="email-setup">
						<h3>Let's complete setting up your account</h3>
						<div onClick={emailSetup} className="login-btn">
							<img src={key} alt="key"/>
							<p>Setup your email and password</p>
						</div>
					</div>
          <div className="fiat-fighterz"> 
            <div className="fiat-info">
              <div className="img-title">
                <img src={logo} alt="logo-2"/>
                <h3>Your FiatFighterz</h3>
              </div>
              <p>This is where you can rename your FiatFighterz, customize
                 their appearance, and change their loadouts.
              </p>
            </div>
            <div className="fiat-info">
              <div className="img-title">
                <img src={coin} alt="coin"/>
                <div className="balance">
                  <h3>Price: {price} $</h3>
                  <h3>Balance: {token}</h3>
                </div>
              </div>
              <div className="trade">
                <p>Trade</p>
              </div>
              <p>Lorem Ipsum dolor sit am consectetur adipiscing elit. Etiam
                 vehicul aliquiet facilisi euismod.
              </p>
            </div>
          </div>

					{metadata !== null &&
					<div className="blockchain-info">
						<div className="nft">
              <div className="nft-border">
                <img src={metadata.image} alt="nft-img"/>
              </div>
              <div className="nft-title">
                <img src={nftRound} alt="nft-img"/>
                <div className="level">
                  <p><b>Clause 33</b></p>
                  <p>Level 10</p>
                </div>
                <img src={nftSettings} alt="nft-settings"/>
              </div>
              <div id="nft-attributes">
                <div className="attribute">                
                  <img src={speed} alt="nft-speed"/>
                  <p id="nft-separator">Speed</p>
                  <p>3</p>
                </div>
                <div className="attribute">                
                  <img src={speed} alt="nft-speed"/>
                  <p id="nft-separator">Attack</p>
                  <p>3</p>
                </div>
                <div className="attribute">                
                  <img src={speed} alt="nft-speed"/>
                  <p id="nft-separator">Defense</p>
                  <p>17</p>
                </div>
                <div className="attribute">                
                  <img src={speed} alt="nft-speed"/>
                  <p id="nft-separator">Vigor</p>
                  <p>6</p>
                </div>
              </div>
						</div>
					</div>
					}
			</div>
    </div>

   </div>
  );
}

export default Dashboard;
