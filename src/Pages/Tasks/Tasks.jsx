import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import UpdateProgressPopup from '../../Components/UpdateProgressPopup';
import useAxios from '../../Hooks/useAxios';


function Tasks() {

    const [tasks,setTasks] = useState([]);
    const { id } = useParams();

    const [showPopup, setShowPopup] = useState(false);
    const [endpoint, setEndpoint] = useState('')

    const handleShowPopup = (id) => {
        setEndpoint('/tasks/' + id + '/updatetask')
        setShowPopup(true)
    };
    const handleClosePopup = () => {
        setShowPopup(false);
        fetchData();
    }

    const handleDelete = (id) =>{
        useAxios.post(`/Tasks/${id}/DeleteTask`).then(response =>
            {
                fetchData();
                console.log(response.data);
            }
        );
    }
    const fetchData = useCallback(async () => {
        useAxios.get(`/Tasks/${id}/tasks`
            )
                .then(response => {
                    // handle success
                    console.log(response.data);
                    setTasks(response.data);

                })
                .catch(error => {
                    // handle error
                    console.log(error);
                })
    }, [id]);

    useEffect(() => {
        fetchData();
        }, [id, fetchData]);

    return <>
        <h1>Tasks</h1>
        <UpdateProgressPopup 
        show={showPopup} 
        endpoint={endpoint} 
        title="Add Progress"
        instructions="Submit a new value to be added to the progress"
        label="Value"
        handleClose={handleClosePopup} />
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
                            <td colSpan={7}>No Records found</td>
                        </tr>}
                    {tasks.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.action}</td>
                            <td>{item.progress}/{item.successTreshold} {item.measureUnit}  
                            <button onClick={() => handleShowPopup(item.id)} className='btn btn-sm btn-outline-primary mx-2'>Add</button></td>
                            <td>{item.status}</td>
                            <td>{item.endDate}</td>
                            <td>
                                <Link to={`/tasks/${item.id}/taskmembers`}>
                                    <button className='btn btn-sm btn-outline-primary mx-2'>Voluntari</button>
                                </Link>
                                
                                <Link to={`/tasks/${item.projectId}/edit-task/${item.id}`}>
                                    <button className='btn btn-sm btn-outline-primary mx-2'>Editeaza task</button>
                                </Link>
                                <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete task</button>
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
