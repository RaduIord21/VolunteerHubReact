import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAxios from '../../Hooks/useAxios';


function TaskMembers() {

    const [members,setMembers] = useState([]);
    const { id } = useParams();

    const handleKick = (Id) =>{
        
        useAxios.post(`/Tasks/${id}/kickFromTask`,{
            userId: Id
          }).then(response =>{
            console.log(members);
            const updatedItems = members.filter(item => item.id !== Id);
            setMembers(updatedItems);
          });
    };

    useEffect(() => {
            useAxios.get(`/Tasks/${id}/TaskMembers`
            )
                .then(response => {
                    // handle success
                    console.log(response.data);
                    setMembers(response.data);

                })
                .catch(error => {
                    // handle error
                    console.log(error);
                })
        }, [id]);

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
                            <td>{item.userName}</td>
                            <td>
                                {item ? <button className='btn btn-danger' onClick={(e) =>{e.preventDefault(); handleKick(item.id)}}>Kick</button> : <></>}
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
