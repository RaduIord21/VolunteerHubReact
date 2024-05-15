import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import api from '../../Hooks/api';

function CreateOrganization(props) {

    const [name, setName] = useState("");
    const [adress, setAdress] = useState("");
    const [contact, setContact] = useState("");
    const [redirect, setRedirect]= useState(false);
    const [emptyForm, setEmptyform] = useState(false);
    //setRole(props.role);
    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleAdressChange = (e) => {
        setAdress(e.target.value);
    }

    const handleContactChange = (e) => {
        setContact(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date();
        const datetime = currentDate.toISOString();
        if (name === "" || adress ==="" || contact ===""){
            setEmptyform(true);
        }
        api.post('/Organization/createOrganization', {
            name: name,
            adress: adress,
            contact: contact,
            createdAt: datetime,
            updatedAt: datetime,
            Code : ""
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then(response => {
            console.log(response.data);
            if (response.data === "Succes"){
                setRedirect(true);
            }
        })
            .catch(error => {
                console.log("Eroare la crearea organizatiei : " + error);
            });


    }



    if ( redirect !== true){
    return (
        <>
            {redirect && <Navigate to="Organization"/>}
            <form className='w-25 m-3' onSubmit={handleSubmit}>

                <label for="input1" className='form-label'>Name your organization</label>
                <input type="text" id="input1" name="input1" className='form-control' value={name} onChange={handleNameChange} />

                <label for="input2" className='form-label'>Adress of your organization :</label>
                <input type="text" id="input2" name="input2" className='form-control' value={adress} onChange={handleAdressChange} />

                <label for="input3" className='form-label'>Contact info :</label>
                <input type="text" id="input3" name="input3" className='form-control' value={contact} onChange={handleContactChange} />

                <input className='btn btn-primary mt-3' type="submit" value="Submit !" />
            </form>
            {emptyForm && <span className='text-danger'>Please input something in the fields</span>}
        </>
    )}
    else
    {
        //return <Dashboard organizationExists={redirect} />
    }
}

export default CreateOrganization;
