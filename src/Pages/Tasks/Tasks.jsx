import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../Hooks/api';


function Tasks() {

    const [tasks,setTasks] = useState([]);
    const { id } = useParams();
    
    useEffect(() => {
            api.get(`/Tasks/${id}/tasks`
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
        <p><Link to={`/create-task/${id}`}><button className='btn btn-primary' >Add Task</button></Link></p>
        <div className="text-center">
            <div className="table-responsive">
                <table className="table table-bordered table-condensed table-striped table-hover sortable">
                        <thead>
                        <tr>
                            <th>Task name</th>
                            <th>Description</th>
                            <th>Job</th>
                            <th>Progress</th>
                            <th>Status</th>
                            <th>End Date</th>
                            <th>Actiuni</th>
                        </tr>
                        </thead>
                    <tbody>
                    {tasks.length === 0 &&
                        <tr>
                            <td colspan={7}>No Records found</td>
                        </tr>}
                    {tasks.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td><Link to={`/tasks/update-task/${item.id}`}><button className='btn btn-outline-primary mx-2'>{item.action}</button></Link></td>
                            <td>{item.progress}/{item.successTreshold} {item.measureUnit}</td>
                            <td>{item.status}</td>
                            <td>{item.endDate}</td>
                            <td>
                                <Link to={`/tasks/${item.id}/taskmembers`}>
                                <button className='btn btn-outline-primary mx-2'>Voluntari</button>
                            </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>

}

export default Tasks;
