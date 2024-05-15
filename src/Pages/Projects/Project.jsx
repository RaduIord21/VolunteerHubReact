import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import LoadingSpinner from '../../Components/LoadingSpinner';
import api from '../../Hooks/api';

function Project() {
    let { id } = useParams();
    const [Project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        console.log(id, "Acii sunt");
        api.get('/projects/' + id + '/getProject')
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
            <Link to="/projects"><button className='btn btn-secondary'>Inapoi</button></Link><br/><br/>
            
            <Link to={'/changeProjectName/' + id}><button className='btn btn-primary'>Schimba numele</button></Link>
            <p>{Project.description}</p>
            <Link to={'/changeProjectDescription/' + id}><button className='btn btn-primary'>Schimba descrierea</button></Link>
            <p>Acest proiect tine pana la {Project.endDate}</p>
        </>
    )
}

export default Project
