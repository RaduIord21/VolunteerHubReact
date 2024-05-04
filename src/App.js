import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import axios from 'axios';
import Dashboard from './Pages/Home/Dashboard';
import Tasks from './Pages/Tasks/Tasks';
import Projects from './Pages/Projects/Projects';
import CreateTask from './Pages/Tasks/CreateTask';
import Organization from './Pages/Organization/Organization';
import CreateOrganization from './Pages/Organization/CreateOrganization';
import JoinOrganization from './Pages/Organization/JoinOrganization';
import MyOrganization from './Pages/Organization/MyOrganization';
import CreateProject from './Pages/Projects/CreateProject';
import Project from './Pages/Projects/Project';
import ChangeProjectDescription from './Pages/Projects/ChangeProjectDescription';
import ChangeProjectName from './Pages/Projects/ChangeProjectName';
import AsignTask from './Pages/Tasks/AsignTask';


function App() {

  const [organization, setOrganization] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("Volunteer");
  const [email, setEmail] = useState("");
  useEffect(() => {
    axios.get("http://localhost:8000/api/user", {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }).then(response => {
      console.log(response.data);
      setName(response.data.user.userName);
      setOrganization(response.data.user.organization);
      setRole(response.data.roles);
      setEmail(response.data.currentEmail);
    }).catch(error => {
      // Handle error
      console.log('Error fetching data:', error);
    });
  })

  // Dashboard next 
  return (
    <div className="App">
      <Router>
        <Navbar username={name} setName={setName}/>
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
      </Router>
    </div>
  );
}
  
export default App;