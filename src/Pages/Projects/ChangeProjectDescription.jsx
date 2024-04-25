import React, { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';


function ChangeProjectDescription() {

    
    const [description, setDescription] = useState("");
    const [back, setBack] = useState(false);
    const {id} = useParams();

    const stringToNumber = (str) => parseInt(str, 10);
    const NumId = stringToNumber(id);


    const handleDescriptionChange = (e) =>{
        setDescription(e.target.value);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const data = {
            "Id" : NumId,
            "Description" : description
        }
        axios.post('http://localhost:8000/api/changeDescription', data, {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          }).then(response => {
            console.log(response.data);
            setBack(true);
        }).catch(error => {
            // Handle error
            console.log('Error : ' + error);
        });
    }
    return (
        <>
        {back && <Navigate to={"/project/" + id}/>}
        <h1>Change Description</h1>
        <form className='w-25 m-3' onSubmit={handleSubmit}>
                <label htmlFor="input1" className='form-label'>Type new Description</label>
                <textarea className='form-control' value={description} onChange={handleDescriptionChange} />
                <input className='btn btn-primary mt-3' type="submit" value="Submit !" />
            </form>
        </>
    )
}

export default ChangeProjectDescription
