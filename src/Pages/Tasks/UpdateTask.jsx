import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import useAxios from '../../Hooks/useAxios';

function UpdateTask() {
    const [progress, setProgress] = useState(0)
    const { id } = useParams();
    const [redirect, setRedirect] = useState(false);
    const [projectId, setProjectId] = useState(0);
    const now = new Date();
    const axiosInstance = useAxios();
    const handleUpdate = () => {
        const url = `/Tasks/${id}/updateTask`;
        axiosInstance.post(url, {

            progress: progress,
            submissionDate: now

        }).then(response => {
            console.log('Update successful:', response.data);
            setProjectId(response.data);
            setRedirect(true);
        });
    };

    return <>
        {redirect && <Navigate to={'/tasks/' + projectId} />}
        <div className="popup">
            <div className="popup-content">
                <h2>Update Task</h2>
                <label>
                    Progress:
                    <input
                        type="number"
                        value={progress}
                        onChange={(e) => setProgress(parseInt(e.target.value, 10))}
                    />
                </label>
                <br />
                <button onClick={handleUpdate}>Update Task</button>

            </div>
        </div>
    </>
}
export default UpdateTask;
