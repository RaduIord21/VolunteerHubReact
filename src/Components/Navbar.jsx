import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

  
  return (
    <div className="leftside-menu">

    <a href="index.html" className="logo logo-dark">
        <span className="logo-lg">
            <img src="assets/logo-voluntariat.png" alt="Voluntariat"/>
        </span>
        <span className="logo-sm">
            <img src="assets/images/logo-dark-sm.png" alt="Voluntariat"/>
        </span>
    </a>

    <div className="button-sm-hover" data-bs-toggle="tooltip" data-bs-placement="right" title="Show Full Sidebar">
        <i className="ri-checkbox-blank-circle-line align-middle"></i>
    </div>

    <div className="button-close-fullsidebar">
        <i className="ri-close-fill align-middle"></i>
    </div>

    <div className="h-100" id="leftside-menu-container" data-simplebar="">

        <ul className="side-nav">

            <li className="side-nav-title">Menu</li>

            <li className="side-nav-item">
                <Link to="/dashboard" className='side-nav-link'><FontAwesomeIcon icon="fa-solid fa-house" /> <span>Dashboard</span></Link>
            </li>
            
            <li className="side-nav-item">
                <Link to="/createOrganization" className='side-nav-link'><FontAwesomeIcon icon="fa-solid fa-heart-circle-plus" /> <span>New Organization</span></Link>
            </li>

            <li className="side-nav-title">Utils</li>

            <li className="side-nav-item">
              <Link to="/Stats" className='side-nav-link'><FontAwesomeIcon icon="fa-solid fa-chart-simple" /> <span>Stats</span></Link>
            </li>

            <li className="side-nav-item">
                { props.username ? (
                <Link to="/login" className='side-nav-link' onClick={logout}><FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /> <span>Logout</span></Link>
                ) :  (<>
                <Link to="/login" className='side-nav-link'><FontAwesomeIcon icon="fa-solid fa-right-to-bracket" /> <span>Login</span></Link>
                <Link to="/register" className='side-nav-link'><FontAwesomeIcon icon="fa-solid fa-signature" /> <span>Register</span></Link>
                </>
                )}
            </li>

        </ul>

        <div className="clearfix"></div>
    </div>
</div>
  )
}

export default Navbar
