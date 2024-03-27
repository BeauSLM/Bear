import React from 'react';
import person from './images/person.jpg'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from './BackButton';


const Thread = () => {

    const { id } = useParams();

    const [thread, setThread] = useState([]);
    const [threadUsersData, setThreadUsersData] = useState([]);
    const [threadLikeCount, setThreadLikeCount] = useState(0);


    useEffect(() => {
        axios.get(`http://localhost:3001/thread/${id}`)
            .then(response => {
                setThread(response.data);
                const userIds = [response.data.user_id];
                const userPromises = userIds.map(userId =>
                    axios.get(`http://localhost:3001/user/${userId}`)
                );
                return Promise.all(userPromises);
            })
            .then(userResponses => {
                const usersData = userResponses.map(response => response.data);
                setThreadUsersData(usersData);
            })
            .catch(error => {
                console.log('Error fetching user data:', error);
            });
        axios.get(`http://localhost:3001/thread_like/${id}`)
            .then(response => {
                // Assuming the response is an array of likes
                setThreadLikeCount(response.data.length); // Set the like count based on the number of items in the response
            })
            .catch(error => {
                console.log('Error fetching like count:', error);
            });
    }, [id]);

    const [reply, setReply] = useState([]);
    const [replyUserData, setReplyUserData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/reply`)
            .then(response => {
                const relevantReplies = response.data.filter(reply => reply.thread_id.toString() === id);
                const detailedReplyPromises = relevantReplies.map(reply =>
                    axios.get(`http://localhost:3001/reply/${id}/${reply.thread_id}`)
                );
                setReply(detailedReplyPromises);
                return Promise.all(detailedReplyPromises);
            })
            .then(detailedResponses => {
                const detailedReplies = detailedResponses.map(response => response.data);
                setReply(detailedReplies);
                const userIds = [...new Set(detailedReplies.map(reply => reply.user_id))];
                const userPromises = userIds.map(userId =>
                    axios.get(`http://localhost:3001/user/${userId}`)
                );
                return Promise.all(userPromises);
            })
            .then(userResponses => {
                const usersData = userResponses.map(response => response.data);
                setReplyUserData(usersData);
            })
            .catch(error => {
                console.log('Error fetching detailed replies or user data:', error);
            });
    }, [id]);


    const getDaysAgo = (dateString) => {
        const postDate = new Date(dateString);
        const today = new Date();
        const timeDiff = today - postDate;
        console.log(timeDiff);

        if (timeDiff <= 86400000) {
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            return hours + (hours === 1 ? " hour ago" : " hours ago");
        } else {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            return days + (days === 1 ? " day ago" : " days ago");
        }
    };


    const daysAgo = getDaysAgo(thread.created_at);

    if (!thread) {
        return <div>Loading...</div>;
    }


    return (
        <div className="card mb-2 shadow-sm">
            <div className="card-header">
                <BackButton
                    destination={`threads/${id}`} />
                <h4>{thread.title}</h4>
            </div>
            <div className="card-body p-2">
                <div className="row align-items-center">
                    <div className="col-3 col-md-3 d-flex align-items-center">
                        <img src={person} width={50} height={50} alt="Profile" className="me-2" />
                        <div>
                            {threadUsersData.map((usersData, index) => (
                                <p>by {usersData.name}</p>
                            ))}
                        </div>
                    </div>
                    <div className="col-6 col-md-6 border-start">
                        <div className="d-flex align-items-center">
                            {[thread].map((thread, index) => (
                                <p>
                                    {thread.content}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="col-3 col-md-3 text-end">
                        <strong>{daysAgo}</strong>
                        <p>{threadLikeCount} like(s)</p>
                    </div>
                </div>
            </div>

            {/* REPLYS */}
            <div className="card-body p-2">
                <div className="row align-items-center">
                    <div className="col-3 col-md-3 d-flex align-items-center">
                        <img src={person} width={50} height={50} alt="Profile" className="me-2" />
                        <div>
                            {replyUserData.map((replyUserData, index) => (
                                <p>by {replyUserData.name}</p>
                            ))}
                        </div>
                    </div>
                    <div className="col-6 col-md-6 border-start">
                        <div className="d-flex align-items-center">
                            {reply.map((reply, index) => (
                                <p>
                                    RE:
                                    {reply.content}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="col-3 col-md-3 text-end">
                        <strong>{daysAgo}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Thread;
