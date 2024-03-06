import React from 'react';
import person from './images/person.jpg'

const Thread = ({ userName, lastPostDate }) => {

    return (
        <div className="card mb-2 shadow-sm">
            <div className="card-body p-2">
                <div className="row align-items-center">
                    <div className="col-3 col-md-3 d-flex align-items-center">
                        <img src={person} width={50} height={50} alt="Profile" className="me-2" />
                        <div>
                            <p>by {userName}</p>
                        </div>
                    </div>
                    <div className="col-6 col-md-6 border-start">
                        <div className="d-flex align-items-center">
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue risus ut enim vestibulum, sed cursus metus porta. Vestibulum et sollicitudin ipsum. Suspendisse tempor posuere condimentum. Nam gravida, turpis non semper porttitor, mi odio ornare tellus, et vestibulum justo odio vel enim
                            </p>
                        </div>
                    </div>
                    <div className="col-3 col-md-3 text-end">
                        <strong>{lastPostDate}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Thread;
