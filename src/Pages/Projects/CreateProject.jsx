import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import useAxios from '../../Hooks/useAxios';

function CreateProject() {
  

  const [ProjectName, setProjectName] = useState("");
  const [Description, setDescription] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [back, setBack] = useState(false);

  const orgId = localStorage.getItem("organizationId");
  const handleBack = () => {
    setBack(true);
  }

  const handleProjectNameChange = (e) =>{
    setProjectName(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = 
      {
        "projectName" : ProjectName,
        "description" : Description,
        "endDate" : EndDate
      }
      console.log(response);
    useAxios.post(`/Projects/${orgId}/createProject`, response, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
      .then(response => {
        console.log(response);
        setBack(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  

  return (<>
    <h1>Proiect nou</h1>
    {back && <Navigate to="/projects"/>}
    <form className='w-25 m-3' onSubmit={handleSubmit}>
      <label className='form-label'>Nume proiect :</label>
      <input
          className='form-control'
          name="ProjectName"
          value={ProjectName}
          onChange={handleProjectNameChange}
      />
      <label className='form-label'> Descriere :</label>
      <textarea
          className='form-control'
          name="Description"
          value={Description}
          onChange={handleDescriptionChange}
      />
      <label className='form-label'> Data finalizare : </label>
      <input
          className='form-control'
          type="date"
          name="EndDate"
          value={EndDate}
          onChange={handleEndDateChange}
      />
      <button className='btn btn-primary mt-3' type="submit">Submit</button>
    </form>
  </>);
}

export default CreateProject;
