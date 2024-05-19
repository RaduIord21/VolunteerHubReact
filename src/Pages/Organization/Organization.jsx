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
                    <div className="card">
                        <div className="card-header">
                            Creeaza organizatie
                        </div>
                        <div className="card-body">
                            
                            <CreateOrganization />
                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    <div class="card">
                        <div className="card-header">
                            Alatura-te unei organizatii
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
