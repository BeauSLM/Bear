import React from 'react';
import logo from './images/bear-logo.png'
import person from './images/person.jpg'
import message from './images/message.png'
import notification from './images/notification.png'

const Header = () => {
    return (
        <header className="d-flex justify-content-between align-items-center p-3">
            <div>
                <img src={logo} width={50} height={50} alt="Logo" />
                <span>BEAR</span>
            </div>
            <div>
                <button className="btn me-2"><img src={message} width={30} height={30} alt="messages"/></button>
                <button className="btn me-2"><img src={notification} width={30} height={30} alt="messages"/></button>
                <span>3p1cUser140         </span>
                <img src={person} width={50} height={50} alt="User Avatar" className="rounded-circle me-2" />
            </div>
        </header>
    );
};

export default Header;
