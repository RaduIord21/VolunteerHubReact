import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../Components/LoadingSpinner';
import api from "../../Hooks/api";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SelectOrganization(props) {

    const [organizations, setOrganizations] = useState([]);
    const [roles, setRoles] = useState(null);
    const navigate = useNavigate();
    const loading = useRef(true);
    const currentOrganization = localStorage.getItem("organizationId");
    localStorage.setItem('roles',"Volunteer");
    const handleSelect = (organizationId) => {
        localStorage.setItem('organizationId', organizationId);
        localStorage.setItem('roles',roles)
        navigate('/dashboard');
    }
    useEffect(() => {
        loading.current = true;
        api.get('Organization/organizations')
            .then(response => {
                console.log(response.data);
                setOrganizations(response.data);
            }).catch(error => {
                console.log("Eroare fatala " + error)
            }).finally(() => {
                loading.current = false;
            })
        api.get("/user").then(response =>{
            setRoles(response.data.roles);
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
                        <th scope='col'>Primara ?</th>
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
                            <td>{item.isOwner && <FontAwesomeIcon icon={"check"} />}</td>
                            <td>
                                <button className='btn btn-sm btn-primary' onClick={() => {
                                    handleSelect(item.organizationId)
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
