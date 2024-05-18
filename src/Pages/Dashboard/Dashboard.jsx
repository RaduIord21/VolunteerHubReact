import React, { useState, useEffect} from 'react'
import {Link, useNavigate, Navigate} from 'react-router-dom';
import {useAuth} from "../../Hooks/AuthProvider";

function Dashboard(props) {

  const auth = useAuth();
  const [hasOrg, setHasOrg] = useState(true);
  const navigate = useNavigate();
  const [selectOrg, setSelectOrg] = useState(false);

  useEffect(() => {
    if( auth.organizationId == null) {
      setSelectOrg(true);
    }

  }, []);
    
    return (<>
      {selectOrg && <Navigate to="/select-organization" />}
      <h1>Dashboard</h1> 
      <h3>{(props.username === "") ? 'Unauthorized' : props.username}</h3>
      {
          <div>
            <h4>Organizatia curenta: {auth.companyName}</h4>
            <Link to="/projects"><button className='btn btn-primary m-1'>Projects</button></Link>
            <Link to="/my-organization"><button className='btn btn-primary m-1'>My organization</button></Link>
          </div>
      }
    </>)
  }

export default Dashboard;
