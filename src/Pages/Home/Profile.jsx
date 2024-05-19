import React, { useEffect, useState } from 'react'
import useAxios from "../../Hooks/useAxios";
import { Link } from 'react-router-dom';

function Profile() {
    const axiosInstance = useAxios();
    const [profile, setProfile] = useState({
        user:"",
        email:""
    });

    useEffect(()=> {
        axiosInstance.get("/user").then(response =>{
            console.log(response.data);
            setProfile(response.data);
        });
    },[]);
    return (
        <>
            <h1>Profil</h1>
            <div class="card">
                <div className="card-header">
                    Info
                </div>
                <div className="card-body">
                    <h5 className="card-title">{profile.user}</h5>
                    <p className="card-text">{profile.email}</p>
                    <Link to="/change-password"><button className='btn btn-primary'>Change password</button></Link>
                </div>
            </div>
        </>
    )
}

export default Profile
