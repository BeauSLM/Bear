import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <button className="btn btn-primary" onClick={() => navigate('/createCommunity')}>Create Community</button>
            <button className="btn btn-primary" onClick={() => navigate('/createCommunitySection')}>Create Community Section</button>
            <button className="btn btn-primary" onClick={() => navigate('/createThreadGroup')}>Create Thread Group</button>
        </div>
    );
};

export default AdminPage;
