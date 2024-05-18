import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import useAxios from '../../Hooks/useAxios';

function JoinOrganization() {

    const [code, setCode] = useState("");
    const [redirectCorrect, setRedirectCorrect] = useState(false);
    const [redirectFail, setRedirectFail] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

       
        useAxios.post('/Organization/joinOrganization?code=' + code
        ).then(response => {
            console.log(response.data);
            if (response.data.organizationCode !== null || response.data.organizationCode !== undefined){
                setRedirectCorrect(true);
            }
        }).catch(error => {
            // Handle error
            console.error("Error");
        });
        
    }

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    }
    return (
        <>
            {redirectCorrect && (<Navigate to="/my-organization" />)}
            <form className='w-25 m-3' onSubmit={handleSubmit}>
                <label for="input1" className='form-label'>Input your code</label>
                <input type="text" id="input1" name="input1" className='form-control' value={code} onChange={handleCodeChange} />
                <input className='btn btn-primary mt-3' type="submit" value="Submit !" />
            </form>
        </>
    )
}

export default JoinOrganization;
