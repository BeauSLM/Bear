import React, { useState } from 'react';
import logo from './images/bear-logo.png';
import person from './images/person.jpg';
import message from './images/message.png';
import notification from './images/notification.png';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom'; 
import { Dropdown } from 'react-bootstrap';

const Header = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('username');
        setUser(null);
        navigate('/login');
    };

    return (
        <header className="d-flex justify-content-between align-items-center p-3">
            <div className="d-flex flex-column align-items-start">
                <img src={logo} width={50} height={50} alt="Logo" />
                <span>BEAR</span>
                <button style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }} className="btn btn-primary" onClick={() => navigate('/adminPage')}>Create Community</button>
            </div>
            <div>
                <button className="btn me-2"><img src={message} width={30} height={30} alt="Messages" /></button>
                <button className="btn me-2"><img src={notification} width={30} height={30} alt="Notifications" /></button>
                <div className="d-flex align-items-center">
                    <div className="dropdown">
                        <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                {user ? user.username : 'Guest'}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <img src={person} width={50} height={50} alt="User Avatar" className="rounded-circle ms-2" />
                </div>
            </div>
        </header>
    );
};

export default Header;
