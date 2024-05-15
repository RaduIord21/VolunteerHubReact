import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../Components/LoadingSpinner';
import api from "../../Hooks/api";

function MyOrganization(props) {

  const [code, setCode] = useState("");
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  ;

  const orgId = localStorage.getItem("organizationId");

  const handleKick = (email) =>{
    const data = {
      email : email
    }
    axios.post('http://localhost:8000/api/kick', data, {
      headers: {
        'Content-Type': 'application/json', // Specify the content type if needed
      },
      withCredentials: true
    }).then(response =>{
      console.log(response);
      setUsers(prevUsers => prevUsers.filter(user => user.email !== email));
    }).catch(error =>{
      console.error(error);
    })
  }
  useEffect(() => {
    api.get(`/organization/${orgId}/organization`)
      .then(response => {
      console.log(response.data);
      setCode(response.data.code);
      setRole(response.data.currentRole);
      setEmail(response.data.currentEmail);
      setLoading(false);
      if (response.data === null || response.data === undefined) {
        console.log("Nu e organizatie");
      }
    }).catch(error => {
      console.log("Eroare fatalaa " + error)
    })

    api.get(`/organization/${orgId}/organization-users`).then(
      response =>{
        setUsers(response.data);
      }
    )
  }, []);




  if (loading) {
    return <LoadingSpinner />;
  }

  const handleQuit = () => {
    const response = {
      user: user
    }
    axios.post('http://localhost:8000/api/quitOrganization', response, {
      headers: {
        'Content-Type': 'application/json', // Specify the content type if needed
      },
      withCredentials: true
    })
      .then(response => {
        // Handle successful response
        console.log(user);
        console.log('Response for success:', response);
        if (response.data.currentUser === null || response.data.currentUser === undefined) {
        }
      })
      .catch(error => {
        // Handle error
        console.error('Error: no user ', error);
      });
  }


  return (
    <>
      <h1>Organizatia Mea</h1>
      <h2><button className='btn btn-danger' onClick={handleQuit}>Quit organization</button></h2>
      <Link to="/dashboard"><button className='btn btn-secondary'>Back</button></ Link>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'><span className='border border-2 rounded p-2'>Code : {code}</span></th>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={index}>
              <td>
                
                {(role === "Coordinator" && item.email !== email) && <button className='btn btn-danger' onClick={() => {handleKick(item.email)}}>Kick</button>}
              </td>
              <td>{item.userName}</td>
              <td>{item.email}</td>
              <td>{item.roles[0]}</td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </>
  )
}

export default MyOrganization;
