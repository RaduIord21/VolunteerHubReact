import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useAxios from '../../Hooks/useAxios';
import { useAuth } from '../../Hooks/AuthProvider';


function Projects() {

    const auth = useAuth();
    const [projects, setProjects] = useState([]);
    const projectId = auth.organizationId;
    const axiosInstance = useAxios();
    
    const handleDeleteProject = (id) => {
        const deleteData = {
            Id : id 
        };
        axios.post('http://localhost:8000/api/deleteProject',deleteData,{
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        ).then(response => {
            console.log(response);
            setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
        }).catch(error =>{
            console.error(error);
        })
        ;
    }
    
    useEffect(() => {
        axiosInstance.get(`/projects/${projectId}/projects`
        )
            .then(response => {
                // handle success
                console.log(response.data);
                setProjects(response.data);
            })
            .catch(error => {   
                // handle error
                console.log(error.response.data);
            })
    }, []);
    

    
    return (
        <>
            <h1>Lista proiecte</h1>
            <div className="text-center">
                <div className="table-responsive">
                    <table className="table table-bordered table-condensed table-striped table-hover sortable">
                        <thead>
                        <tr>
                            <th scope="col">Nume proiect</th>
                            <th scope="col">Descriere</th>
                            <th scope="col">Data finalizare</th>
                            <th scope="col">Actiuni</th>
                        </tr>
                        </thead>
                        <tbody>
                        {projects.length === 0 &&
                            <tr>
                                <td>No Records found</td>
                            </tr>}
                        {projects.length !== 0 && <>
                        {projects.map((item, index) => (
                            <tr key={index}>
                                <td className='m-1'>{item.projectName}</td>
                                <td className='m-1'>{item.description}</td>
                                <td className='m-1'>{item.endDate}</td>
                                <td>
                                    <Link to={`/project/${item.id}`} className='btn btn-primary m-1'>Detalii</Link>
                                    <button className='btn btn-danger m-1'
                                            onClick={() => handleDeleteProject(item.id)}>Stergere
                                    </button>
                                    <Link to={`/tasks/${item.id}`} className='btn btn-secondary m-1'>Taskuri</Link>
                                </td>
                            </tr>
                        ))
                        }
                        </>
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Projects;
