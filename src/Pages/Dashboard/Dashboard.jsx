import React, { useState, useEffect} from 'react'
import {Link, useNavigate, Navigate} from 'react-router-dom';
import {useAuth} from "../../Hooks/AuthProvider";
import CardComponent from "../../Components/CardComponent";
import dashboardUsers from '../../Assets/dashboard-users.png'
import dashboardProjects from '../../Assets/dashboard-projects.png'
import dashboardTasks from '../../Assets/dashboard-tasks.png'

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

  const cardsData = [
    {
      image: dashboardUsers,
      number: 12,
      text: 'Membri',
    },
    {
      image: dashboardProjects,
      number: 2,
      text: 'Proiecte',
    },
    {
      image: dashboardTasks,
      number: 17,
      text: 'Activitati',
    },
  ];

    return (<>
      {selectOrg && <Navigate to="/select-organization"/>}
      <h1>Panoul de control</h1>
      <h3>{(props.username === "") ? 'Unauthorized' : props.username}</h3>
      {
        <div className="card">
          <div className="card-body">
            <h4>Organizatia curenta: {auth.companyName}</h4>
            <p>Rol de &quot;<strong>{auth.role}</strong>&quot;</p>
          </div>
          <div className="card-footer">
            <Link to="/projects">
              <button className='btn btn-primary m-1'>Lista proiecte</button>
            </Link>
            <Link to="/my-organization">
              <button className='btn btn-primary m-1'>Detalii organizatie</button>
            </Link>
          </div>
        </div>
      }

      <div className="row">
        {cardsData.map((card, index) => (
            <CardComponent
                key={index}
                image={card.image}
                number={card.number}
                text={card.text}
            />
        ))}
      </div>

      <div className="text-muted text-end" style={{marginTop:'400px'}}>
        Illustration by <a href="https://icons8.com/illustrations/author/cj62pzCRUq1N">Julia Buzatti</a> from <a href="https://icons8.com/illustrations">Ouch!</a>
      </div>
    </>)
}

export default Dashboard;
