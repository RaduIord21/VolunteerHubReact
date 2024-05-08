import React, { useState } from 'react';
import {Navigate} from 'react-router-dom';
import axios from 'axios';
import background from "../../Assets/bg-13.png";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";


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
  <Header />
  <div>
    <section className="banner-section" style={{backgroundImage: `url(${background})`}}>
      <div className="d-flex justify-content-center align-items-center card-enclosure">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-center mb-4">Inregistrare</h5>
            <form onSubmit={handleSubmit} className='px-3'>
              <div className='mb-3 row'>
                <label htmlFor="username" className='col-sm-5 col-form-label text-nowrap'>Username</label>
                <div className="col-sm-7">
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    className='form-control'
                />
                </div>
              </div>
              <div className='mb-3 row'>
                <label htmlFor="email" className='col-sm-5 col-form-label text-nowrap'>Email</label>
                <div className="col-sm-7">
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className='form-control'
                />
                </div>
              </div>
              <div className='mb-3 row'>
                <label htmlFor="password" className='col-sm-5 col-form-label text-nowrap'>Password</label>
                <div className="col-sm-7">
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className='form-control'
                />
                </div>
              </div>
              <div className='mb-3 row'>
                <label htmlFor="password" className='col-sm-5 col-form-label text-nowrap'>Confirm Password</label>
                <div className="col-sm-7">
                <input
                    type="password"
                    id="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className='form-control'
                />
                </div>
              </div>
              <div className='text-center'>
                <button type="submit" className='btn btn-primary'>Register</button>
              </div>
            </form>
            {showWarning && <PasswordMatchWarning/>}
          </div>
        </div>
      </div>
    </section>

  </div>

  <Footer/>
</>);
};

export default Register;
