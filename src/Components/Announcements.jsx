import React, { useEffect, useState } from 'react'
import useAxios from '../Hooks/useAxios';
import { useAuth } from '../Hooks/AuthProvider';

function Announcements() {
    const [announcements, setAnnouncements] = useState([]);
    const axiosInstance = useAxios();
    const auth = useAuth();
    
    useEffect(() => {
        axiosInstance.get(`/Announcements/12/announcements`).then(response => {
            setAnnouncements(response.data);
        });
    }, []);
    
    return (
        <>
        {announcements.length !== 0 ? announcements.map((key, index) =>{
            <div key={index} className="flex-grow-1 text-truncate ms-2">
                <h5 className="noti-item-title fw-semibold font-14">{key.title}</h5> 
                <small className="noti-item-subtitle text-muted">{key.content}</small>
            </div>
            })
        :<h5>No announcements yet</h5> 
        }

        </>
    )
}

export default Announcements;
