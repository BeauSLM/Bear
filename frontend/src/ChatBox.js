import React, { useRef } from "react";
import images from "./images";
import "./ChatBox.css";
import Contacts from "./Contacts";
import Messages from "./Messages";
import Dropdown from 'react-dropdown'
import { useNavigate } from "react-router-dom";
function ChatBox ({isOpen, children}) {
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
                        {msgs.map((message,i) => {
                        return (
                            <div className="message" style={{justifyContent:'flex-start'}} onClick={routeChange}>
                                <div>
                                 <img src={images.Pfp2} width={50} height={50} alt="User Avatar" className="rounded-circle me-2" />
                                 </div>
                                 <div className="message__content" onClick={routeChange}>
                                    <div className="username">
                                        johnny2b
                                    </div>
                                    <div className="message__text">
                                    {(message.length <= 70) ? message : message.substring(0,70).padEnd(73, '...')}
                                    </div>
                                    <div className="timestamp">
                                        10:59
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