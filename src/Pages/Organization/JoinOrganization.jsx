import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAxios from '../../Hooks/useAxios';

function JoinOrganization() {

    const [code, setCode] = useState("");
    const [redirectCorrect, setRedirectCorrect] = useState(false);
    const [redirectFail, setRedirectFail] = useState(false);
    const axiosInstance = useAxios();

    const handleSubmit = (e) => {
        e.preventDefault();


        axiosInstance.post('/Organization/joinOrganization?code=' + code
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
            <form className='m-3' onSubmit={handleSubmit}>
                <label for="input1" className='form-label'>introduceti codul</label>
                <input type="text" id="input1" name="input1" className='form-control' value={code} onChange={handleCodeChange} />
                <input className='btn btn-primary mt-3' type="submit" value="Trimite" />
            </form>
        </>
    )
}

export default JoinOrganization;
