import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import threadPicture from './images/threadPic.png';
import person from './images/person.jpg';

const ThreadCard = () => {
    const navigate = useNavigate();
    const { id } = useParams();


    const [threads, setThreads] = useState([]);
    const [threadsUsersData, setThreadsUsersData] = useState(new Map());
    const [threadLikeCounts, setThreadLikeCounts] = useState(new Map());
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        axios.get(`http://localhost:3001/thread`)
            .then(response => {
                // Filter threads by community_id
                const filteredThreads = response.data.filter(thread => thread.community_id.toString() === id);
                setThreads(filteredThreads);
                return filteredThreads; // Return here for chaining
            })
            .then(filteredThreads => {
                // Fetch user data for each thread
                const userPromises = filteredThreads.map(thread =>
                    axios.get(`http://localhost:3001/user/${thread.user_id}`)
                );
                return Promise.all(userPromises).then(userResponses => {
                    const usersData = userResponses.map(response => response.data);
                    const newThreadsUsersData = new Map();
                    usersData.forEach((userData, index) => {
                        // Use filteredThreads for indexing to avoid the timing issue
                        newThreadsUsersData.set(filteredThreads[index].id, userData);
                    });
                    setThreadsUsersData(newThreadsUsersData);
                    return filteredThreads; // Return for further chaining
                });
            })
            .then(filteredThreads => {
                console.log(filteredThreads)
                const likePromises = filteredThreads.map(thread =>
                    axios.get(`http://localhost:3001/thread_like/${thread.thread_id}`) // Make sure you're using thread.id, not thread.thread_id for consistency
                );
                return Promise.all(likePromises).then(likeResponses => {
                    const newThreadLikeCounts = new Map();
                    likeResponses.forEach((response, index) => {
                        newThreadLikeCounts.set(filteredThreads[index].id, response.data.length);
                    });

                    setThreadLikeCounts(newThreadLikeCounts);

                });

            })
            // Inside your useEffect, after the last Promise.all call completes:
            .then(() => {
                setIsLoading(false);
            })
            .catch(error => {
                console.log('Error fetching threads or user data:', error);
                setIsLoading(false);
            });
    }, [id]);


    const handleViewThreadClick = (threadId) => {
        navigate(`/thread/${threadId}`);
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

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                threads.map(thread => (
                    <div className="card mb-2 shadow-sm" key={thread.id}>
                        <div className="card-body p-2">
                            <div className="row align-items-center">
                                <div className="col-3 col-md-3 d-flex align-items-center">
                                    <img src={threadPicture} width={50} height={50} alt="Thread" className="me-2" />
                                    <div><strong>{thread.title}</strong></div>
                                </div>

                                <div className="col-6 col-md-6 border-start">
                                    <div className="d-flex align-items-center">
                                        <img src={person} width={50} height={50} alt="Profile" className="me-2" />
                                        <div>
                                            <strong>Latest Post</strong>
                                            <p>by {threadsUsersData.get(thread.id)?.name}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-3 col-md-3 text-end">
                                    <strong>
                                        {thread.created_at ? getDaysAgo(thread.created_at) : 'Loading...'}
                                    </strong>
                                    <button
                                        className="btn btn-sm btn-outline-primary"
                                        style={{ fontSize: '0.75rem' }}
                                        onClick={() => handleViewThreadClick(thread.thread_id)}
                                    >
                                        View Thread
                                    </button>
                                    <p>{threadLikeCounts.get(thread.id)} like(s)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default ThreadCard;
