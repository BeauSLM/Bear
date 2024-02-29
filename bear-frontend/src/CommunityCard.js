import React from 'react';

const CommunityCard = ({ name, description, subscribed, threads, userActivity }) => {
    return (
        <div className="card mb-2 shadow-sm">
            <div className="card-body p-2">
                <div className="row align-items-center">
                    {/* Community Name and Description */}
                    <div className="col-md-4">
                        <h5 className="card-title" style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{name}</h5>
                        <p className="card-text" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>{description}</p>
                    </div>

                    {/* Subscribed and Threads next to each other */}
                    <div className="col-md-4 d-flex justify-content-center">
                        <span className="badge bg-secondary me-2" style={{ fontSize: '0.9rem' }}>Subscribed: {subscribed}</span>
                        <span className="badge bg-secondary" style={{ fontSize: '0.9rem' }}>Threads: {threads}</span>
                    </div>

                    {/* User Activity */}
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
            </div>

            <div className="card-footer text-muted p-2">
                <div className="d-flex justify-content-between align-items-center">
                    <button className="btn btn-sm btn-outline-primary" style={{ fontSize: '0.75rem' }}>View Community</button>
                    <small className="text-secondary" style={{ fontSize: '0.75rem' }}>Last active: {userActivity[0].time}</small>
                </div>
            </div>
        </div>
    );
};

export default CommunityCard;
