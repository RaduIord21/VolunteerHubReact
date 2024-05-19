import React, { useState } from 'react'
import { useAuth } from '../../Hooks/AuthProvider';
import useAxios from '../../Hooks/useAxios';

function Invite() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const auth = useAuth();
    const axiosIntance = useAxios();
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        const data = {
            email: email
        }
        axiosIntance.post(`/Organization/${auth.organizationId}/invite`,data).then(response => {
            setSuccess(true);
        }).catch(err =>{
            setError(err.response.data);
        }
        );

    }
    return (
        <>
        <form className="m-3" onSubmit={handleSubmit}>
            <label className='m-3' htmlFor='Email'>Email-ul celui pe care doriti sa il invitati</label>
            <input
                className='form-control'
                id="Email"
                name="Email"
                value={email}
                onChange={handleEmailChange}
            />
            <input className='btn btn-primary mt-3' type="submit" value="Trimite !" />
            
        </form>
        {success && <span className='text-success'>Invitatia a fost trimisa cu succes !</span>}
        {error && <span className='text-danger'>{error}</span>}
        </>
    )
}

export default Invite;
