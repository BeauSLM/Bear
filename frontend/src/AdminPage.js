import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column align-items-start">
            <h1>Admin Dashboard</h1>
            <button style={{marginBottom: '0.25rem' }} className="btn btn-primary" onClick={() => navigate('/createCommunity')}>Create Community</button>
            <button style={{marginBottom: '0.25rem' }} className="btn btn-primary" onClick={() => navigate('/createCommunitySection')}>Create Community Section</button>
            <button style={{marginBottom: '0.25rem' }} className="btn btn-primary" onClick={() => navigate('/createThreadGroup')}>Create Thread Group</button>
        </div>
    );
};

export default AdminPage;
