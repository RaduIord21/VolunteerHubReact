import React, { useEffect, useState } from 'react'
import {Link, Navigate, useParams} from 'react-router-dom';
import axios from 'axios';
import useAxios from "../../Hooks/useAxios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {format} from "date-fns";

function AsignTask() {
    const { id } = useParams();
    const [options, setOptions] = useState([])
    const [task, setTask] = useState(null);
    const [back, setBack] = useState(false);
    const axiosInstance = useAxios();

    useEffect(() => {

        axiosInstance.get(`/tasks/${id}/task`
        ).then(response => {
            console.log(response.data);
            setTask(response.data);

            axiosInstance.get(`/tasks/${response.data.projectId}/projectMembersForTask`
            ).then(response => {
                console.log("Asta e de pe server");
                console.log(response.data);
                    setOptions(response.data);
                })
                .catch(error => {
                    // handle error
                    console.log(error.response.data);
                })
        }).catch(error => {
            console.error(error);
        })


    }, []);

    const handleChange = (id) => {
        // Actualizăm starea checkbox-ului cu id-ul specificat
        setOptions((prevCheckboxList) =>
          prevCheckboxList.map((checkbox) =>
            checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
          )
        );
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        const users = options.filter(item => item.checked)
        const userIds = users.map((object) => object.id);
        const data =
        {
            userIds: userIds
        }
        console.log(data);
        axiosInstance.post(`/tasks/${task.id}/assignTask`,data
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
            <h1>Atribuie activitate</h1>
            {task &&
                <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{task.name}</h4>
                    <p className="card-text"><label>Descriere: </label> {task.description}
                    </p>

                    <p>Aceasta activitate tine pana la <strong>{task.endDate}</strong></p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                    <small>Status: {task.status}</small>
                </div>
            </div>
            }
            {back && <Navigate to={`/tasks/${task.projectId}`}/>}
            <h4>Lista voluntari</h4>
            <form onSubmit={handleSubmit}>
                {options.map((item) => (
                        <div className="form-check" key={item.id}>
                            <label className="form-check-label" htmlFor={`${item.id}`}>
                                {item.userName}
                            </label>
                            <input className="form-check-input" type="checkbox" name="flexRadioDefault" id={`${item.id}`}
                                   value={item}
                                   checked={item.checked || false}
                                   onChange={() => handleChange(item.id)}
                                   />
                        </div>
                    )
                )}
                <button type='submit' className='btn btn-primary'>Trimite</button>
            </form>
        </>
    )
}

export default AsignTask;
