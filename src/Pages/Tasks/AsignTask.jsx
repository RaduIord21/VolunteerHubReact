import React, { useEffect, useState } from 'react'
import {Link, Navigate, useParams} from 'react-router-dom';
import axios from 'axios';
import api from "../../Hooks/api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {format} from "date-fns";

function AsignTask() {
    const { id } = useParams();
    const [checkboxItems, setCheckboxItems] = useState([]);
    const [task, setTask] = useState(null);
    const [back, setBack] = useState(false);

    useEffect(() => {

        api.get(`/tasks/${id}/task`
        ).then(response => {
            console.log(response.data);
            setTask(response.data);
            
            api.get(`/tasks/${response.data.projectId}/projectMembersForTask`
            ).then(response => {
                    // handle success
                    console.log(response.data);
                    setCheckboxItems(response.data);
                })
                .catch(error => {
                    // handle error
                    console.log(error.response.data);
                })
        }).catch(error => {
            console.error(error);
        })


    }, []);

    const handleCheckBoxChange = (itemId) => {
        setCheckboxItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
            )
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = 
        {
            TaskId : task.id,
            Users : checkboxItems.filter(item => item.checked)
        }
        console.log(data);
        api.post(`/tasks/${task.id}/assignTask`,data, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
            )
                .then(response => {
                    console.log(response);
                    setBack(true);
                })
                .catch(error => {
                    console.error(error);
                })

    }
    return (
        <>
            <h1>Atribuie task</h1>
            {task &&
                <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{task.name}</h4>
                    <p className="card-text"><label>Descriere: </label> {task.description}
                    </p>

                    <p>Acest task tine pana la <strong>{task.endDate}</strong></p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                    <small>Status: {task.status}</small>
                </div>
            </div>
            }
            {back && <Navigate to={`/tasks/${task.projectId}`}/>}
            <h4>Lista voluntari</h4>
            <form onSubmit={handleSubmit}>
                {checkboxItems.map((item, index) => (
                        <div class="form-check">
                            <label className="form-check-label" for={`index${index}`} key={index}>
                                {item.userName}
                            </label>
                            <input className="form-check-input" type="checkbox" name="flexRadioDefault" id={`index${index}`}
                                   value={item}
                                   checked={item.checked !== false}
                                   onChange={() => handleCheckBoxChange(item.id)}/>
                        </div>
                    )
                )}
                <button type='submit' className='btn btn-primary'>Submit !</button>
            </form>
        </>
    )
}

export default AsignTask;
