import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Projects() {

    const [projects, setProjects] = useState([]);

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
        axios.get('http://localhost:8000/api/projects', {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
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
            <h1>Projects</h1>
            <Link to="/dashboard"><button className='btn btn-secondary'>Back</button></ Link>
            <Link to="/createProject"><button className='btn btn-primary' >Add Project</button></Link>
            <div className="text-center">
                <div className="table-responsive">
                    <table className="table table-bordered table-condensed table-striped table-hover sortable">
                        {projects.length === 0 &&
                            <tr>
                                <td colspan="6">No Records found</td>
                            </tr>}
                        {projects.length !== 0 && <>
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Project Name</th>
                                    <th scope="col">Project Description</th>
                                    <th scope="col">End Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Link to={`/project/${item.id}`} className='btn btn-primary m-1'>View Project</Link>
                                            <button className='btn btn-danger m-1' onClick={() =>handleDeleteProject(item.id)}>Delete Project</button>
                                            <Link to={`/tasks/${item.id}`} className='btn btn-primary m-1'>Manage Tasks</Link>
                                            <Link to={`/manageProjectMembers/${item.id}`} className='btn btn-primary m-1'>Manage members</Link>    
    
                                        </td>
                                        <td className='m-1'>{item.projectName}</td>
                                        <td className='m-1'>{item.description}</td>
                                        <td className='m-1'>{item.endDate}</td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </>
                        }
                    </table>
                </div>
            </div>
        </>
    )
}

export default Projects;
