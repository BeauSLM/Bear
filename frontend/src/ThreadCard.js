import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import threadPicture from './images/threadPic.png';
import person from './images/person.jpg';
import BackButton from './BackButton';

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
                const filteredThreads = response.data.filter(thread => thread.community_id.toString() === id);
                setThreads(filteredThreads);
                return filteredThreads;
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
                        newThreadsUsersData.set(filteredThreads[index].id, userData);
                    });
                    setThreadsUsersData(newThreadsUsersData);
                    return filteredThreads;
                });
            })
            .then(filteredThreads => {
                console.log(filteredThreads)
                const likePromises = filteredThreads.map(thread =>
                    axios.get(`http://localhost:3001/thread_like/${thread.thread_id}`)
                );
                return Promise.all(likePromises).then(likeResponses => {
                    const newThreadLikeCounts = new Map();
                    likeResponses.forEach((response, index) => {
                        newThreadLikeCounts.set(filteredThreads[index].id, response.data.length);
                    });

                    setThreadLikeCounts(newThreadLikeCounts);

                });

            })
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
        const timeDiff = today - postDate + (6 * 60 * 60 * 1000);
        console.log(timeDiff);

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


    return (
        <div>
            <div className="card-header">
                <BackButton
                    destination={`community/${id}`} />
                <h4>All Threads</h4>
            </div>
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

                                <div className="col-3 col-md-3 d-flex flex-column align-items-end">
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
