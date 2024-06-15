import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import UpdateProgressPopup from '../../Components/UpdateProgressPopup';
import useAxios from '../../Hooks/useAxios';


function Tasks() {
    const axiosInstance = useAxios();
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
        axiosInstance.post(`/Tasks/${id}/DeleteTask`).then(response =>
            {
                fetchData();
                console.log(response.data);
            }
        );
    }
    const fetchData = useCallback(async () => {
        axiosInstance.get(`/Tasks/${id}/tasks`
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
        <h1>Activitati</h1>
        <UpdateProgressPopup
        show={showPopup}
        endpoint={endpoint}
        title="Adauga Progres"
        instructions="Trimite o valoare noua pentru a fi adaugata ca progres al activitatii"
        label="Value"
        handleClose={handleClosePopup} />
        <p><Link to={`/create-task/${id}`}><button className='btn btn-primary' >Adauga activitate</button></Link></p>
        <div className="text-center">
            <div className="table-responsive">
                <table className="table table-bordered table-condensed table-striped table-hover sortable">
                        <thead>
                        <tr>
                            <th>Nume activitate</th>
                            <th>Descriere</th>
                            <th>Proceduri</th>
                            <th>Progres</th>
                            <th>Stare</th>
                            <th>Data finalizare</th>
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
                            <button onClick={() => handleShowPopup(item.id)} className='btn btn-sm btn-outline-primary mx-2'>Adauga</button></td>
                            <td>{item.status}</td>
                            <td>{item.endDate}</td>
                            <td>
                                <Link to={`/tasks/${item.id}/taskmembers`}>
                                    <button className='btn btn-sm btn-outline-primary mx-2'>Voluntari</button>
                                </Link>

                                <Link to={`/tasks/${item.projectId}/edit-task/${item.id}`}>
                                    <button className='btn btn-sm btn-outline-primary mx-2'>Modifica activitate</button>
                                </Link>
                                <button className='btn btn-sm btn-danger' onClick={() => handleDelete(item.id)}>Sterge activitate</button>
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
