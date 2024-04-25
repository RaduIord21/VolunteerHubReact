import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import LoadingSpinner from '../../Components/LoadingSpinner';

function Project() {
    let { id } = useParams();
    const [Project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        axios.get('http://localhost:8000/api/getProject/' + id, {
            headers: {  
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .then(response => {
                // Handle successful response
                console.log(response.data);
                setProject(response.data);
                setLoading(false);

            })
            .catch(error => {
                // Handle error
                console.error('Eroare la getProject:', error);
            });
    },[id]);

    if (loading) {
        return <LoadingSpinner />;
      }
    
    return (
        <>  
            <h1>{Project.projectName}</h1>
            <Link to={'/changeProjectName/' + id}><button className='btn btn-primary'>Change Name</button></Link>
            <p>{Project.description}</p>
            <Link to={'/changeProjectDescription/' + id}><button className='btn btn-primary'>Change Description</button></Link>
            <p>Acest proiect tine pana la {Project.endDate}</p>
        </>
    )
}

export default Project
