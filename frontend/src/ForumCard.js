import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ForumCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [communitySection, setCommunitySection] = useState([]);
    const [relatedThreads, setRelatedThreads] = useState([]);
    const [isCommunitySectionLoaded, setIsCommunitySectionLoaded] = useState(false); // State to track if community section has been loaded

    useEffect(() => {
        // Fetch community section details
        axios.get(`http://localhost:3001/community_section/${id}`)
            .then(response => {
                setCommunitySection(response.data);
                setIsCommunitySectionLoaded(true); // Set to true once community section is loaded
            })
            .catch(error => {
                console.log('Error fetching community section data:', error);
            });
    }, [id]);


    useEffect(() => {
        if (isCommunitySectionLoaded) {
            axios.get('http://localhost:3001/thread')
                .then(response => {
                    const threadsBySection = communitySection.reduce((acc, section) => {
                        acc[section.section_id] = response.data.filter(thread => thread.section_id === section.section_id);
                        return acc;
                    }, {});
                    setRelatedThreads(threadsBySection);
                })
                .catch(error => {
                    console.log('Error fetching threads:', error);
                });
        }
    }, [isCommunitySectionLoaded, communitySection]);


    const handleViewThreadsClick = (threadId) => {
        navigate(`/threads/${threadId}`);
    };
    const getDaysAgo = (dateString) => {
        const postDate = new Date(dateString);
        const today = new Date();
        const timeDiff = today - postDate + (6 * 60 * 60 * 1000);

        if (timeDiff < 60000) {
            return "just now";
        } else if (timeDiff >= 6000 && timeDiff <= 3600000) {
            return "< 1 hour ago"
        } else if (timeDiff <= 86400000) {
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            return hours + (hours === 1 ? " hour ago" : " hours ago");
        } else {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            return days + (days === 1 ? " day ago" : " days ago");
        }
    };


    const getLastActive = () => {
        let latestDate = new Date(0); // Set to the epoch
        Object.values(relatedThreads).forEach(threads => {
            threads.forEach(thread => {
                const createdDate = new Date(thread.created_at);
                if (createdDate > latestDate) {
                    latestDate = createdDate;
                }
            });
        });

        return latestDate > new Date(0) ? getDaysAgo(latestDate) : "No activity";
    };



    return (
        <div className="card mb-2 shadow-sm">
            <div className="card-body p-2">
                {communitySection.map((section, index) => (
                    <div className="row align-items-center" key={section.section_id}>
                        <div className="col-md-4">
                            <h5 className="card-title" style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{section.section_name}</h5>
                            <p className="card-text" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>{section.description}</p>
                        </div>

                        <div className="col-md-4 d-flex justify-content-center">
                            <span className="badge bg-secondary" style={{ fontSize: '0.9rem' }}>
                                Threads: {relatedThreads[section.section_id] ? relatedThreads[section.section_id].length : 0}
                            </span>
                        </div>

                        <div className="col-md-4 d-flex justify-content-end">
                            <div className="d-flex flex-column align-items-end w-100"> {/* Ensure full width */}
                                <span className="badge bg-success mb-2" style={{ fontSize: '0.75rem' }}>User Activity</span>
                                {
                                    relatedThreads[section.section_id] && relatedThreads[section.section_id].map(thread => (
                                        <div key={thread.id} className="text-end mb-3 w-100"> {/* Add bottom margin and ensure full width */}
                                            <strong style={{ fontSize: '0.875rem' }}>{thread.title}</strong>
                                            <p style={{ fontSize: '0.75rem' }}>{getDaysAgo(thread.created_at)}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="card-footer text-muted p-2">
                            <div className="d-flex justify-content-between align-items-center">
                                <button
                                    className="btn btn-sm btn-outline-primary"
                                    style={{ fontSize: '0.75rem' }}
                                    onClick={() => handleViewThreadsClick(section.section_id)}
                                >View Threads</button>
                                <small className="text-secondary" style={{ fontSize: '0.75rem' }}>Last active: {getLastActive()}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>



        </div>
    );
};

export default ForumCard;
