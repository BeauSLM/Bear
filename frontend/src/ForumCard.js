import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ForumCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();


    const [communitySection, setCommunitySection] = useState([]);
    const [relatedThreads, setRelatedThreads] = useState([]);

    useEffect(() => {
        // Fetch community section details
        axios.get(`http://localhost:3001/community_section/${id}`)
            .then(response => {
                setCommunitySection(response.data);
            })
            .catch(error => {
                console.log('Error fetching communities data:', error);
            });

        // Fetch all threads and filter by community_id
        axios.get('http://localhost:3001/thread')
            .then(response => {
                const filteredThreads = response.data.filter(thread => thread.community_id.toString() === id);
                setRelatedThreads(filteredThreads);
            })
            .catch(error => {
                console.log('Error fetching threads:', error);
            });
    }, [id]); // Depend on id to refetch if it changes


    const handleViewThreadsClick = () => {
        navigate('/threads/1');
    };

    const getDaysAgo = (dateString) => {
        const postDate = new Date(dateString);
        const today = new Date();
        const timeDiff = today - postDate;

        if (timeDiff <= 86400000) {
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            return hours + (hours === 1 ? " hour ago" : " hours ago");
        } else {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            return days + (days === 1 ? " day ago" : " days ago");
        }
    };

    const getLastActive = () => {
        if (relatedThreads.length > 0) {
            const latestThread = relatedThreads.reduce((latest, thread) =>
                new Date(latest.created_at) > new Date(thread.created_at) ? latest : thread, relatedThreads[0]);
            return getDaysAgo(latestThread.created_at);
        }
        return "No activity";
    };


    return (
        <div className="card mb-2 shadow-sm">
            <div className="card-body p-2">
                {communitySection.map((communitySection, index) => (
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <h5 className="card-title" style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{communitySection.section_name}</h5>
                            <p className="card-text" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>{communitySection.description}</p>
                        </div>

                        <div className="col-md-4 d-flex justify-content-center">
                            <span className="badge bg-secondary" style={{ fontSize: '0.9rem' }}>Threads: {relatedThreads.length}</span>
                        </div>

                        <div className="col-md-4 d-flex justify-content-end">
                            <div className="d-flex flex-column align-items-end">
                                <span className="badge bg-success mb-1" style={{ fontSize: '0.75rem' }}>User Activity</span>
                                {relatedThreads.map(relatedThreadsActivity => (
                                    <div key={relatedThreadsActivity.id} className="text-end" style={{ marginBottom: '0.25rem' }}>
                                        <strong style={{ fontSize: '0.875rem' }}>{relatedThreadsActivity.title}</strong>
                                        <p style={{ fontSize: '0.75rem' }}>{getDaysAgo(relatedThreadsActivity.created_at)}</p>
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
                    <small className="text-secondary" style={{ fontSize: '0.75rem' }}>Last active: {getLastActive()}</small>
                </div>
            </div>
        </div>
    );
};

export default ForumCard;
