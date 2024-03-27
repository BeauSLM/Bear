import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CommunityCard = () => {

    const navigate = useNavigate();
    const handleViewCommunityClick = (id) => {
        navigate(`/community/${id}`);
    };

    

    const [communities, setCommunities] = useState([]);
    const [relatedSection, setRelatedSection] = useState([]);
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/community')
            .then(response => {
                setCommunities(response.data);
            })
            .catch(error => {
                console.log('Error fetching communities data:', error);
            });

        axios.get('http://localhost:3001/community_section')
            .then(response => {
                setRelatedSection(response.data);
            })
            .catch(error => {
                console.log('Error fetching community sections:', error);
            });

        axios.get('http://localhost:3001/thread')
            .then(response => {
                setThreads(response.data);
            })
            .catch(error => {
                console.log('Error fetching threads:', error);
            });
    }, []);

    const getDaysAgo = (dateString) => {
        const postDate = new Date(dateString);
        const today = new Date();
        const timeDiff = today - postDate + (6 * 60 * 60 * 1000);

        if (timeDiff < 60000) {
            return "just now";
        } else if (timeDiff >= 6000 && timeDiff <= 3600000) {
            return "< 1 hour ago"
        } else if (timeDiff <= 86400000) { // 24 hours in milliseconds
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            return hours + (hours === 1 ? " hour ago" : " hours ago");
        } else {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            return days + (days === 1 ? " day ago" : " days ago");
        }
    };

    const findMostRecentThreadDate = (communityId) => {
        const communityThreads = threads.filter(thread => thread.community_id === communityId);
        if (communityThreads.length === 0) {
            return "No threads";
        }
        const mostRecentThread = communityThreads.reduce((latest, thread) => {
            return new Date(latest.created_at) > new Date(thread.created_at) ? latest : thread;
        }, { created_at: '1900-01-01 00:00:00' });
        return getDaysAgo(mostRecentThread.created_at);
    };

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
                                    <span className="badge bg-success mb-1" style={{ fontSize: '0.75rem' }}>Section(s)</span>
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
                            <small>Most Recent: {findMostRecentThreadDate(community.id)}</small>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CommunityCard;
