import './App.css';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

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
import {AuthProvider} from "./Hooks/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

library.add(fas);

function App() {

  return (
      <AuthProvider>
        <Routes />
      </AuthProvider>
   
  );
}

export default App;
