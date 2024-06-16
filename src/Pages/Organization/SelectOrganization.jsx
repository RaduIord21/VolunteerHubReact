import React, { useEffect, useRef, useState } from 'react';
import LoadingSpinner from '../../Components/LoadingSpinner';
import useAxios from "../../Hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useAuth} from "../../Hooks/AuthProvider";


function SelectOrganization() {

    const auth = useAuth();
    const [organizations, setOrganizations] = useState([]);
    const [roles, setRoles] = useState(null);
    const navigate = useNavigate();
    const loading = useRef(true);

    const handleSelect = (organization) => {
        auth.updateCompanyName(organization.organizationName);
        auth.updateOrganizationId(organization.organizationId);
        auth.updateRole(organization.isOwner ? 'coordinator' : 'volunteer');
        navigate('/dashboard');
    }
    const axiosInstance = useAxios();

    useEffect(() => {
        loading.current = true;
        axiosInstance.get('Organization/organizations')
            .then(response => {
                console.log(response.data);
                setOrganizations(response.data);
            }).catch(error => {
                console.log("Eroare fatala " + error)
            }).finally(() => {
                loading.current = false;
            })
        axiosInstance.get("/user").then(response =>{
            if (response.data.roles[0] === 'Admin') {
                auth.updateRole('admin');
            }
        });
    }, []);

    if (loading.current) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <h1>Organizatiile mele</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>Nume</th>
                        <th scope='col'>Coordonator ?</th>
                        <th scope='col'>Actiuni</th>
                    </tr>
                </thead>
                <tbody>
                    {organizations.map((item, index) => (
                        <tr key={index}>
                            <td>{item.organizationName}</td>
                            <td>
                                {(item.isOwner) &&
                                    <FontAwesomeIcon icon={"check"} />}
                            </td>
                            <td>
                                <button className='btn btn-sm btn-primary' onClick={() => {
                                    handleSelect(item)
                                }}>Selecteaza
                                </button>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default SelectOrganization;
