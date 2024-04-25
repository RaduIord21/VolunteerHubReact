import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function CreateTask() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [action, setAction] = useState('');
    const [endDate, setEndDate] = useState(null);
    const [successTreshold, setSuccessTreshold] = useState(null);
    const [measureUnit, setMEasureUnit] = useState('');
    const [isTime, setIsTime] = useState(false);

    const { id } = useParams();
    const stringToNumber = (str) => parseInt(str, 10);
    const NumId = stringToNumber(id);


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

        axios.post('http://localhost:8000/api/createTask', rsp, {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          }).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.error(error);
    })
    }
    return (
        <>
        <Link to={`/tasks/${NumId}`}><button className='btn btn-secondary'>Back</button></Link>
        <form className='w-25 m-3' onSubmit={handleSubmit}>
        <div class="form-row">
            <label className='form-label'>
                Name:
                <input type="text" name="Name" className='form-control' value={name} onChange={handleNameChange} />
            </label>
        </div>

            <label className='form-label'>
                Description:
                <input type="text" name="Description" className='form-control' value={description} onChange={handleDescriptionChange} />
            </label>

            <div class="form-row">
            <label className='form-label'>
                Action:
                <input type="text" name="Action" className='form-control' value={action} onChange={handleActionChange} />
            </label>
            </div>

            <div class="form-row">
            <label className='form-label' >
                EndDate:
                <input type="datetime-local" name="EndDate" className='form-control' value={endDate} onChange={handleEndDateChange} />
            </label>
            </div>

            <div class="form-row">
            <label className='form-label'>
                SuccessTreshold:
                <input type="number" name="SuccessTreshold" className='form-control' value={successTreshold} onChange={handleSuccessTreshhold} />
            </label>
            </div>

            <div class="form-row">
            <label className='form-label'>
                MeasureUnit:
                <input type="text" name="MeasureUnit" className='form-control' value={measureUnit} onChange={handleMeasureunit} />
            </label>
            </div>

            <div class="form-row">
            
                <input type="checkbox" name="IsTime" className='form-check-input' checked={isTime} onChange={handleIsTime} />
                <label className='form-check-label'> Is Time </label>
            </div>

            <div class="form-row">
            <br />
            <input type='submit' className='btn btn-primary' value="Submit !" />
            </div>
        </form>
        </>
    );
};


export default CreateTask;
