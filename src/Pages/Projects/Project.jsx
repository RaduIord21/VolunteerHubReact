import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../../Components/LoadingSpinner';
import {format} from "date-fns";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useAxios from "../../Hooks/useAxios";

function Project() {
    let { id } = useParams();
    const [Project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [projectStats, setProjectStats] = useState(null);
    const axiosInstance = useAxios();

    useEffect(() => {
        console.log(id, "Acii sunt");
        axiosInstance.get('/projects/' + id + '/getProject')
            .then(response => {
                // Handle successful response
                console.log(response.data);
                setProject(response.data);
                axiosInstance.get(`/ProjectStats/${id}/ProjectStats`).then(response =>{
                    console.log(response.data, 'stats');
                    setProjectStats(response.data);
                    setLoading(false);
                });
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
            <h1>Detalii proiect</h1>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{Project.projectName}&nbsp;&nbsp;
                        <Link to={'/changeProjectName/' + id}><FontAwesomeIcon icon={'edit'}/>
                        </Link></h4>
                    <p className="card-text"><label>Descriere: </label> {Project.description}&nbsp;&nbsp;
                        <Link to={'/changeProjectDescription/' + id}><FontAwesomeIcon icon={'edit'}/>
                        </Link>
                    </p>

                    <p>Acest proiect tine pana la <strong>{Project.endDate}</strong></p>
                    <p>Progres :{projectStats.totalTasksCompleted} / {projectStats.totalTasksAsigned}   </p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                    <small>Creat: {format(new Date(Project.createdAt), 'dd.MM.yyyy')}</small>
                    <small>Ultima actualizare: {format(new Date(Project.updatedAt), 'dd.MM.yyyy')}</small>

                </div>
            </div>
            <Link to={`/tasks/${Project.id}`} className='btn btn-secondary m-1'>Activitati</Link>
        </>
    )
}

export default Project
