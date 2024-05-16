import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../Components/LoadingSpinner';
import api from "../../Hooks/api";
import { format } from 'date-fns';
import {useAuth} from "../../Hooks/AuthProvider";

function MyOrganization(props) {

  const [organization, setOrganization] = useState("");
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const auth = useAuth();

  const orgId = localStorage.getItem("organizationId");

  const handleKick = (email) =>{
    const data = {
      email : email
    }
    api.post('/kick', data
    ).then(response =>{
      console.log(response);
      setUsers(prevUsers => prevUsers.filter(user => user.email !== email));
    }).catch(error =>{
      console.error(error);
    })
  }
  useEffect(() => {
    api.get(`/organization/${orgId}/organization`)
      .then(response => {
      setOrganization(response.data);
      setLoading(false);
      if (response.data === null || response.data === undefined) {
        console.log("Nu e organizatie");
      }
    }).catch(error => {
      console.log("Eroare fatalaa " + error)
    })

    api.get(`/organization/${orgId}/organization-users`).then(
      response =>{
        console.log(response.data);
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
    api.post('/quitOrganization', response
    ).then(response => {
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

        <div className="card">
          <div className="card-body">
            <h4 className="card-title">{organization.name}</h4>
            <h6 className="card-subtitle mb-2 text-body-secondary">Cod  invitatie: {organization.code}</h6>
            <p className="card-text"><label>Adresa: </label> {organization.adress ? organization.adress : '-' }</p>
            <small>Creata: {format(new Date(organization.createdAt), 'dd.MM.yyyy')}</small>
          </div>
          <div className="card-footer">
            <button className='btn btn-danger' onClick={handleQuit}>Quit organization</button>
          </div>
        </div>

        <h2></h2>
        <table className='table'>
          <thead>
          <tr>
            <th scope='col'>Nume</th>
            <th scope='col'>Email</th>
            <th scope='col'>Rol</th>
            <th scope='col'>Actiuni</th>
          </tr>
          </thead>
          <tbody>
          {users.map((item, index) => (
              <tr key={index}>
                <td>{item.userName}</td>
                <td>{item.email}</td>
                <td>{item.roles[0]}</td>
                <td>
                  {(item.roles[0] === "Coordinator" && item.userName !== auth.user) &&
                      <button className='btn btn-danger' onClick={() => {
                        handleKick(item.email)
                      }}>Kick</button>}
                </td>
              </tr>
          ))
          }
          </tbody>
        </table>
      </>
  )
}

export default MyOrganization;
