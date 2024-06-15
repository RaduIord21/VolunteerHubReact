import React, {useEffect, useState} from 'react'
import { useParams, Navigate } from 'react-router-dom';
import useAxios from '../../Hooks/useAxios';


function ChangeProjectDescription() {


    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [back, setBack] = useState(false);
    const {id} = useParams();
    const axiosInstance = useAxios();

    const stringToNumber = (str) => parseInt(str, 10);
    const NumId = stringToNumber(id);


    const handleDescriptionChange = (e) =>{
        setDescription(e.target.value);
    }

    useEffect(() => {
        axiosInstance.get(`/Projects/${NumId}/getProject`)
            .then(response => {
                setDescription(response.data.description);
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
            "Description" : description
        }
        axiosInstance.post(`/Projects/${NumId}/changeDescription`, data, {
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
            <h3>Project: {name}</h3>
        <form className='w-25 m-3' onSubmit={handleSubmit}>
                <label htmlFor="input1" className='form-label'>Type new Description</label>
                <textarea className='form-control' value={description} onChange={handleDescriptionChange} />
                <input className='btn btn-primary mt-3' type="submit" value="Trimite" />
            </form>
        </>
    )
}

export default ChangeProjectDescription
