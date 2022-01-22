import {useNavigate} from 'react-router-dom';
import './Login.css';
import logo from '../../img/logo2.png';
import logoMetamask from '../../img/logo-metamask.png';
import QR from '../../img/QR.png';
import email from '../../img/email.png';
import lightbolt from '../../img/lightbolt.png';
import info from '../../img/info.png';
import WalletConnectProvider from "@walletconnect/web3-provider";

const Login = ({setLoggedIn, setProvider}) => {
	let navigate = useNavigate();

	function redirect(provider) {
		setProvider(provider);
		setLoggedIn(true);
		navigate("/dashboard");
	}

	async function walletConnect() {
		const provider = new WalletConnectProvider({
			infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
		});
		try{
			await provider.enable();
			redirect(provider);
		} catch(err) {
			console.log(err);
		}
	}

	function metamask() {
		if(window.ethereum) {
			const provider = window.ethereum;	
			redirect(provider);
		} else {
			alert("Please Download metamask");
		}
	}

  return (
    <div className="landing-page">
      <div className="image">
        <div className="bg_img"></div>
      </div>
      <div className="login">
        <img alt='logo' src={logo}/>
        <div className="buttons">
          <div onClick={metamask} className="metamask">
            <img alt='metamask' src={logoMetamask}/> 
            <p>Login with Metamask</p>
          </div>
          <div onClick={walletConnect} className="other-wallet">
            <img alt='walletConnect' src={QR}/> 
            <p>Login with QR Code</p>
          </div>
          <div className="other-wallet">
            <img alt='email' src={email}/> 
            <p>Login with Email & Password</p>
          </div>
          <div className="info">
            <div className="terms">
              <img alt="info" src={info}/>
              <p>
                By counting, you agree to our <a>Terms of Use</a>
              </p>
            </div>
            <hr/>
            <div className="terms">
              <p>
                Don't know where to start 
                <img alt="info" src={lightbolt}/>
                <a>Getting Started</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
