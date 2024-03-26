import React from "react";
import "./ChatBox.css";

function Notifications ({isOpen, children}) {
    return (
        <>
        {
            isOpen ? (
                <div className='chatbox'>
                    <div className="chatbox__container">
                        <button className="chatbox__close" type='button' />
                    </div>
                    {children}
                </div>
            ) : null
        }
        </>
    );
};
export default Notifications;