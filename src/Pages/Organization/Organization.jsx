import React from 'react';
import {Link} from 'react-router-dom';

function Organization(props) {
    return (
        <>
        <h1>Organization</h1>
        <p>
        <Link to="/createOrganization"><button className='btn btn-primary'> Create organization</button></Link>
        <Link to="/joinOrganization"><button className='btn btn-primary'> Join organization</button></Link>
        </p>
        </>
    )
}

export default Organization;
