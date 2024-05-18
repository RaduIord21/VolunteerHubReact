import React, { useState } from 'react'
import api from '../../Hooks/api';
import { Navigate } from 'react-router-dom';

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [err, setErr] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleOldPasswordChange = (e) =>{
        setOldPassword(e.target.value)
    }

    const handleNewPasswordChange = (e) =>{
        setNewPassword(e.target.value)
    }

    const handleConfirmPasswordChange = (e) =>{
        setConfirmPassword(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const data = {
            newPassword: newPassword,
            oldPassword: oldPassword,
            confirmPassword: confirmPassword
          }
          api.post("/changepassword",data).then(response =>{
            setRedirect(true);
          }).catch(error => {
            setErr(error.response.data);
          });
    }
    return (
        <>
            {redirect && <Navigate to="/profile"/>}
            <h1>Schimba parola</h1>
            <form className='w-25 m-3' onSubmit={handleSubmit}>
                <label className='form-label'>Parola veche</label>
                <input
                    type='password'
                    className='form-control'
                    name="Parola veche"
                    value={oldPassword}
                    onChange={handleOldPasswordChange}
                />
                <label className='form-label'>Parola noua</label>
                <input
                    type='password'
                    className='form-control'
                    name="Parola noua"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                />
                <label className='form-label'>Confirma parola</label>
                <input
                    type='password'
                    className='form-control'
                    name="Confirma parola"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
                <button className='btn btn-primary mt-3' type="submit">Submit</button>
            </form>
            <span className='text-danger'>{err}</span>
        </>
    )
}

export default ChangePassword
