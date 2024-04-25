import React, { useState } from 'react';
import {Navigate} from 'react-router-dom';
import axios from 'axios';


function PasswordMatchWarning() {
  return (
    <div className="warning-popup">
      <p>Passwords do not match!</p>
    </div>
  );
}

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('volunteer');
  const [showWarning, setShowWarning] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const organizationId = 1;

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Email:', email);
    if (password === confirmPassword) {
      console.log('Password:', password);
    }
    else {
      setShowWarning(true);
    }
    console.log('Role:', role);
    // Reset form fields
    setUsername('');
    setPassword('');
    setRole('volunteer');
    // You can add your login logic here, like sending a request to your backend
    const response =
    {
      "username": username,
      "email": email,
      "password": password,
      "organizationId": organizationId
    }

    axios.post('http://localhost:8000/api/register', response).then(response => {
      console.log(response);
      setRedirect(true);
    }).catch(error => {
      // Handle error
      console.error('Error sending data to backend:', error);
    });
  };

  if (redirect){
    return <Navigate to="/login"/>
  }

return (<>
  <h1>Register</h1>
  <form onSubmit={handleSubmit} className='w-25 m-3'>
    <div className='mb-3'>
      <label htmlFor="username" className='form-label'>Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={handleUsernameChange}
        className='form-control'
      />
    </div>
    <div className='mb-3'>
      <label htmlFor="email" className='form-label'>email:</label>
      <input
        type="text"
        id="email"
        value={email}
        onChange={handleEmailChange}
        className='form-control'
      />
    </div>
    <div className='mb-3'>
      <label htmlFor="password" className='from-label'>Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
        className='form-control'
      />
    </div>
    <div className='mb-3'>
      <label htmlFor="password" className='from-label'>Confirm Password:</label>
      <input
        type="password"
        id="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        className='form-control'
      />
    </div>   
    <button type="submit" className='btn btn-primary'>Register</button>
  </form>
  {showWarning && <PasswordMatchWarning />}
</>);
};

export default Register;
