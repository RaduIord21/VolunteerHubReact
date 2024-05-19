import React, { useEffect, useState } from 'react'
import useAxios from "../../Hooks/useAxios";
import { useAuth } from '../../Hooks/AuthProvider';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const axiosInstance = useAxios();
    const [users, setUsers] = useState([]);
    const {login, updateUser, updateRole} = useAuth();
    const navigate = useNavigate();



    const handleImpersonation = (userName,id) =>{
            axiosInstance.get(`/imp?userId=${id}`).then(response =>{
                login(response.data.token);
                updateUser(userName);
                updateRole("anonymous");
                navigate("/dashboard");
            }).catch(error => {
                // Handle error
                console.log(error, "login error");
            });  
            
    }
    useEffect(() => {
        axiosInstance.get('/AllUsers').then(response => {
            setUsers(response.data);
            console.log(response.data); 
        });
    },[]);
    return (
        <>
            <h1>Select User to impersonate</h1>
            <div className="text-center">
            <table className="table table-bordered table-condensed table-striped table-hover sortable">
                <thead>
                    <tr>
                        <th scope='col'>Nume</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Actiuni</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.userName}</td>
                            <td>{user.email}</td>
                            <td><button className='btn btn-sm btn-outline-primary' onClick={(e) =>{e.preventDefault(); handleImpersonation(user.userName,user.id)}}>Impersoneaza</button></td>
                        </tr>
            ))}
                </tbody>
            </table>
            </div>
        </>
    )
}

export default Admin;
