import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ForumCard = ({ name, description, subscribed, threads, userActivity }) => {

    const navigate = useNavigate();
    const handleViewThreadsClick = () => {
        navigate('/threads');
    };

    const { id } = useParams();

    const [communitySection, setCommunitySection] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/community_section/${id}`)
            .then(response => {
                console.log(response.data);
                setCommunitySection(response.data);
            })
            .catch(error => {
                // Handle error
                console.log('Error fetching communities data:', error);
            });
    }, []);

    console.log(communitySection)



    return (
        <div className="card mb-2 shadow-sm">
            <div className="card-body p-2">
                {communitySection.map((communitySection, index) => (
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            {/* <h5 className="card-title" style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{id}</h5> */}
                            <h5 className="card-title" style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{communitySection.section_name}</h5>
                            <p className="card-text" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>{communitySection.description}</p>
                        </div>

                        <div className="col-md-4 d-flex justify-content-center">
                            <span className="badge bg-secondary me-2" style={{ fontSize: '0.9rem' }}>Subscribed: {subscribed}</span>
                            <span className="badge bg-secondary" style={{ fontSize: '0.9rem' }}>Threads: {threads}</span>
                        </div>

                        <div className="col-md-4 d-flex justify-content-end">
                            <div className="d-flex flex-column align-items-end">
                                <span className="badge bg-success mb-1" style={{ fontSize: '0.75rem' }}>User Activity</span>
                                {userActivity.map(activity => (
                                    <div key={activity.forum} className="text-end" style={{ marginBottom: '0.25rem' }}>
                                        <strong style={{ fontSize: '0.875rem' }}>{activity.forum}</strong>
                                        <p style={{ fontSize: '0.75rem' }}>{activity.time}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <div className="card-footer text-muted p-2">
                <div className="d-flex justify-content-between align-items-center">
                    <button className="btn btn-sm btn-outline-primary" style={{ fontSize: '0.75rem' }} onClick={handleViewThreadsClick} >View Threads</button>
                    <small className="text-secondary" style={{ fontSize: '0.75rem' }}>Last active: {userActivity[0].time}</small>
                </div>
            </div>
        </div>
    );
};

export default ForumCard;
