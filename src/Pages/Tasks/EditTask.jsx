import React, { useState, useEffect } from 'react';
import useAxios from '../../Hooks/useAxios';
import { Navigate, useParams } from 'react-router-dom';

const EditTask = () => {
    const axiosInstance = useAxios();
    const { id }     = useParams();
    const { projectId }     = useParams();
    const [back, setBack] = useState(false);
    const [task, setTask] = useState({
        name: '',
        description: '',
        action: '',
        endDate: '',
        successThreshold: 0,
        measureUnit: '',
        isTime: false,
    });

    useEffect(() => {
        console.log(id, 'edit task')
        axiosInstance.get(`/tasks/${id}/task`
        )
            .then(response => {
                // handle success
                console.log(response.data, 'task details');
                setTask(response.data);
            })
            .catch(error => {   
                // handle error
                console.log(error.response.data);
            })
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTask({
            ...task,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axiosInstance.post(`/Tasks/${id}/editTask`, task)
                .then(response => { 
                    setBack(true);
                });
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <>
        {back && <Navigate to={`/tasks/${projectId}`} />}
        <h1>Edit Task</h1>
        <div className="container mt-5">
            <form className="w-25" onSubmit={handleSubmit}>
                <div className=" mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={task.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="action" className="form-label">Action</label>
                    <input
                        type="text"
                        className="form-control"
                        id="action"
                        name="action"
                        value={task.action}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="endDate" className="form-label">End Date</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="endDate"
                        name="endDate"
                        value={task.endDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="successTreshold" className="form-label">Success Threshold</label>
                    <input
                        type="number"
                        className="form-control"
                        id="successTreshold"
                        name="successTreshold"
                        value={task.successTreshold}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="measureUnit" className="form-label">Measure Unit</label>
                    <input
                        type="text"
                        className="form-control"
                        id="measureUnit"
                        name="measureUnit"
                        value={task.measureUnit}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="isTime"
                        name="isTime"
                        checked={task.isTime}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="isTime">Is Time</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </>
    );
};

export default EditTask;
