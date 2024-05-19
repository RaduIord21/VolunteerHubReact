// CardComponent.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CardComponent = ({ image, number, text }) => {
    return (
        <div className="col-md-4 mb-4">
            <div className="card">
                <div className="card-body d-flex justify-content-between">
                    <img src={image} className="img-fluid mr-3" alt="Card cap" style={{ width: '200px', height: '100px' }} />
                    <div className="text-end">
                        <div className="highlighted-number text-right" style={{ fontSize: '3rem', fontWeight: 'bold' }}>{number}</div>
                        <div className="text-right">{text}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardComponent;
