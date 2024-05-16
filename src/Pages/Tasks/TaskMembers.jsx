import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../Hooks/api';


function TaskMembers() {

    const [members,setMembers] = useState([]);
    const { id } = useParams();
    
    useEffect(() => {
            api.get(`/Tasks/${id}/TaskMembers`
            )
                .then(response => {
                    // handle success
                    console.log(response.data);
                    setMembers(response.data);
                    console.log(members, 'aici');

                })
                .catch(error => {
                    // handle error
                    console.log(error);
                })
        }, []);

    return <>
        <h1>Voluntari</h1>
        <p><Link to={`/assign-task/${id}`}><button className='btn btn-primary' >Add Member</button></Link></p>
        <div className="text-center">
            <div className="table-responsive">
                <table className="table table-bordered table-condensed table-striped table-hover sortable">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actiuni</th>
                        </tr>
                        </thead>
                    <tbody>
                    {members.length === 0 &&
                        <tr>
                            <td colspan={7}>No Records found</td>
                        </tr>}
                    {members.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>
                                kick
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>

}

export default TaskMembers;
