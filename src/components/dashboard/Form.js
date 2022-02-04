import './Dashboard.css';
import React, { useState } from 'react';

const Form = ({active, setActive}) => {

  const [username, setUsername] = useState('Johnd116');
  const [email, setEmail] = useState('johnedeo@mail.com');

  const close = () => {
    setActive(false);
	document.body.style.overflowY = "auto";
  }

  const handleSubmit = () => {
    // Submit Post logic to server
    setActive(false);
  }

  if(active) {
    return (
    <div className="email-container">
      <div onClick={close} className="close">
        <h1>X</h1>
      </div>
      <div id="emailForm">
        <h1>Your account</h1>
        <h3>Update your account settings</h3>
        <div id="form-submit">
         <p>User Name</p>
         <input className="input" type="text" value={username}  onChange={ e => setUsername(e.target.value)} />
         <p>Email</p>
         <input className="input" type="email" value={email}  onChange={e => setEmail(e.target.value)} />
         <br/>
         <button onClick={handleSubmit} id="submit-btn">Save</button>
        </div>
      </div>
    </div>
    );
  }
  return null;
}

export default Form;
