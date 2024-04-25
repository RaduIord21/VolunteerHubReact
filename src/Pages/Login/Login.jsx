import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [warningTrigger, setWarningTrigger] = useState(false);
  const navigate = useNavigate();
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/login",
      {
        userName: userName,
        password: password,
        rememberMe: false,
      }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }
    ).then(response => {
      console.log("s-a ajuns aici");
      console.log(response);
      console.log(response.data);
      props.setName(response.data.userName);
      navigate("/dashboard");
    })
      .catch(error => {
        // Handle error
        setWarningTrigger(true);
        console.error('Error:', error);
      });
  };
 
  return (<>
    <h1>Login</h1>
    <form className='w-25 m-3' onSubmit={handleSubmit}>
      <div className='mb-3'>
        <label htmlFor="email" className='form-label'>User name :</label>
        <input
          type="text"
          id="email"
          value={userName}
          onChange={handleUserNameChange}
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
      <button type="submit" className='btn btn-primary' >Login</button>
    </form>
    {warningTrigger && <span className='text-danger'>Failed login. Check your if the email or password are correct and try again !</span>}
  </>
  );
}
  ;

export default Login;