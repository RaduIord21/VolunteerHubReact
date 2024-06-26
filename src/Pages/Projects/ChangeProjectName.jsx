import React, {useEffect, useState} from 'react'
import { useParams, Navigate } from 'react-router-dom';
import useAxios from '../../Hooks/useAxios';

function ChangeProjectName() {

    const [name, setName] = useState("");
    const [back, setBack] = useState(false);
    const {id} = useParams();
    const axiosInstance = useAxios();
    const stringToNumber = (str) => parseInt(str, 10);
    const NumId = stringToNumber(id);

    const handleNameChange = (e) =>{
        setName(e.target.value);
    }

    useEffect(() => {
        axiosInstance.get(`/Projects/${NumId}/getProject`)
            .then(response => {
                setName(response.data.projectName);
                if (response.data === null || response.data === undefined) {
                    console.log("Nu e proiect");
                }
            }).catch(error => {
            console.log("Eroare fatala " + error)
        })
    }, []);

    const handleSubmit = (e) =>{
        e.preventDefault();
        const data = {
            "Id" : NumId,
            "Name" : name
        }
        axiosInstance.post(`/Projects/${NumId}/changeProjectName`, data, {
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
        <h1>Change Name</h1>
        <form className='w-25 m-3' onSubmit={handleSubmit}>
                <label htmlFor="input1" className='form-label'>Type new Name</label>
                <input type='text' className='form-control' value={name} onChange={handleNameChange} />
                <input className='btn btn-primary mt-3' type="submit" value="Trimite" />
            </form>
        </>
    )
}

export default ChangeProjectName
