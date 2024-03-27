import React, { useRef, useEffect, useState } from "react";
import images from "./images";
import "./ChatBox.css";
import Contacts from "./Contacts";
import Messages from "./Messages";
import Dropdown from 'react-dropdown'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function ChatBox ({isOpen}) {

    const [newMessages, setNewMessages] = useState([]);
    const [image, setImage] = useState(null);
    const controller = new AbortController();
    const signal = controller.signal;

    useEffect(() => {
        fetch("http://localhost:3001/user/1/chat/new")
        .then(res => res.json())
        .then(data => {
            setNewMessages(data);
        }).catch(error => { console.error(error)});
        return () => {
            controller.abort();
        }
    },[]);

    const imageHand = (url) => {
        
        const fetchObject = fetch(url);
        fetchObject.then(response => { response.json().then(data => { setImage(data); }); });
        //console.log(image)
    }
    
    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/chat'
        navigate(path);
    }
    
    const msgs = ['Hi', 'The structure of the elements of the crimes of genocide, crimes againstss', 'ohfafokljshfnkajf', 'dsfadg', 'afdgadg'];
    
    const listMsg = useRef(null);
    return (
        <>
        {
            isOpen ? (
                <div className= "chatbox" style={{overflowY:'scroll'}}>
                        <div className="messages">
                        {newMessages.map((message) => {
                        return (
                            <div className="message" key={message.chat_id} style={{justifyContent:'flex-start'}} onClick={routeChange}>
                                <div>
                                 <img src={message.sender_avater} width={50} height={50} alt="User Avatar" className="rounded-circle me-2" />
                                 </div>
                                 <div className="message__content" onClick={routeChange}>
                                    <div className="username">
                                        {message.sender_username}
                                    </div>
                                    <div className="message__text">
                                    {(message.text.length > 0 && message.text.length <= 70) ? message.text : message.text.substring(0,70).padEnd(73, '...')}
                                    </div>
                                    <div className="timestamp">
                                        {new Date(message.sent_timestamp).toLocaleDateString()}
                                    </div>
                                </div>

                            </div>
                            )
                        })}
                        </div>
                </div>
            ) : null
        }
        </>
    );
};
export default ChatBox;
/*


*/