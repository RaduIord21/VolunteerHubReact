import React, { useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import api from "../../Hooks/api";
import {useAuth} from "../../Hooks/AuthProvider";

function Dashboard(props) {

  const auth = useAuth();
  const [hasOrg, setHasOrg] = useState(true);
  const navigate = useNavigate();

  console.log("organizationId", localStorage.getItem("organizationId"));
  useEffect(() => {
    if( localStorage.getItem("organizationId") == null) {
      navigate('/select-organization');
    }

  }, []);


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
