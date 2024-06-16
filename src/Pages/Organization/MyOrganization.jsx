import React, {useEffect, useState} from 'react';
import LoadingSpinner from '../../Components/LoadingSpinner';
import useAxios from "../../Hooks/useAxios";
import {format} from 'date-fns';
import {useAuth} from "../../Hooks/AuthProvider";
import {useNavigate} from "react-router-dom";
import SelectNewCoordinatorPopup from "../../Components/SelectNewCoordinatorPopup";
import Invite from './Invite';
import ConfirmDeletePopup from "../../Components/ConfirmDeletePopup";

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
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const handleKick = (userName) => {
        const data = {
            organizationId: orgId
        }
        axiosInstance.post(`/Organization/${userName}/kick`, data
        ).then(response => {
            console.log(response);
            setUsers(prevUsers => prevUsers.filter(user => user.userName !== userName));
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
            setShowPopup(true); //select new coordinator first!
        } else {
            sendQuit('');
        }
    }

    const isCoordinator = () => {
        return auth.role === 'coordinator';
    }

    const handleDelete = () => {
        if (auth.role === 'coordinator') {
            setShowDeletePopup(true)
        }
    }

    const handleClosePopup = () => {
        setShowPopup(false);
    }

    const handleCloseDeletePopup = () => {
        setShowDeletePopup(false);
    }

    const sendQuit = (userName) => {
        const data = {
            newCoordinatorId: userName
        }
        axiosInstance.post('/organization/' + auth.organizationId + '/quitOrganization', data
        ).then(response => {
            console.log('response quit', response);
            auth.updateRole('anonymous');
            navigate('/select-organization');
        }).catch(error => {
            // Handle error
            console.error('Error: no user ', error);
        });
    }

    const sendDelete = () => {
        axiosInstance.post('/organization/' + auth.organizationId + '/deleteOrganization'
        ).then(response => {
            console.log('response delete', response);
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
            <ConfirmDeletePopup
                show={showDeletePopup}
                title="Atentie"
                instructions="<br />Organizatia si toate datele care au legatura cu ea se va sterge. <br /> <br /> Confirmati ?"
                handleClose={handleCloseDeletePopup}
                handleOk={sendDelete} />

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
          <button className='btn btn-danger mx-1' onClick={handleQuit}>Paraseste organizatia</button>
            {isCoordinator && <button className='btn btn-outline-danger mx-1' onClick={handleDelete}>Sterge organizatia</button>}
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
                            {(auth.role === "coordinator" && item.roles[0] === "Coordinator" && item.userName !== auth.user) &&
                                <button className='btn btn-danger' onClick={() => {
                                    handleKick(item.userName)
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
