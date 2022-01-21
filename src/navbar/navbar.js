import './navbar.css';
import logo from './logo.png';

function Navbar() {
	return (
		<div className="navbar">
			<img src={logo} alt="logo" />
			<ul>
			   <li><a href="">Storyline</a></li>
				 <li><a href="">Roadmap</a></li>
			 	 <li><a href="">Team</a></li>
			</ul> 
		</div>
	);
}

export default Navbar;
