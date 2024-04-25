import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function ManageProjectMembers() {

  const { id } = useParams();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const stringToNumber = (str) => parseInt(str, 10);
  const [selectedPeople, setSelectedPeople] = useState([]); // State to manage selected people

  const NumId = stringToNumber(id);
  useEffect(() => {
    axios.get("http://localhost:8000/api/organization", {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }).then(response => {
      setMembers(response.data.users);
      setLoading(false);
      if (response.data === null || response.data === undefined) {
        console.log("Nu e organizatie");
      }
    }).catch(error => {
      console.log("Eroare fatalaa " + error)
    })
  }, []);

  const handlePersonChange = (e) => {
    const personName = e.target.value;
    const isChecked = e.target.checked;

    // Update selectedPeople based on checkbox state
    if (isChecked) {
      setSelectedPeople([...selectedPeople, personName]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMembers(selectedPeople);
    console.log(members);
  }
  return (
    <>
      <h1>Manage members</h1>
      <form className='w-25 m-3' onSubmit={handleSubmit}>
        {members.map((item, index) => (
          <div class="form-radio">
            <input class="form-check-input" type="radio" onChange={handlePersonChange} id="flexCheckDefault" />
            <label class="form-check-label" htmlFor="flexCheckDefault">
              {item.userName}
            </label>
          </div>
        ))
        }
        <input type='submit' className='btn btn-primary' />
      </form>
    </>
  )
}

export default ManageProjectMembers
