import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { CircleNotch } from 'phosphor-react';


function Tasks() {

    const [tasks,setTasks] = useState([]);
    const { id } = useParams();
    
    useEffect(() => {
            axios.get(`http://localhost:8000/api/tasks/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
            )
                .then(response => {
                    // handle success
                    console.log(response.data);
                    setTasks(response.data);
                    console.log(tasks, 'aici');

                })
                .catch(error => {
                    // handle error
                    console.log(error);
                })
        }, []);

    return <>
        <h1>Tasks</h1>
        <Link to="/dashboard"><button className='btn btn-secondary'>Back</button></ Link>
        <Link to={`/createTask/${id}`}><button className='btn btn-primary' >Add Task</button></Link>
        <div className="text-center">
            <div className="table-responsive">
                <table className="table table-bordered table-condensed table-striped table-hover sortable">
                        <thead>
                            <tr>
                                <th>Task name</th>
                                <th>Description</th>
                                <th>Asignee</th>
                                <th>Job</th>
                                <th>Progress</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                    {tasks.length === 0 &&
                        <tr>
                            <td>No Records found</td>
                        </tr>}
                    {tasks.map((item, index) => (
                            <tr key={index}>
                              <td>{item.name}</td>
                              <td>{item.description}</td>
                              <td>{item.asigneeId == null ? <button className='btn btn-outline-primary'>Asign task</button> : item.asigneeId}</td>
                              <td>{item.action}</td>
                              <td>{item.progress}/{item.successTreshold}</td>
                              <td>{item.status}</td>
                            </tr>  
                            ))}
                        </tbody>
                </table>
            </div>
        </div>
    </>

}

export default Tasks;
