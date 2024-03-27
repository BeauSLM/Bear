import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CommunityCard = () => {

    const navigate = useNavigate();
    const handleViewCommunityClick = (id) => {
        navigate(`/community/${id}`);
    };

    const [communities, setCommunities] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/community')
            .then(response => {
                setCommunities(response.data);
            })
            .catch(error => {
                console.log('Error fetching communities data:', error);
            });
    }, []);


    const [relatedSection, setRelatedSection] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/community_section')
            .then(response => {
                setRelatedSection(response.data);
            })
            .catch(error => {
                console.log('Error fetching threads:', error);
            });
    });



    return (
        <div className="card mb-2 shadow-sm">
            {communities.map((community) => (
                <div key={community.id} className="card mb-2 shadow-sm">
                    <div className="card-body p-2">
                        <div className="row align-items-center">
                            {/* Community Name and Description */}
                            <div className="col-md-4">
                                <h5 className="card-title" style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{community.name}</h5>
                                <h5 className="card-title" style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{community.id}</h5>
                                <p className="card-text" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>{community.description}</p>
                            </div>

                            {/* Subscribed and Threads next to each other */}
                            <div className="col-md-4 d-flex justify-content-center">
                                <span className="badge bg-secondary" style={{ fontSize: '0.9rem' }}>Threads: {relatedSection.filter(section => section.community_id === community.id).length}</span>
                            </div>

                            {/* User Activity */}
                            <div className="col-md-4 d-flex justify-content-end">
                                <div className="d-flex flex-column align-items-end">
                                    <span className="badge bg-success mb-1" style={{ fontSize: '0.75rem' }}>User Activity</span>
                                    {relatedSection.filter(section => section.community_id === community.id).map((section) => (
                                        <div key={section.id} className="text-end" style={{ marginBottom: '0.25rem' }}>
                                            <strong style={{ fontSize: '0.875rem' }}>{section.section_name}</strong>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-muted p-2">
                        <div className="d-flex justify-content-between align-items-center">
                            <button className="btn btn-sm btn-outline-primary" style={{ fontSize: '0.75rem' }} onClick={() => handleViewCommunityClick(community.id)}>View Community</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CommunityCard;
