import React from 'react';
import threadPicture from './images/threadPic.png';
import person from './images/person.jpg'
import { useNavigate } from 'react-router-dom';

const ThreadCard = ({ threadName, userName, threadDate, lastPostDate }) => {

    const navigate = useNavigate();
    const handleViewThreadsClick = () => {
        navigate('/thread');
    };

    return (
        <div className="card mb-2 shadow-sm">
            <div className="card-body p-2">
                <div className="row align-items-center">
                    <div className="col-3 col-md-3 d-flex align-items-center">
                        <img src={threadPicture} width={50} height={50} alt="Thread" className="me-2" />
                        <div>
                            <strong>{threadName}</strong>
                            <p>By {userName} {threadDate}</p>
                        </div>
                    </div>

                    {/* Latest Post */}
                    <div className="col-6 col-md-6 border-start">
                        <div className="d-flex align-items-center">
                            <img src={person} width={50} height={50} alt="Profile" className="me-2" />
                            <div>
                                <strong>Latest Post</strong>
                                <p>by {userName}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 col-md-3 text-end">
                        <strong>{lastPostDate}</strong>
                        <button className="btn btn-sm btn-outline-primary" style={{ fontSize: '0.75rem' }} onClick={handleViewThreadsClick} >View Thread</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThreadCard;
