import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";


// import Navbar from './Components/Navbar';
// import NavbarCustom from './Components/NavbarCustom';
// import Home from './Pages/Home/Home';
// import Login from './Pages/Login/Login';
// import Register from './Pages/Register/Register';
// import Dashboard from './Pages/Home/Dashboard';
// import Tasks from './Pages/Tasks/Tasks';
// import Projects from './Pages/Projects/Projects';
// import CreateTask from './Pages/Tasks/CreateTask';
// import Organization from './Pages/Organization/Organization';
// import CreateOrganization from './Pages/Organization/CreateOrganization';
// import JoinOrganization from './Pages/Organization/JoinOrganization';
// import MyOrganization from './Pages/Organization/MyOrganization';
// import CreateProject from './Pages/Projects/CreateProject';
// import Project from './Pages/Projects/Project';
// import ChangeProjectDescription from './Pages/Projects/ChangeProjectDescription';
// import ChangeProjectName from './Pages/Projects/ChangeProjectName';
// import AsignTask from './Pages/Tasks/AsignTask';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {Routes} from "./Routes";

library.add(fas);

const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;

function checkAuthToken() {
  const token = localStorage.getItem('jwt'); // Obține tokenul JWT din localStorage

  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return false;
  }
}

if (typeof window !== 'undefined') { // Check if we're running in the browser.
  checkAuthToken();
}

function App() {
  const isUserAuthenticated = checkAuthToken();

  return (
      <Routes isAuthorized={isUserAuthenticated} />
   /* <div className="App">
      <Router>

        <NavbarCustom username={name} organization={organization} setName={setName}/>
        <Navbar username={name} setName={setName}/>
        <div className="content-page">
        <Routes>
          <Route path='/' Component={() => <Home />} />
          <Route path='/register' Component={() => <Register />} />
          <Route path='/login' Component={() =><Login setName={setName}/>} />
          <Route path='/projects' Component={() => <Projects />} />
          <Route path='/createProject' Component={() => <CreateProject />} />
          <Route path='/tasks/:id' Component={() => <Tasks />} />
          <Route path='/createTask/:id' Component={() => <CreateTask role={role}/>} />
          <Route path='/dashboard' Component={() => <Dashboard username={name} Organization={organization}/>} />
          <Route path='/organization' Component={() => <Organization />} />
          <Route path='/createOrganization' Component={() => <CreateOrganization role={role}/>} />
          <Route path='/joinOrganization' Component={() => <JoinOrganization />} />
          <Route path='/myOrganization' Component={() => <MyOrganization email={email}/>} />
          <Route path="/project/:id" Component={() => <Project />} />
          <Route path="/changeProjectDescription/:id" Component={() => <ChangeProjectDescription />} />
          <Route path="/changeProjectName/:id" Component={() => <ChangeProjectName />} />
          <Route path='/asignTask/:id' Component={() => <AsignTask />}/>
        </Routes>
        </div>
      </Router>
    </div>*/
  );
}

export default App;
