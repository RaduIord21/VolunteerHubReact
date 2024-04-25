import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserCircle } from 'phosphor-react';

function Navbar(props) {
  const logout = () => {
    axios.post('http://localhost:8000/api/logout', null, {
      headers: {
        'Content-Type': 'application/json', // Specify the content type if needed
      },
      withCredentials: true
    })
      .then(response => {
        // Handle successful response
        console.log('Response:', response.data);
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
      });
    props.setName("");
  }
  let menu;
  if (props.username === "") {
    menu = (<>
      <li className="dropdown-item">
        <Link to="/login" className='nav-link'>Login</Link>
      </li>
      <li className="dropdown-item">
        <Link to="/register" className='nav-link'>Register</Link>
      </li></>

    )
  } else {
    menu = (<>

      <li className="dropdown-item">
        <Link to="/login" className='nav-link' onClick={logout}>Logout</Link>
      </li></>)
  }
  return (
    <nav className="navbar bg-secondary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">VolunteerHub</a>
        <h3>{props.username}</h3>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <UserCircle size={32} />  
                </Link>
                <ul className="dropdown-menu">
                  {menu}
                </ul>
              </li>
              <li className="nav-item"><Link to="/Stats" className='nav-link'>Stats</Link></li>
              <li className="nav-item"><Link to="/dashboard" className='nav-link'>Dashboard</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
