import React, { useState, useEffect, useCallback } from 'react';
import logo from './images/bear-logo.png'
import person from './images/person.jpg'
import message from './images/message.png'
import notification from './images/notification.png'
import ChatBox from './ChatBox';
import axios from 'axios';



const Header = () => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
    const [image, setImage] = useState(null);
   
       

    return (
        <header style={{position:'relative'}}>
        <div className="header_container" style={{display: 'grid', gridTemplateColumns: '55% 25% 20%', paddingTop: 25, paddingLeft:25, paddingRight:25, paddingBottom: 10}}>
            <div>
                <img src={logo} width={50} height={50} alt="Logo" />
                <span>BEAR</span>
            </div>
            <div className="notif" style={{ display:'flex', justifyContent: 'space-evenly',alignContent: 'center'}}>
                <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-around',alignContent: 'flex-start'}}>
                    <button className="btn me-2" onClick={() => setActiveIndex((activeIndex != 0) ?  0 : -1)}><img src={message} width={30} height={30} alt="messages"/></button>
                    <div  style={{ zIndex:10, position:'absolute', marginTop:40}}>
                    <ChatBox isOpen={activeIndex === 0}>
                        <h1> Chat </h1>
                    </ChatBox>
                    </div>
                </div>
                <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-around',alignContent: 'flex-start'}}>
                    <button className="btn me-2" onClick={() => setActiveIndex((activeIndex != 1) ?  1 : -1)}><img src={notification} width={35} height={30} alt="notifications"/></button>
                    <div style={{zIndex:10, position:'absolute', marginTop:40}}>
                    <ChatBox isOpen={activeIndex === 1}>
                        <h1> Notifications </h1>
                    </ChatBox>
                    </div>
                
                </div>
            </div>
            
            <div className="border" style={{display:'flex', justifyContent:'end', alignContent:'center', flexWrap:'wrap'}}>
                    <span>3p1cUser140         </span>
                    <img src={person} width={50} height={50} alt="User Avatar" className="rounded-circle me-2" />
                
            </div>
        </div>
        </header>
        
    );
};

export default Header;
