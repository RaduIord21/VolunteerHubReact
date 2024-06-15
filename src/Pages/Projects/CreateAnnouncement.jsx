import React, { useState } from 'react'
import useAxios from '../../Hooks/useAxios';
import { Navigate, useParams } from 'react-router-dom';

function CreateAnnouncement() {

    const [Title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    const [redirect, setRedirect] = useState(false);
    const axiosInstance = useAxios();
    const { id } = useParams();
    const handleTitleChange = (e) =>{
        setTitle(e.target.value);
    }

    const handleContentChange = (e) =>{
        setContent(e.target.value);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(Title, Content);
        const data = {
            title : Title,
            content : Content
        }
        axiosInstance.post(`/Announcements/${id}/createAnnouncement`,data).then(response => {
            setRedirect(true);
        });
    }
    return (
        <>
        {redirect && <Navigate to={`/project/${id}`} />}
        <h1>Creeza anunt</h1>
        <form className='w-25 m-3' onSubmit={handleSubmit}>
      <label className='form-label'>Titlul anuntului</label>
      <input
          className='form-control'
          name="ProjectName"
          value={Title}
          onChange={handleTitleChange}
      />
      <label className='form-label'> Continut</label>
      <textarea
          className='form-control'
          name="Description"
          value={Content}
          onChange={handleContentChange}
      />
      <button className='btn btn-primary'  type='submit'> Trimite </button>
        </form>
        </>
    )
}

export default CreateAnnouncement;
