import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dashboard(props) {

  const [hasOrg, setHasOrg] = useState(true);
  console.log(props);
  useEffect(() => {
    axios.get("http://localhost:8000/api/organization", {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }).then(response => {
      console.log(response.data);
      if (response.data.organizationName === null || response.data.organizationName === undefined) {
        console.log("Neautorizat");
        setHasOrg(false);
      }
    })}, []);


    return (<>
      <h1>Dashboard</h1>
      <h3>{(props.username === "") ? 'Unauthorized' : props.username}</h3>
      {
        (props.username !== "" && hasOrg === false) ?
          <div>
            <Link to="/organization"><button className='btn btn-primary m-1'>Add organization</button></Link>
          </div> :
          <div>
            <Link to="/projects"><button className='btn btn-primary m-1'>Projects</button></Link>
            <Link to="/myOrganization"><button className='btn btn-primary m-1'>My organization</button></Link>
          </div>
      }
    </>)
  }

export default Dashboard;
