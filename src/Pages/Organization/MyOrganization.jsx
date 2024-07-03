import React, {useEffect, useState} from 'react';
import LoadingSpinner from '../../Components/LoadingSpinner';
import useAxios from "../../Hooks/useAxios";
import {format} from 'date-fns';
import {useAuth} from "../../Hooks/AuthProvider";
import {useNavigate} from "react-router-dom";
import SelectNewCoordinatorPopup from "../../Components/SelectNewCoordinatorPopup";
import Invite from './Invite';
import { Link } from 'react-router-dom';

function MyOrganization(props) {

    const [organization, setOrganization] = useState("");
    const [user, setUser] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState("");
    const axiosInstance = useAxios();
    const auth = useAuth();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const orgId = auth.organizationId;
    const [showPopup, setShowPopup] = useState(false);

    const handleKick = (email) => {
        console.log(users);
        const data = {
            organizationId: orgId 
        }
        axiosInstance.post(`Organization/${email}/kick`, data
        ).then(response => {
            console.log(response);
            setUsers(prevUsers => prevUsers.filter(user => user.email !== email));
        }).catch(error => {
            console.error(error);
        })
    }
    useEffect(() => {
        axiosInstance.get(`/organization/${orgId}/organization`)
            .then(response => {
                setOrganization(response.data);
                setLoading(false);
                if (response.data === null || response.data === undefined) {
                    console.log("Nu e organizatie");
                }
            }).catch(error => {
            console.log("Eroare fatala " + error)
        })

        axiosInstance.get(`/organization/${orgId}/organization-users`).then(
            response => {
                console.log(response.data);
                setUsers(response.data);
            }
        )
    }, []);

    if (loading) {
        return <LoadingSpinner/>;
    }

    const handleQuit = () => {
        if (auth.role === 'coordinator') {
            setShowPopup(true)
        } else {
            sendQuit('');
        }

    }

    const handleClosePopup = () => {
        setShowPopup(false);
    }

    const sendQuit = (userName) => {
        const data = {
            user: userName
        }
        axiosInstance.post('/organization/' + auth.organizationId + '/quitOrganization', data
        ).then(response => {
            console.log('response quit', response);
            auth.updateRole('anonymous');
            navigate('/dashboard');
        }).catch(error => {
            // Handle error
            console.error('Error: no user ', error);
        });
    }


    return (
        <>
            <h1>Organizatia Mea</h1>
            <SelectNewCoordinatorPopup
                currentUser={auth.user}
                show={showPopup}
                users={users}
                handleClose={handleClosePopup}
                onUserSelect={sendQuit}/>

      <div className="card">
        <div className="card-body">
          <div className='row'>
            <div className='col-6'>
              <h4 className="card-title">{organization.name}</h4>
              <h6 className="card-subtitle mb-2 text-body-secondary">Cod  invitatie: {organization.code}</h6>
              <p className="card-text"><label>Adresa: </label> {organization.adress ? organization.adress : '-'}</p>
              <small>Creata: {format(new Date(organization.createdAt), 'dd.MM.yyyy')}</small>
            </div>
            <div className='col-6'>
              {auth.role === "coordinator" && <Invite />}
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button className='btn btn-danger mx-1' onClick={handleQuit}>Quit organization</button>
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
