import React from 'react';
import person from './images/person.jpg'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from './BackButton';
import { useAuth } from './AuthContext';

const Thread = () => {

    const { id } = useParams();
    const { user, setUser } = useAuth();

    const [thread, setThread] = useState([]);
    const [threadUsersData, setThreadUsersData] = useState([]);
    const [threadLikeCount, setThreadLikeCount] = useState(0);
    const [replyLikeCount, setReplyLikeCount] = useState(0);
    const [newReplyContent, setNewReplyContent] = useState('');
    const [isLoadingReplies, setIsLoadingReplies] = useState(true);
    const [repliesLastFetched, setRepliesLastFetched] = useState(Date.now());
    const [reply, setReply] = useState([]);
    const [replyUserData, setReplyUserData] = useState([]);
    const [replyLikeCounts, setReplyLikeCounts] = useState({});



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
                setThreadLikeCount(response.data.length);
            })
            .catch(error => {
                console.log('Error fetching like count:', error);
            });
    }, [id]);

    useEffect(() => {
        setIsLoadingReplies(true);
        axios.get(`http://localhost:3001/reply`)
            .then(response => {
                const relevantReplies = response.data.filter(reply => reply.thread_id.toString() === id);
                setReply(relevantReplies);

                const userPromises = relevantReplies.map(reply =>
                    axios.get(`http://localhost:3001/user/${reply.user_id}`).then(userResponse => ({
                        ...userResponse.data,
                        reply_id: reply.reply_id
                    }))
                );

                return Promise.all(userPromises);
            })
            .then(usersData => {
                setReplyUserData(usersData);
                setIsLoadingReplies(false);
            })
            .catch(error => {
                console.log('Error fetching replies or user data:', error);
                setIsLoadingReplies(false);
            });
    }, [id, repliesLastFetched]);

    useEffect(() => {
        setIsLoadingReplies(true);
        axios.get(`http://localhost:3001/reply/${id}`)
            .then(response => {
                const relevantReplies = response.data;
                setReplyLikeCount(relevantReplies);
            })
            .catch(error => {
                console.log('Error fetching replies or like data:', error);
                setIsLoadingReplies(false);
            });
    }, [id, repliesLastFetched]);





    const handleSubmitReply = (event) => {
        event.preventDefault();
        setIsLoadingReplies(true);
        axios.post(`http://localhost:3001/reply`, {
            thread_id: id,
            user_id: user.id,
            content: newReplyContent,
        })
            .then(response => {
                console.log('Reply posted successfully');
                const newReply = response.data;
                setReply(prevReplies => [...prevReplies, newReply]);
                setReplyUserData(prevUserData => [...prevUserData, { ...user, reply_id: newReply.reply_id }]);
                setNewReplyContent('');
                setRepliesLastFetched(Date.now());
            })

            .catch(error => {
                console.error('Error posting reply:', error);
            })
            .finally(() => {

                setIsLoadingReplies(false);
            });
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

    const handleLike = () => {
        const likeData = {
            thread_id: id,
            user_id: user.id,
            time: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };

        axios.post('http://localhost:3001/thread_like', likeData)
            .then(response => {
                console.log('Like added successfully:', response.data);
                setThreadLikeCount(prevCount => prevCount + 1);
            })
            .catch(error => {
                console.error('Error adding like:', error);
            });


    };
    const handleReplyLike = (replyId) => {
        if (replyLikeCounts[replyId]) {
            console.log('Already liked');
            return;
        }

        const likeData = {
            reply_id: replyId,
            user_id: user.id,
            time: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };

        axios.post('http://localhost:3001/reply_like', likeData)
            .then(() => {
                console.log('Like added successfully');
                setReplyLikeCounts(prevCounts => ({
                    ...prevCounts,
                    [replyId]: 1
                }));
            })
            .catch(error => {
                console.error('Error adding like:', error);
            });
    };

    const daysAgo = getDaysAgo(thread.created_at);

    // const fetchRepliesWithLikes = async (threadId) => {
    //     try {
    //         const repliesResponse = await axios.get(`http://localhost:3001/reply/${threadId}`);
    //         const replies = repliesResponse.data;

    //         const repliesWithLikesPromises = replies.map(async (reply) => {
    //             const replyLikesResponse = await axios.get(`http://localhost:3001/reply_like/${id}/${reply.reply_id}`);
    //             console.log(replyLikesResponse)
    //             const likeCount = replyLikesResponse.data.length;
    //             return { ...reply, likeCount };
    //         });

    //         const repliesWithLikes = await Promise.all(repliesWithLikesPromises);
    //         return repliesWithLikes;

    //     } catch (error) {
    //         console.error('Error fetching replies with like counts:', error);
    //         return [];
    //     }
    // };

    // const [repliesWithLikes, setRepliesWithLikes] = useState([]);

    // useEffect(() => {
    //     fetchRepliesWithLikes(id)
    //         .then(data => setRepliesWithLikes(data));
    // }, [id]);


    if (!thread) {
        return <div>Loading...</div>;
    }

    if (isLoadingReplies) {
        return <div>Loading replies...</div>;
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
                        <button className="btn btn-outline-primary btn-sm" onClick={handleLike}>Like</button>
                    </div>
                </div>
            </div>

            {/* REPLIES */}
            <div className="card-body p-2">
                <div className="row align-items-center">
                    <div className="col-12 col-md-12 border-start">
                        {!isLoadingReplies && reply.map((reply) => (
                            <div key={reply.reply_id} className="card-body p-2 border-top">
                                <div className="row align-items-center">
                                    <div className="col-3 col-md-3 d-flex align-items-center">
                                        <img src={person} width={50} height={50} alt="Profile" className="me-2" />
                                    </div>
                                    <div className="col-6 col-md-6">
                                        <strong>by {replyUserData.find(user => user.reply_id === reply.reply_id)?.name || 'Loading...'}</strong>
                                        <p>RE: {reply.content}</p>
                                    </div>
                                    <div className="col-3 col-md-3 text-end">
                                        <strong>{getDaysAgo(reply.created_at)}</strong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>



            <div className="card-footer">
                <form onSubmit={handleSubmitReply}>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            value={newReplyContent}
                            onChange={(e) => setNewReplyContent(e.target.value)}
                            placeholder="Write your reply here..."
                            rows="3"
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Post Reply</button>
                </form>
            </div>
        </div >
    );
};

export default Thread;