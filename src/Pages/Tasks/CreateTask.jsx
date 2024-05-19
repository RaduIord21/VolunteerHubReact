import React, {useState} from 'react'
import {Navigate, useParams} from 'react-router-dom';
import useAxios from '../../Hooks/useAxios';

function CreateTask() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [action, setAction] = useState('');
    const [endDate, setEndDate] = useState(null);
    const [successTreshold, setSuccessTreshold] = useState(null);
    const [measureUnit, setMEasureUnit] = useState('');
    const [isTime, setIsTime] = useState(false);
    const [back, setBack] = useState(false);

    const {id} = useParams();
    const stringToNumber = (str) => parseInt(str, 10);
    const NumId = stringToNumber(id);
    const axiosInstance = useAxios();

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleActionChange = (e) => {
        setAction(e.target.value);
    }

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    }

    const handleSuccessTreshhold = (e) => {
        setSuccessTreshold(e.target.value);
    }

    const handleMeasureunit = (e) => {
        setMEasureUnit(e.target.value);
    }

    const handleIsTime = (e) => {
        setIsTime(!isTime);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const rsp = {
            Name: name,
            ProjectId: NumId,
            Description: description,
            Action: action,
            EndDate: endDate,
            SuccessTreshold: successTreshold,
            MeasureUnit: measureUnit,
            IsTime: isTime
        }
        console.log(rsp);

        axiosInstance.post(`/Tasks/${id}/createTask`, rsp
        ).then(response => {
            console.log(response.data);
            setBack(true);
        }).catch(error => {
            console.error(error);
        })
    }
    return (
        <>
            {back && <Navigate to={`/tasks/${NumId}`} />}
            <h1>Task nou</h1>
            <div className="row">
                <div className="col-6">
                    <form className='m-3' onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className='form-label'>
                                Name:
                            </label>
                            <input type="text" name="Name" className='form-control' value={name}
                                   onChange={handleNameChange}/>
                        </div>

                        <div className="mb-3">
                            <label className='form-label'>
                                Description:
                            </label>
                            <textarea name="Description" className='form-control'
                                      onChange={handleDescriptionChange}>{description}</textarea>
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>
                                Action:
                            </label>
                            <input type="text" name="Action" className='form-control' value={action}
                                   onChange={handleActionChange}/>
                        </div>

                        <div className="mb-3">
                            <label className='form-label'>
                                EndDate:
                            </label>
                            <input type="datetime-local" name="EndDate" className='form-control' value={endDate}
                                   onChange={handleEndDateChange}/>
                        </div>

                        <div className="mb-3">
                            <label className='form-label'>
                                Success Treshold:
                            </label>
                            <input type="number" name="SuccessTreshold" className='form-control'
                                   value={successTreshold} onChange={handleSuccessTreshhold}/>
                        </div>

                        <div className="mb-3">
                            <label className='form-label'>
                                Measure Unit:
                            </label>
                            <input type="text" name="MeasureUnit" className='form-control' value={measureUnit}
                                   onChange={handleMeasureunit}/>
                        </div>

                        <div className="mb-3">
                            <label className='form-check-label'>
                                <input type="checkbox" name="IsTime" className='form-check-input' checked={isTime}
                                       onChange={handleIsTime}/> Time Units? </label>
                        </div>

                        <div className="mb-3">
                            <br/>
                            <input type='submit' className='btn btn-primary' value="Submit"/>
                        </div>
                    </form>
                </div>
                <div className="col-6">

                </div>
            </div>
        </>
    );
};


export default CreateTask;
