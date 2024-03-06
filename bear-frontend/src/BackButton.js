import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({destination}) => {
    const navigate = useNavigate();

    return (
        <button className="btn btn-outline-secondary" onClick={() => navigate('/' + destination)}>Back</button>
    );
};

export default BackButton;
