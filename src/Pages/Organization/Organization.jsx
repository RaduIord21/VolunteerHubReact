import React from 'react';
import { Link } from 'react-router-dom';
import JoinOrganization from './JoinOrganization';
import CreateOrganization from './CreateOrganization';

function Organization(props) {
    return (
        <>
            <h1>Adauga organizatie</h1>
            <div className='row'>
                <div className='col-6'>
                    <div class="card">
                        <div className="card-header">
                            <h4>Creeaza organizatie</h4>
                        </div>
                        <div className="card-body">
                            
                            <CreateOrganization />
                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    <div class="card">
                        <div className="card-header">
                            <h4>Alatura-te unei organizatii</h4>
                        </div>
                        <div className="card-body">
                            <JoinOrganization />                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Organization;
