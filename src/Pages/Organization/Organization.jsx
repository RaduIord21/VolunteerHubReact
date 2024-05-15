import React from 'react';
import {Link} from 'react-router-dom';

function Organization(props) {
    return (
        <>
        <h1>Organization</h1>
        <p>
        <Link to="/create-organization"><button className='btn btn-primary'> Create organization</button></Link>
        <Link to="/join-organization"><button className='btn btn-primary'> Join organization</button></Link>
        </p>
        </>
    )
}

export default Organization;
