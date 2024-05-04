import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

function AsignTask() {
    const { id } = useParams();
    const [checkboxItems, setCheckboxItems] = useState([]);
    const [task, setTask] = useState(null);
    const [back, setBack] = useState(false);

    useEffect(() => {

        axios.get(`http://localhost:8000/api/task/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then(response => {
            console.log(response.data);
            setTask(response.data);
            
            axios.get(`http://localhost:8000/api/projectMembersForTask/${response.data.projectId}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
            )
                .then(response => {
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
        axios.post(`http://localhost:8000/api/assignTask`,data, {
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
        {back && <Navigate to={`/tasks/${task.projectId}`} />}
            <form onSubmit={handleSubmit}>
                {checkboxItems.map((item, index) => (
                    <div class="form-check">
                        <label className="form-check-label" for={`index${index}`} key={index}>
                            {item.userName}
                        </label>
                        <input className="form-check-input" type="checkbox" name="flexRadioDefault" id={`index${index}`}
                            value={item}
                            checked={item.checked !== false}
                            onChange={() => handleCheckBoxChange(item.id)} />
                    </div>
                )
                )}
                <button type='submit' className='btn btn-primary' >Submit !</button>
            </form>
        </>
    )
}

export default AsignTask;
